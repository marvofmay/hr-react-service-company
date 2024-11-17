import { useMutation, useQueryClient } from '@tanstack/react-query';
import Role from '../../types/Role';
import fakeIndustries from '../../fake_data/Industries';

const updateRole = async (updatedRole: Role): Promise<Role[]> => {
    const updatedIndustries = fakeIndustries.map(industry =>
        industry.uuid === updatedRole.uuid ? updatedRole : industry
    );

    return updatedIndustries;
};

const useAddRoleMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateRole,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['industries'] });
        },
        onError: (error) => {
            console.error('Błąd podczas aktualizacji przemysłu:', error);
        },
    });
};

export default useAddRoleMutation;
