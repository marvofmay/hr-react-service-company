"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

interface UserContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
};

interface UserProviderProps {
    children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
    const { t } = useTranslation();
    const [user, setUser] = useState<User | null>(null);
    //const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token && userId) {
            fetchUser(token, userId);
        }
    }, []);

    const fetchUser = async (token: string, userId: string) => {
        try {
            const res = await fetch(`/api/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            setUser({
                firstName: 'aaa',
                lastName: 'cccc',
                email: 'ddd',
                role: 'eee'
            });
            setIsAuthenticated(true);
        } catch (error) {
            console.error(t('common.message.Błąd pobierania danych użytkownika'), error);
            setIsAuthenticated(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                throw new Error(t('common.message.errorWhileTryingToLogIn'));
            }

            const data = await res.json();
            const { token, userId } = data;

            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);

            await fetchUser(token, userId);
        } catch (error) {
            console.error('Błąd logowania:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <UserContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </UserContext.Provider>
    );
};

export { useUser, UserProvider };
