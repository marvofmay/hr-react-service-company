import { useQuery } from '@tanstack/react-query';
import Department from '../../types/Department';
import axios from 'axios';
import { SERVICE_COMPANY_URL } from '@/app/utility/constans';
import { useTranslation } from 'react-i18next';

type SortDirection = 'asc' | 'desc' | undefined;

export interface DepartmentsResponse {
    items: Department[];
    total: number;
}

const fetchDepartments = async (
    token: string,
    pageSize: number,
    page: number,
    sortBy: string,
    sortDirection: SortDirection,
    phrase?: string | null,
    includes?: string | null,
): Promise<DepartmentsResponse> => {
    try {
        const params: any = {
            pageSize,
            page,
            sortBy,
            sortDirection,
        };

        if (phrase) params.phrase = phrase;
        if (includes) params.includes = includes;

        const response = await axios.get(`${SERVICE_COMPANY_URL}/api/departments`, {
            headers: { Authorization: `Bearer ${token}` },
            params,
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

const useDepartmentsQuery = (
    pageSize: number,
    page: number,
    sortBy: string,
    sortDirection: SortDirection,
    phrase?: string | null,
    includes?: string | null,
) => {
    const { t } = useTranslation();

    const normalizedPhrase = phrase ?? undefined;
    const normalizedIncludes = includes ?? undefined;

    return useQuery<DepartmentsResponse>({
        queryKey: [
            'departments',
            pageSize,
            page,
            sortBy,
            sortDirection,
            normalizedPhrase,
        ],
        queryFn: async () => {
            const token = localStorage.getItem('auth_token');
            if (!token) throw new Error(t('common.message.tokenIsMissing'));

            return fetchDepartments(
                token,
                pageSize,
                page,
                sortBy,
                sortDirection,
                normalizedPhrase,
                normalizedIncludes
            );
        },
    });
};

export default useDepartmentsQuery;
