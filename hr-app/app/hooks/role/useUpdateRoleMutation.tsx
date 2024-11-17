import { useMutation, useQueryClient } from '@tanstack/react-query';
import Role from '../../types/Role';
import fakeRoles from '../../fake_data/Roles';

const updateRole = async (updatedRole: Role): Promise<Role[]> => {
    const updatedRoles = fakeRoles.map(role =>
        role.uuid === updatedRole.uuid ? updatedRole : role
    );

    return updatedRoles;
};

const useAddRoleMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateRole,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'] });
        },
        onError: (error) => {
            console.error('Błąd podczas aktualizacji roli:', error);
        },
    });
};

export default useAddRoleMutation;
