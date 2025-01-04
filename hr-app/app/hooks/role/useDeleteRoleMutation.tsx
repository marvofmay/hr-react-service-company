import { useMutation, useQueryClient } from '@tanstack/react-query';
import Role from '../../types/Role';
import fakeRoles from '../../fakeData/Roles';
import { useTranslation } from 'react-i18next';

const deleteRole = async (roleToDelete: Role): Promise<Role[] | []> => {
    const currentRoles = fakeRoles.filter(role => role.uuid !== roleToDelete.uuid);

    return currentRoles
};

const useDeleteRoleMutation = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: deleteRole,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'] });
        },
        onError: (error) => {
            console.error(t('role.update.error'), error);
        },
    });
};

export default useDeleteRoleMutation;
