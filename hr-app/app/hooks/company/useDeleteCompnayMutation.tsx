import { useMutation, useQueryClient } from '@tanstack/react-query';
import Company from '../../types/Company';
import fakeCompanies from '../../fake_data/Companies';
import { useTranslation } from 'react-i18next';

const deleteCompany = async (companyToDelete: Company): Promise<Company[] | []> => {
    const currentCompanies = fakeCompanies.filter(company => company.uuid !== companyToDelete.uuid);

    return currentCompanies
};

const useDeleteCompanyMutation = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCompany,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['companies'] });
        },
        onError: (error) => {
            console.error(t('company.delete.error'), error);
        },
    });
};

export default useDeleteCompanyMutation;
