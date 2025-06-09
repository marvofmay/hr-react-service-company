import { useQuery } from '@tanstack/react-query';
import Role from '../../types/Role';
import axios from 'axios';
import { SERVICE_COMPNY_URL } from '@/app/utility/constans';
import { useTranslation } from 'react-i18next';

type SortDirection = 'asc' | 'desc' | undefined;

const fetchRoles = async (
    token: string,
    pageSize: number,
    pageIndex: number,
    sortBy: string,
    sortDirection: SortDirection,
    phrase: string
): Promise<Role[]> => {

    try {
        const response = await axios.get(`${SERVICE_COMPNY_URL}/api/roles`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                pageSize,
                pageIndex,
                sortBy,
                sortDirection,
                phrase
            },
        });

        return response.data.data;

    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            window.location.href = '/user/logout';
        }

        throw error;
    }
};

const useRolesQuery = (pageSize: number, pageIndex: number, sortBy: string, sortDirection: SortDirection, phrase: string) => {
    const { t } = useTranslation();

    return useQuery<any>({
        queryKey: ['roles', pageSize, pageIndex, sortBy, sortDirection, phrase],
        queryFn: async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error(t('common.message.tokenIsMissing'));
            }

            const roles = await fetchRoles(token, pageSize, pageIndex, sortBy, sortDirection, phrase);

            return roles || [];
        }
    });
};

export default useRolesQuery;