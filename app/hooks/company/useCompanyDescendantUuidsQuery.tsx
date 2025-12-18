import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SERVICE_COMPANY_URL } from '@/app/utils/constans';

const fetchCompanyDescendantUuids = async (
    companyUUID: string
): Promise<string[]> => {
    const { data } = await axios.get<{ uuids: string[] }>(
        `${SERVICE_COMPANY_URL}companies/${companyUUID}/descendant-uuids`
    );

    return data.uuids;
};

export const useCompanyDescendantUuidsQuery = (companyUUID?: string) => {
    return useQuery<string[]>({
        queryKey: ['company', companyUUID, 'descendantUuids'],
        queryFn: async () => fetchCompanyDescendantUuids(companyUUID!),
        enabled: !!companyUUID,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    });
};
