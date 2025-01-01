import { useMutation, useQueryClient } from '@tanstack/react-query';
import Position from '../../types/Position';
import fakePositions from '../../fakeData/Positions';
import { useTranslation } from 'react-i18next';

const updatePosition = async (updatedPosition: Position): Promise<Position[]> => {
    const updatedPositions = fakePositions.map(role =>
        role.uuid === updatedPosition.uuid ? updatedPosition : role
    );

    return updatedPositions;
};

const useUpdatePositionMutation = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updatePosition,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['positions'] });
        },
        onError: (error) => {
            console.error(t('position.update.error'), error);
        },
    });
};

export default useUpdatePositionMutation;
