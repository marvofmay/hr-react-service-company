import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import Industry from '@/app/types/Industry';
import { useTranslation } from 'react-i18next';
import { SERVICE_COMPANY_URL } from '@/app/utils/constans';

const addIndustry = async (role: Industry, token: string): Promise<string> => {
    const response = await axios.post(
        `${SERVICE_COMPANY_URL}/api/industries`,
        { name: role.name, description: role.description },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
    );
    return response.data.message;
};

const useAddIndustryMutation = () => {
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (role: Industry) => {
            const token = localStorage.getItem("auth_token");
            if (!token) throw new Error(t('common.message.tokenIsMissing'));
            return addIndustry(role, token);
        }
    });
};

export default useAddIndustryMutation;
