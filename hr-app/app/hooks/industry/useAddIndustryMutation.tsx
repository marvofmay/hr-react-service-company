import { useMutation, useQueryClient } from '@tanstack/react-query';
import Industry from '../../types/Industry';
import fakeIndustries from '../../fake_data/Industries';

const addIndustry = async (industry: Industry): Promise<Industry[]> => {
    const newIndustry = { ...industry, uuid: `${fakeIndustries.length + 1}` };
    fakeIndustries.push(newIndustry);

    return fakeIndustries;
};

const useAddIndustryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addIndustry,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['industries'] });
        },
        onError: (error) => {
            console.error('Błąd podczas dodawania przemysłu:', error);
        },
    });
};

export default useAddIndustryMutation;
