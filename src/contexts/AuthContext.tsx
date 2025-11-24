import React, { useState } from 'react';
import type { LoginForm, RegisterForm, User } from '../types/chat';
import { authService } from '../api/auth/authService';
import { AuthContext } from '../hooks/useAuth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(() => {
        const userData = localStorage.getItem('current_user');
        return userData ? (JSON.parse(userData) as User) : null;
    });
    const [loading, setLoading] = useState<boolean>(true);

    const login = async (credentials: LoginForm) => {
        const response = await authService.login(credentials);
        localStorage.setItem('authToken', response.token);

        // Get user data (you might want to add this endpoint to your backend)
        const userData = await authService.getCurrentUser();
        setUser(userData);
        localStorage.setItem('current_user', JSON.stringify(userData));
        setLoading(false);
    };

    const register = async (userData: RegisterForm) => {
        await authService.register(userData);
        // Auto-login after registration
        await login({
            username: userData.username,
            password: userData.password,
        });
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, login, register, logout, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};
