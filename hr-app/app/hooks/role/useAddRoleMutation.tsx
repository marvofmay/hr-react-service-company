import { useMutation, useQueryClient } from '@tanstack/react-query';
import Role from '../../types/Role';
import fakeRoles from '../../fakeData/Roles';
import { useTranslation } from 'react-i18next';

const addRole = async (role: Role): Promise<Role[]> => {
    const newRole = { ...role, uuid: `${fakeRoles.length + 1}` };
    fakeRoles.push(newRole);

    return fakeRoles;
};

const useAddRoleMutation = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: addRole,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'] });
        },
        onError: (error) => {
            console.error(t('role.add.error'), error);
        },
    });
};

export default useAddRoleMutation;
