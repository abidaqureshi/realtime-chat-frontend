import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Send } from 'lucide-react';

interface MessageInputProps {
    onSendMessage: (content: string) => void;
    disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
    onSendMessage,
    disabled,
}) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSendMessage(message.trim());
            setMessage('');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex gap-2 p-4 border-t bg-white"
        >
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={disabled}
            />
            <Button type="submit" disabled={!message.trim() || disabled}>
                <Send size={20} />
            </Button>
        </form>
    );
};
