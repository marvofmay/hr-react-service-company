import CompanyOption from "@/app/types/CompanyOption";
import useCompaniesQuery from "./useCompaniesQuery";
import { SortDirection } from "@/app/types/SortDirection";

interface UseCompaniesOptionsParams {
    pageSize: number;
    page: number;
    sortBy: string;
    sortDirection: SortDirection;
    excludeCompanyUUIDs?: string[];
    phrase?: string;
    includes?: string;
    filters?: {
        active?: boolean | null;
        parentCompanyUUID?: string | null;
    };
}

export const useCompanyOptions = ({
    pageSize,
    page,
    sortBy,
    sortDirection,
    excludeCompanyUUIDs = [],
    phrase,
    includes,
    filters = {},
}: UseCompaniesOptionsParams) => {
    const normalizedFilters = {
        active: filters.active ?? undefined,
        parentCompanyUUID: filters.parentCompanyUUID ?? undefined,
    };

    const query = useCompaniesQuery(
        pageSize,
        page,
        sortBy,
        sortDirection,
        phrase ?? null,
        includes ?? null,
        normalizedFilters
    );

    const options: CompanyOption[] =
        query.data?.items
            .filter(company => !excludeCompanyUUIDs.includes(company.uuid))
            .map(company => ({
                uuid: company.uuid,
                fullName: company.fullName ?? '',
            })) ?? [];

    return {
        ...query,
        options,
    };
};
