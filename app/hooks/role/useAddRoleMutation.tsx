import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import Role from '@/app/types/Role';
import { useTranslation } from 'react-i18next';
import { SERVICE_COMPANY_URL } from '@/app/utility/constans';

const addRole = async (role: Role, token: string): Promise<string> => {
    const response = await axios.post(
        `${SERVICE_COMPANY_URL}/api/roles`,
        { name: role.name, description: role.description },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
    );
    return response.data.message;
};

const useAddRoleMutation = () => {
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (role: Role) => {
            const token = localStorage.getItem('token');
            if (!token) throw new Error(t('common.message.tokenIsMissing'));
            return addRole(role, token);
        }
    });
};

export default useAddRoleMutation;