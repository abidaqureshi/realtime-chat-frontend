import type { Message } from '../../types/chat';
import { apiClient } from '../api';

export const chatService = {
    getConversations: async (
        otherUser: string,
        skip: number = 0,
        limit: number = 100,
    ): Promise<Message[]> => {
        const response = await apiClient.get(
            `/chat/conversations/${otherUser}?skip=${skip}&limit=${limit}`,
        );
        return response.data;
    },
    markAsRead: async (messageUuid: string): Promise<Message> => {
        const response = await apiClient.post(
            `/chat/messages/read/${messageUuid}`,
        );
        return response.data;
    },
};
