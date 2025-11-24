import { createContext, useContext } from 'react';
import type { LoginForm, RegisterForm, User } from '../types/chat';

interface AuthContextType {
    user: User | null;
    login: (credentials: LoginForm) => Promise<void>;
    register: (userData: RegisterForm) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
