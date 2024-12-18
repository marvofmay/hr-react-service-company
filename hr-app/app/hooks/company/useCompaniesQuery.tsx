import { useQuery } from '@tanstack/react-query';
import Company from '../../types/Company';
import fakeCompanies from '../../fake_data/Companies';

type SortDirection = 'asc' | 'desc' | undefined;

const fetchCompanies = async (pageSize: number, pageIndex: number, sortBy: string, sortDirection: SortDirection): Promise<Company[]> => {
    // ToDo: dodać wywołanie endpointa z API
    // const response = await axios.get('/api/companies', { params: { pageSize, pageIndex, sortBy, sortDirection } });
    // return response.data;

    // Na razie zwrócimy dane z fakeCompanies
    return fakeCompanies;
};

const useCompaniesQuery = (pageSize: number, pageIndex: number, sortBy: string, sortDirection: SortDirection) => {
    return useQuery<Company[]>({
        queryKey: ['companies', pageSize, pageIndex, sortBy, sortDirection],
        queryFn: () => fetchCompanies(pageSize, pageIndex, sortBy, sortDirection),
    });
};

export default useCompaniesQuery;
