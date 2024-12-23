import { useMutation, useQueryClient } from '@tanstack/react-query';
import Company from '../../types/Company';
import fakeCompanies from '../../fake_data/Companies';
import { useTranslation } from 'react-i18next';

const updateCompany = async (updatedCompany: Company): Promise<Company[]> => {
    const updatedCompanies = fakeCompanies.map(company =>
        company.uuid === updatedCompany.uuid ? updatedCompany : company
    );
    console.log('updatedCompanies', updatedCompany);

    return updatedCompanies;
};

const useAddCompanyMutation = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCompany,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['companies'] });
        },
        onError: (error) => {
            console.error(t('company.update.error'), error);
        },
    });
};

export default useAddCompanyMutation;
