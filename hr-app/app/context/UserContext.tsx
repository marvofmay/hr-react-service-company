"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import Employee from '../types/Employee';
import { SERVICE_COMPNY_URL } from '@/app/utility/constans';

interface UserContextType {
    employee: Employee | null;
    login: (email: string | FormDataEntryValue, password: string | FormDataEntryValue) => Promise<void>;
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
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const employeeUUID = localStorage.getItem('employeeUUID');
        if (token) {
            fetchEmployee(token, employeeUUID);
        } else {
            // setEmployee({
            //     uuid: '1',
            //     externalUUID: '1257-323-12',
            //     company: { uuid: '1', name: 'Company 1' },
            //     department: { uuid: '1', name: 'Department 1' },
            //     employeeSuperior: { uuid: null, firstName: null, lastName: null },
            //     position: { uuid: '1', name: 'Position 1' },
            //     contractType: { uuid: '1', name: 'Contract type 1' },
            //     address: { country: 'Polska', city: 'Gdańsk', postcode: '11-111', street: 'Cicha 2' },
            //     role: {
            //         uuid: '1',
            //         name: 'admin',
            //         permissions: [
            //             { uuid: '1', name: 'notifications.view' },
            //             { uuid: '2', name: 'notifications.delete' },
            //             { uuid: '3', name: 'notifications.settings' },
            //             { uuid: '4', name: 'companies.create' },
            //             { uuid: '5', name: 'companies.edit' },
            //             { uuid: '6', name: 'companies.view' },
            //             { uuid: '7', name: 'companies.delete' },
            //             { uuid: '8', name: 'emails.send' },
            //             { uuid: '9', name: 'emails.view' },
            //             { uuid: '10', name: 'task.create' },
            //             { uuid: '11', name: 'task.edit' },
            //             { uuid: '12', name: 'task.view' },
            //             { uuid: '13', name: 'task.delete' },
            //         ],
            //     },
            //     firstName: 'Emil',
            //     lastName: 'Johnson',
            //     pesel: '72022586569',
            //     email: 'emil.johnson@email.com',
            //     phone: ["333-222-111", "111-222-333"],
            //     employmentFrom: '2009-01-01',
            //     employmentTo: null,
            //     active: true,
            //     createdAt: '2024-06-11T15:30:45',
            //     updatedAt: '2024-12-17T07:30:00',
            //     deletedAt: null,
            // });
            setLoading(false);
        }
    }, []);

    const fetchEmployee = async (token: string, employeeUUID: string | null) => {
        setLoading(true);

        if (token && token !== 'undefined' && employeeUUID && employeeUUID !== 'undefined') {
            const res = await fetch(`${SERVICE_COMPNY_URL}/api/employees/${employeeUUID}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            setEmployee(data);
            setIsAuthenticated(true);
        } else if (token && token !== 'undefined') {
            setEmployee({
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
                    name: 'admin',
                    permissions: [
                        { uuid: '1', name: 'notifications.preview' },
                        { uuid: '2', name: 'notifications.delete' },
                        { uuid: '3', name: 'notifications.settings' },
                        { uuid: '4', name: 'notifications.list' },
                        { uuid: '5', name: 'companies.create' },
                        { uuid: '6', name: 'companies.edit' },
                        { uuid: '7', name: 'companies.preview' },
                        { uuid: '8', name: 'companies.list' },
                        { uuid: '9', name: 'companies.delete' },
                        { uuid: '10', name: 'emails.send' },
                        { uuid: '11', name: 'emails.preview' },
                        { uuid: '12', name: 'task.create' },
                        { uuid: '13', name: 'task.edit' },
                        { uuid: '14', name: 'task.preview' },
                        { uuid: '15', name: 'task.delete' },
                        { uuid: '16', name: 'task.list' },
                        { uuid: '17', name: 'roles.list' },
                        { uuid: '18', name: 'roles.create' },
                        { uuid: '19', name: 'roles.preview' },
                        { uuid: '20', name: 'roles.edit' },
                        { uuid: '21', name: 'roles.delete' },
                        { uuid: '17', name: 'notes.list' },
                        // { uuid: '18', name: 'notes.create' },
                        // { uuid: '19', name: 'notes.preview' },
                        // { uuid: '20', name: 'notes.edit' },
                        // { uuid: '21', name: 'notes.delete' },
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
            setIsAuthenticated(true);
            setLoading(false);
        } else {
            setIsAuthenticated(false);
            setLoading(false);

            throw new Error(t('common.message.errorWhileTryingGetEmployeeData'));
        }
    };

    const login = async (email: string | FormDataEntryValue, password: string | FormDataEntryValue) => {
        setLoading(true);

        const res = await fetch(`${SERVICE_COMPNY_URL}/api/login_check`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            throw new Error(t('common.message.errorWhileTryingToLogIn'));
        }

        const data = await res.json();
        const { token, employeeUUID } = data;

        if (token && token !== 'undefined') {
            localStorage.setItem('token', token);
        }
        if (employeeUUID && employeeUUID !== 'undefined') {
            localStorage.setItem('employeeUUID', employeeUUID);
        }

        if (token && token !== 'undefined') {
            await fetchEmployee(token, employeeUUID);
        }

        setLoading(false);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setEmployee(null);
        setIsAuthenticated(false);
    };

    const hasPermission = (permissionName: string): boolean => {
        return employee?.role?.permissions?.some(permission => permission.name === permissionName) || false;
    };

    const hasAccessToModule = (moduleNames: string[]): boolean => {
        const modulePermissionsMap: { [key: string]: string } = {
            tasks: 'tasks',
            notes: 'notes',
            roles: 'roles',
            employees: 'employees',
            departments: 'departments',
            companies: 'companies',
            settings: 'settings',
            calendar: 'calendar',
            notifications: 'notifications',
            pages: 'pages',
            emails: 'emails',
            requests: 'requests',
        };

        return moduleNames.some(moduleName => {
            const basePermission = modulePermissionsMap[moduleName];
            if (!basePermission) {
                return false;
            }

            return employee?.role?.permissions?.some(permission =>
                permission.name.startsWith(`${basePermission}.`)
            );
        });
    };

    return (
        <UserContext.Provider value={{ employee, login, logout, isAuthenticated, hasPermission, hasAccessToModule, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export { useUser, UserProvider };
