import { useMutation, useQueryClient } from '@tanstack/react-query';
import Industry from '../../types/Industry';
import fakeIndustries from '../../fakeData/Industries';
import { useTranslation } from 'react-i18next';

const updateIndustry = async (updatedIndustry: Industry): Promise<Industry[]> => {
    const updatedIndustries = fakeIndustries.map(industry =>
        industry.uuid === updatedIndustry.uuid ? updatedIndustry : industry
    );

    return updatedIndustries;
};

const useUpdateIndustryMutation = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateIndustry,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['industries'] });
        },
        onError: (error) => {
            console.error(t('industry.update.error'), error);
        },
    });
};

export default useUpdateIndustryMutation;
