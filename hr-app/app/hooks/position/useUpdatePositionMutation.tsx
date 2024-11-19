import { useMutation, useQueryClient } from '@tanstack/react-query';
import Position from '../../types/Position';
import fakePositions from '../../fake_data/Positions';

const updatePosition = async (updatedPosition: Position): Promise<Position[]> => {
    const updatedPositions = fakePositions.map(role =>
        role.uuid === updatedPosition.uuid ? updatedPosition : role
    );

    return updatedPositions;
};

const useAddPositionMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updatePosition,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['positions'] });
        },
        onError: (error) => {
            console.error('Błąd podczas aktualizacji stanowiska:', error);
        },
    });
};

export default useAddPositionMutation;
