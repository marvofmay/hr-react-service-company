import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SERVICE_COMPANY_URL } from '@/app/utils/constans';
import { useTranslation } from 'react-i18next';

const fetchCompanyDescendantUuids = async (
    companyUUID: string,
    token: string
): Promise<string[]> => {
    const response = await axios.get<{ data: string[] }>(
        `${SERVICE_COMPANY_URL}/api/companies/${companyUUID}/descendant-uuids`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    return response.data.data ?? [];
};

export const useCompanyDescendantUuidsQuery = (companyUUID?: string) => {
    const { t } = useTranslation();

    return useQuery<string[]>({
        queryKey: ['company', companyUUID, 'descendantUuids'],
        queryFn: async () => {
            if (!companyUUID) return [];
            const token = localStorage.getItem('auth_token');
            if (!token) throw new Error(t('common.message.tokenIsMissing'));

            return fetchCompanyDescendantUuids(companyUUID, token);
        },
        enabled: !!companyUUID,
    });
};
