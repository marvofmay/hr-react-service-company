import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import Role from '@/app/types/Role';
import { useTranslation } from 'react-i18next';
import { SERVICE_COMPANY_URL } from '@/app/utility/constans';

const deleteRole = async (roleToDelete: Role, token: string): Promise<string> => {
    try {
        const response = await axios.delete(
            `${SERVICE_COMPANY_URL}/api/roles/${roleToDelete.uuid}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('response', response);

        return response.data.message;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            window.location.href = '/user/logout';
        }

        throw error;
    }
};

const useDeleteRoleMutation = () => {
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (roleToDelete: Role) => {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error(t('common.message.tokenIsMissing'));
            }

            return deleteRole(roleToDelete, token);
        }
    });
};

export default useDeleteRoleMutation;
