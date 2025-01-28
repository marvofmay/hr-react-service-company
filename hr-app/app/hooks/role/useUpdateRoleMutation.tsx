import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Role from '../../types/Role';
import { useTranslation } from 'react-i18next';
import { SERVICE_COMPNY_URL } from '@/app/utility/constans';

const updateRole = async (updatedRole: Role, token: string): Promise<string> => {
    try {
        const response = await axios.put(
            `${SERVICE_COMPNY_URL}/api/roles/${updatedRole.uuid}`,
            {
                uuid: updatedRole.uuid,
                name: updatedRole.name,
                description: updatedRole.description,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data.message;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            window.location.href = '/user/logout';
        }

        console.log('error hook updateRole', error);

        throw error;
    }
};

const useUpdateRoleMutation = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (updatedRole: Role) => {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error(t('common.message.tokenIsMissing'));
            }

            return updateRole(updatedRole, token);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'] });
        },
        onError: (error) => {
            throw error;
        },
    });
};

export default useUpdateRoleMutation;
