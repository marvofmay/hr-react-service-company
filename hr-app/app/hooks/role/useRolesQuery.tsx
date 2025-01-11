import { useQuery } from '@tanstack/react-query';
import Role from '../../types/Role';
import axios from 'axios';
import { SERVICE_COMPNY_URL } from '@/app/utility/constans';

type SortDirection = 'asc' | 'desc' | undefined;

const fetchRoles = async (
    pageSize: number,
    pageIndex: number,
    sortBy: string,
    sortDirection: SortDirection
): Promise<Role[]> => {

    const token = localStorage.getItem('token');
    console.log(pageSize, pageIndex, sortBy, sortDirection);
    if (!token) {
        throw new Error('Token is missing');
    }

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
            },
        });

        return response.data.data;

    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            window.location.href = '/user/logout';
        }

        console.error('Error fetching roles:', error);
        throw new Error('Error fetching roles');
    }
};

const useRolesQuery = (pageSize: number, pageIndex: number, sortBy: string, sortDirection: SortDirection) => {
    return useQuery<any>({
        queryKey: ['roles', pageSize, pageIndex, sortBy, sortDirection],
        queryFn: () => fetchRoles(pageSize, pageIndex, sortBy, sortDirection),
    });
};

export default useRolesQuery;
