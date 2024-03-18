import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from './api';

interface AuthContextType {
    user: { token: string } | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext) as AuthContextType;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<{ token: string } | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ token });
        }
    }, []);

    const login = async (email: string, password: string) => {
        // Lógica de login
        api.post('login', { email, password }).then(res => {
            localStorage.setItem('token', res.data.token);
            setUser({ token: res.data.token });
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
