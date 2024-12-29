import { useMutation, useQueryClient } from '@tanstack/react-query';
import ContractType from '../../types/ContractType';
import fakeContractTypes from '../../fake_data/ContractTypes';
import { useTranslation } from 'react-i18next';

const updateContractType = async (updatedContractType: ContractType): Promise<ContractType[]> => {
    const updatedContractTypes = fakeContractTypes.map(role =>
        role.uuid === updatedContractType.uuid ? updatedContractType : role
    );

    return updatedContractTypes;
};

const useAddContractTypeMutation = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: updateContractType,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contractTypes'] });
        },
        onError: (error) => {
            console.error(t('contractType.update.error'), error);
        },
    });
};

export default useAddContractTypeMutation;
