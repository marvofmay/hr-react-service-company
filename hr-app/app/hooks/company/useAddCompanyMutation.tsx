import { useMutation, useQueryClient } from '@tanstack/react-query';
import Company from '../../types/Company';
import fakeCompanies from '../../fake_data/Companies';
import { useTranslation } from 'react-i18next';

const addCompany = async (company: Company): Promise<Company[]> => {
    const newCompany = { ...company, uuid: `${fakeCompanies.length + 1}` };
    fakeCompanies.push(newCompany);

    return fakeCompanies;
};

const useAddCompanyMutation = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addCompany,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['companies'] });
        },
        onError: (error) => {
            console.error(t('company.add.error'), error);
        },
    });
};

export default useAddCompanyMutation;
