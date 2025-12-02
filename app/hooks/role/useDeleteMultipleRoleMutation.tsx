import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import Role from '@/app/types/Role';
import { useTranslation } from 'react-i18next';
import { SERVICE_COMPANY_URL } from '@/app/utility/constans';

const deleteMultipleRole = async (rolesToDelete: Role[], token: string): Promise<string> => {
    try {
        const rolesUUIDs = {
            rolesUUIDs: rolesToDelete.map(item => item.uuid)
        };

        const response = await axios.delete(
            `${SERVICE_COMPANY_URL}/api/roles/multiple`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                data: rolesUUIDs
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

const useDeleteMultipleRoleMutation = () => {
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (rolesToDelete: Role[]) => {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error(t('common.message.tokenIsMissing'));
            }

            return deleteMultipleRole(rolesToDelete, token);
        },
        onSuccess: async () => {
            // await queryClient.invalidateQueries({
            //     queryKey: ['roles', pageSize, pageIndex, sortBy, sortDirection, phrase],
            // });

            // const updatedData = queryClient.getQueryData<{
            //     totalRoles: number;
            //     page: number;
            //     limit: number;
            //     items: Role[];
            // }>(['roles', pageSize, pageIndex, sortBy, sortDirection, phrase]);

            // console.log('updatedData', updatedData);

            // if (!updatedData || updatedData.items.length === 0) {
            //     if (pageIndex > 1) {
            //         setPageIndex(pageIndex - 1);
            //     }
            // }
        },
    });
};

export default useDeleteMultipleRoleMutation;
