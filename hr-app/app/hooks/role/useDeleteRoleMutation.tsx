import { useMutation, useQueryClient } from '@tanstack/react-query';
import Role from '../../types/Role';
import fakeRoles from '../../fake_data/Roles';

const deleteRole = async (roleToDelete: Role): Promise<Role[] | []> => {
    const currentRoles = fakeRoles.filter(role => role.uuid !== roleToDelete.uuid);

    return currentRoles
};

const useDeleteRoleMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteRole,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'] });
        },
        onError: (error) => {
            console.error('Błąd podczas aktualizacji roli:', error);
        },
    });
};

export default useDeleteRoleMutation;
