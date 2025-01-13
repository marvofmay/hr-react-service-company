import { useMutation, useQueryClient } from '@tanstack/react-query';
import Industry from '../../types/Industry';
import fakeIndustries from '../../fakeData/Industries';

const deleteIndustry = async (industryToDelete: Industry): Promise<Industry[] | []> => {
    const currentIndustries = fakeIndustries.filter(industry => industry.uuid !== industryToDelete.uuid);

    return currentIndustries
};

const useDeleteIndustryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteIndustry,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['industries'] });
        },
        onError: (error) => {
            console.error('Błąd podczas aktualizacji przemysłu:', error);
        },
    });
};

export default useDeleteIndustryMutation;
