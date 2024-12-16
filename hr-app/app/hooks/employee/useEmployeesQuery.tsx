import { useQuery } from '@tanstack/react-query';
import Employee from '../../types/Employee';
import fakeEmployees from '../../fake_data/Employees';

type SortDirection = 'asc' | 'desc' | undefined;

const fetchEmployees = async (pageSize: number, pageIndex: number, sortBy: string, sortDirection: SortDirection): Promise<Employee[]> => {
    // ToDo: dodać wywołanie endpointa z enpoitna API
    // const response = await axios.get('/api/employees', { params: { pageSize, pageIndex, sortBy, sortDirection } });
    // return response.data;

    // Na razie zwrócimy dane z fakeEmployees
    return fakeEmployees;
};

const useEmployeesQuery = (pageSize: number, pageIndex: number, sortBy: string, sortDirection: SortDirection) => {
    return useQuery<Employee[]>({
        queryKey: ['employees', pageSize, pageIndex, sortBy, sortDirection],
        queryFn: () => fetchEmployees(pageSize, pageIndex, sortBy, sortDirection),
    });
};

export default useEmployeesQuery;
