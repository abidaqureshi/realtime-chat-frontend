import type {
    AuthResponse,
    LoginForm,
    RegisterForm,
    User,
} from '../../types/chat';
import { apiClient } from '../api';

export const authService = {
    login: async (credentials: LoginForm): Promise<AuthResponse> => {
        const formData = new FormData();
        formData.append('username', credentials.username);
        formData.append('password', credentials.password);
        const response = await apiClient.post('/auth/login', formData);
        return response.data;
    },

    register: async (data: RegisterForm): Promise<User> => {
        const response = await apiClient.post('/auth/register', data);
        return response.data;
    },
    getCurrentUser: async (): Promise<User> => {
        const response = await apiClient.get('/auth/me');
        return response.data;
    },
    logout: async (): Promise<void> => {
        await apiClient.post('/auth/logout');
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
    },
};
