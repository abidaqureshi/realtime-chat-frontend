import React from 'react';
import type { Message } from '../../types/chat';

interface MessageBubbleProps {
    message: Message;
    isOwn: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
    message,
    isOwn,
}) => {
    return (
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
            <div
                className={`
          max-w-xs lg:max-w-md px-4 py-2 rounded-lg
          ${
              isOwn
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-900 rounded-bl-none'
          }
        `}
            >
                <p className="text-sm">{message.content}</p>
                <div
                    className={`text-xs mt-1 ${
                        isOwn ? 'text-blue-100' : 'text-gray-500'
                    }`}
                >
                    {new Date(message.created_at).toLocaleTimeString()}
                    {message.is_read && isOwn && ' • Read'}
                </div>
            </div>
        </div>
    );
};
