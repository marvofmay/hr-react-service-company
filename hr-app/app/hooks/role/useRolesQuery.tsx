import { useQuery } from '@tanstack/react-query';
import Role from '../../types/Role';
import fakeRoles from '../../fake_data/Roles';

type SortDirection = 'asc' | 'desc' | undefined;

const fetchRoles = async (pageSize: number, pageIndex: number, sortBy: string, sortDirection: SortDirection): Promise<Role[]> => {
    // Tutaj można dodać prawdziwe wywołanie API
    // const response = await axios.get('/api/roles', { params: { pageSize, pageIndex, sortBy, sortDirection } });
    // return response.data;

    // Na razie zwrócimy dane z fakeRoles
    return fakeRoles;
};

const useRolesQuery = (pageSize: number, pageIndex: number, sortBy: string, sortDirection: SortDirection) => {
    return useQuery<Role[]>({
        queryKey: ['roles', pageSize, pageIndex, sortBy, sortDirection],
        queryFn: () => fetchRoles(pageSize, pageIndex, sortBy, sortDirection),
    });
};

export default useRolesQuery;
