import { useQuery } from '@tanstack/react-query';
import Position from '../../types/Position';
import fakePositions from '../../fakeData/Positions';

type SortDirection = 'asc' | 'desc' | undefined;

const fetchPositions = async (pageSize: number, pageIndex: number, sortBy: string, sortDirection: SortDirection): Promise<Position[]> => {
    // ToDo: dodać wywołanie endpointa z enpoitna API
    // const response = await axios.get('/api/positions', { params: { pageSize, pageIndex, sortBy, sortDirection } });
    // return response.data;

    pageSize = 10;
    pageIndex = 1;
    sortBy = 'name';
    sortDirection = 'desc';
    console.log(pageIndex, pageSize, sortBy, sortDirection);

    // Na razie zwrócimy dane z fakePositions
    return fakePositions;
};

const usePositionsQuery = (pageSize: number, pageIndex: number, sortBy: string, sortDirection: SortDirection) => {
    return useQuery<Position[]>({
        queryKey: ['positions', pageSize, pageIndex, sortBy, sortDirection],
        queryFn: () => fetchPositions(pageSize, pageIndex, sortBy, sortDirection),
    });
};

export default usePositionsQuery;
