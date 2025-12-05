import { useQuery } from '@tanstack/react-query';
import Position from '../../types/Position';
import axios from 'axios';
import { SERVICE_COMPANY_URL } from '@/app/utility/constans';
import { useTranslation } from 'react-i18next';

type SortDirection = 'asc' | 'desc' | undefined;

export interface PositionsResponse {
    items: Position[];
    total: number;
}

const fetchPositions = async (
    token: string,
    pageSize: number,
    page: number,
    sortBy: string,
    sortDirection: SortDirection,
    phrase: string
): Promise<PositionsResponse> => {
    try {
        const response = await axios.get(`${SERVICE_COMPANY_URL}/api/positions`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { pageSize, page, sortBy, sortDirection, phrase },
        });

        return {
            items: response.data.data.items || [],
            total: response.data.data.total || 0,
        };
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            window.location.href = '/user/logout';
        }
        throw error;
    }
};

const usePositionsQuery = (
    pageSize: number,
    page: number,
    sortBy: string,
    sortDirection: SortDirection,
    phrase: string
) => {
    const { t } = useTranslation();

    return useQuery<PositionsResponse>({
        queryKey: ['positions', pageSize, page, sortBy, sortDirection, phrase],
        queryFn: async () => {
            const token = localStorage.getItem('auth_token');
            if (!token) throw new Error(t('common.message.tokenIsMissing'));

            return fetchPositions(token, pageSize, page, sortBy, sortDirection, phrase);
        },
    });
};

export default usePositionsQuery;