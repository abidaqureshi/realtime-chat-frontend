import React, { useState, useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import type { Message, User } from '../../types/chat';
import websocketService from '../../api/websocket/webSocketService';

interface ChatWindowProps {
    currentUser: User;
    otherUser: User;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
    currentUser,
    otherUser,
}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Load conversation history
        const loadConversation = async () => {
            setLoading(true);
            try {
                // You would fetch messages from your API here
                // const conversation = await chatService.getConversation(otherUser.username);
                // setMessages(conversation);
            } catch (error) {
                console.error('Failed to load conversation:', error);
            } finally {
                setLoading(false);
            }
        };

        loadConversation();

        // Setup WebSocket listeners
        websocketService.onMessage((message: Message) => {
            if (
                (message.sender_username === otherUser.username &&
                    message.receiver_username === currentUser.username) ||
                (message.sender_username === currentUser.username &&
                    message.receiver_username === otherUser.username)
            ) {
                setMessages((prev) => [...prev, message]);
            }
        });

        websocketService.onReadReceipt((data) => {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.uuid === data.message_uuid
                        ? { ...msg, is_read: true, read_at: data.read_at }
                        : msg,
                ),
            );
        });
    }, [currentUser.username, otherUser.username]);

    const handleSendMessage = (content: string) => {
        const messageData = {
            type: 'message' as const,
            data: {
                content,
                receiver: otherUser.username,
            },
        };
        websocketService.sendMessage(messageData);
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Chat header */}
            <div className="bg-white border-b px-6 py-4">
                <h2 className="text-lg font-semibold">{otherUser.username}</h2>
                <p className="text-sm text-gray-500">
                    {otherUser.is_online
                        ? 'Online'
                        : `Last seen ${new Date(
                              otherUser.last_seen!,
                          ).toLocaleString()}`}
                </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6">
                {loading ? (
                    <div className="text-center text-gray-500">
                        Loading messages...
                    </div>
                ) : messages.length === 0 ? (
                    <div className="text-center text-gray-500">
                        No messages yet. Start a conversation!
                    </div>
                ) : (
                    messages.map((message) => (
                        <MessageBubble
                            key={message.uuid}
                            message={message}
                            isOwn={
                                message.sender_username === currentUser.username
                            }
                        />
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Message input */}
            <MessageInput
                onSendMessage={handleSendMessage}
                disabled={loading}
            />
        </div>
    );
};
