import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import ContractType from '@/app/types/ContractType';
import { useTranslation } from 'react-i18next';
import { SERVICE_COMPANY_URL } from '@/app/utils/constans';

const addContractType = async (contractType: ContractType, token: string): Promise<string> => {
    const response = await axios.post(
        `${SERVICE_COMPANY_URL}/api/contract_types`,
        { name: contractType.name, description: contractType.description },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
    );
    return response.data.message;
};

const useAddContractTypeMutation = () => {
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (contractType: ContractType) => {
            const token = localStorage.getItem("auth_token");
            if (!token) throw new Error(t('common.message.tokenIsMissing'));
            return addContractType(contractType, token);
        }
    });
};

export default useAddContractTypeMutation;