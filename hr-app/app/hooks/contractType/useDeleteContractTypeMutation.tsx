import { useMutation, useQueryClient } from '@tanstack/react-query';
import ContractType from '../../types/ContractType';
import fakeContractTypes from '../../fake_data/ContractTypes';
import { useTranslation } from 'react-i18next';

const deleteContractType = async (contractTypeToDelete: ContractType): Promise<ContractType[] | []> => {
    const currentContractTypes = fakeContractTypes.filter(contractType => contractType.uuid !== contractTypeToDelete.uuid);

    return currentContractTypes
};

const useDeleteContractTypeMutation = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: deleteContractType,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ContractTypes'] });
        },
        onError: (error) => {
            console.error(t('contractType.delete.error'), error);
        },
    });
};

export default useDeleteContractTypeMutation;
