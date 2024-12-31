"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import Employee from '../types/Employee';

interface UserContextType {
    user: Employee | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    hasPermission: (permissionName: string) => boolean;
    hasAccessToModule: (moduleNames: string[]) => boolean;
    loading: boolean;
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
    const [user, setUser] = useState<Employee | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token && userId) {
            fetchUser(token, userId);
        } else {
            setUser({
                uuid: '1',
                externalUUID: '1257-323-12',
                company: { uuid: '1', name: 'Company 1' },
                department: { uuid: '1', name: 'Department 1' },
                employeeSuperior: { uuid: null, firstName: null, lastName: null },
                position: { uuid: '1', name: 'Position 1' },
                contractType: { uuid: '1', name: 'Contract type 1' },
                address: { country: 'Polska', city: 'Gdańsk', postcode: '11-111', street: 'Cicha 2' },
                role: {
                    uuid: '1',
                    name: 'Role 1',
                    permissions: [
                        { uuid: '1', name: 'notifications.create' },
                        { uuid: '2', name: 'companies.create' },
                        { uuid: '3', name: 'emails.send' }
                    ],
                },
                firstName: 'Emil',
                lastName: 'Johnson',
                pesel: '72022586569',
                email: 'emil.johnson@email.com',
                phone: ["333-222-111", "111-222-333"],
                employmentFrom: '2009-01-01',
                employmentTo: null,
                active: true,
                createdAt: '2024-06-11T15:30:45',
                updatedAt: '2024-12-17T07:30:00',
                deletedAt: null,
            });
            setLoading(false);
        }
    }, []);

    const fetchUser = async (token: string, userId: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            setUser(data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error(t('common.message.Błąd pobierania danych użytkownika'), error);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setUser(null);
        setIsAuthenticated(false);
    };

    const hasPermission = (permissionName: string): boolean => {
        return user?.role?.permissions?.some(permission => permission.name === permissionName) || false;
    };

    const hasAccessToModule = (moduleNames: string[]): boolean => {
        const modulePermissionsMap: { [key: string]: string } = {
            notifications: 'notifications',
            tasks: 'tasks',
            notes: 'notes',
            employees: 'employees',
            departments: 'departments',
            companies: 'companies',
            calendar: 'calendar',
            settings: 'settings',
            emails: 'emails',
        };


        return moduleNames.some(moduleName => {
            const basePermission = modulePermissionsMap[moduleName];
            if (!basePermission) {
                return false;
            }

            return user?.role?.permissions?.some(permission =>
                permission.name.startsWith(`${basePermission}.`)
            );
        });
    };

    return (
        <UserContext.Provider value={{ user, login, logout, isAuthenticated, hasPermission, hasAccessToModule, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export { useUser, UserProvider };
