import { useMutation, useQueryClient } from '@tanstack/react-query';
import ContractType from '../../types/ContractType';
import fakeContractTypes from '../../fakeData/ContractTypes';
import { useTranslation } from 'react-i18next';

const addContractType = async (contractType: ContractType): Promise<ContractType[]> => {
    const newContractType = { ...contractType, uuid: `${fakeContractTypes.length + 1}` };
    fakeContractTypes.push(newContractType);

    return fakeContractTypes;
};

const useAddContractTypeMutation = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: addContractType,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contractTypes'] });
        },
        onError: (error) => {
            console.error(t('contractType.add.error'), error);
        },
    });
};

export default useAddContractTypeMutation;
