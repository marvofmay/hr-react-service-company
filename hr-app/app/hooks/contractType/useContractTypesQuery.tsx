import { useQuery } from '@tanstack/react-query';
import ContractType from '../../types/ContractType';
import fakeContractTypes from '../../fake_data/ContractTypes';

type SortDirection = 'asc' | 'desc' | undefined;

const fetchContractTypes = async (pageSize: number, pageIndex: number, sortBy: string, sortDirection: SortDirection): Promise<ContractType[]> => {
    // ToDo: dodać wywołanie endpointa z enpoitna API
    // const response = await axios.get('/api/ContractTypes', { params: { pageSize, pageIndex, sortBy, sortDirection } });
    // return response.data;

    // Na razie zwrócimy dane z fakeContractTypes
    return fakeContractTypes;
};

const useContractTypesQuery = (pageSize: number, pageIndex: number, sortBy: string, sortDirection: SortDirection) => {
    return useQuery<ContractType[]>({
        queryKey: ['contractTypes', pageSize, pageIndex, sortBy, sortDirection],
        queryFn: () => fetchContractTypes(pageSize, pageIndex, sortBy, sortDirection),
    });
};

export default useContractTypesQuery;
