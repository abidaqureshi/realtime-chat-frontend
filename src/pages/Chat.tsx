import React, { useEffect } from 'react';
import websocketService from '../api/websocket/webSocketService';
import { ChatWindow } from '../components/chat/ChatWindow';
import { useAuth } from '../hooks/useAuth';

export const Chat: React.FC = () => {
    const { user, logout } = useAuth();
    const [selectedUser, setSelectedUser] = React.useState<any>(null);

    useEffect(() => {
        if (user) {
            const token = localStorage.getItem('access_token');
            if (token) {
                websocketService.connect(token);
            }
        }

        return () => {
            websocketService.disconnect();
        };
    }, [user]);

    if (!user) {
        return null;
    }

    return (
        <div className="h-screen flex bg-gray-100">
            {/* Sidebar */}
            <div className="w-80 bg-white border-r">
                <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-semibold">Chat App</h1>
                        <button
                            onClick={logout}
                            className="text-sm text-gray-500 hover:text-gray-700"
                        >
                            Logout
                        </button>
                    </div>
                    <p className="text-sm text-gray-600">
                        Welcome, {user.username}!
                    </p>
                </div>

                <UsersList onSelectUser={setSelectedUser} currentUser={user} />
            </div>

            {/* Chat area */}
            <div className="flex-1 flex flex-col">
                {selectedUser ? (
                    <ChatWindow currentUser={user} otherUser={selectedUser} />
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        Select a user to start chatting
                    </div>
                )}
            </div>
        </div>
    );
};
