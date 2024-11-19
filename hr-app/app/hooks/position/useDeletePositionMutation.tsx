import { useMutation, useQueryClient } from '@tanstack/react-query';
import Position from '../../types/Position';
import fakePositions from '../../fake_data/Positions';

const deletePosition = async (positionToDelete: Position): Promise<Position[] | []> => {
    const currentPositions = fakePositions.filter(position => position.uuid !== positionToDelete.uuid);

    return currentPositions
};

const useDeletePositionMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePosition,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['positions'] });
        },
        onError: (error) => {
            console.error('Błąd podczas aktualizacji stanowiska:', error);
        },
    });
};

export default useDeletePositionMutation;
