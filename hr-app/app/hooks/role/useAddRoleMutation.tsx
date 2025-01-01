import { useMutation, useQueryClient } from '@tanstack/react-query';
import Role from '../../types/Role';
import fakeRoles from '../../fakeData/Roles';

const addRole = async (role: Role): Promise<Role[]> => {
    const newRole = { ...role, uuid: `${fakeRoles.length + 1}` };
    fakeRoles.push(newRole);

    return fakeRoles;
};

const useAddRoleMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addRole,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'] });
        },
        onError: (error) => {
            console.error('Błąd podczas dodawania roli:', error);
        },
    });
};

export default useAddRoleMutation;
