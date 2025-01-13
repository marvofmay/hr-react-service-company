import { useMutation, useQueryClient } from '@tanstack/react-query';
import Role from '../../types/Role';
import fakeRoles from '../../fakeData/Roles';
import { useTranslation } from 'react-i18next';
import { SERVICE_COMPNY_URL } from '@/app/utility/constans';

const updateRole = async (updatedRole: Role): Promise<Role[]> => {
    const updatedRoles = fakeRoles.map(role =>
        role.uuid === updatedRole.uuid ? updatedRole : role
    );

    return updatedRoles;
};

const useUpdateRoleMutation = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: updateRole,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'] });
        },
        onError: (error) => {
            console.error(t('role.update.error'), error);
        },
    });
};

export default useUpdateRoleMutation;
