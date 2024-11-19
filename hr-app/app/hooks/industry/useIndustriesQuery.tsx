import { useQuery } from '@tanstack/react-query';
import Industry from '../../types/Industry';
import fakeIndustries from '../../fake_data/Industries';

type SortDirection = 'asc' | 'desc' | undefined;

const fetchIndustries = async (pageSize: number, pageIndex: number, sortBy: string, sortDirection: SortDirection): Promise<Industry[]> => {
    // ToDo: dodać wywołanie endpointa z enpoitna API
    // const response = await axios.get('/api/industries', { params: { pageSize, pageIndex, sortBy, sortDirection } });
    // return response.data;

    // Na razie zwrócimy dane z fakeIndustries
    return fakeIndustries;
};

const useIndustriesQuery = (pageSize: number, pageIndex: number, sortBy: string, sortDirection: SortDirection) => {
    return useQuery<Industry[]>({
        queryKey: ['industries', pageSize, pageIndex, sortBy, sortDirection],
        queryFn: () => fetchIndustries(pageSize, pageIndex, sortBy, sortDirection),
    });
};

export default useIndustriesQuery;
