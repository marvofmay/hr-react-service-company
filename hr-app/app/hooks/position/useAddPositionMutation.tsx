import { useMutation, useQueryClient } from '@tanstack/react-query';
import Position from '../../types/Position';
import fakePositions from '../../fake_data/Positions';

const addPosition = async (position: Position): Promise<Position[]> => {
    const newPosition = { ...position, uuid: `${fakePositions.length + 1}` };
    fakePositions.push(newPosition);

    return fakePositions;
};

const useAddPositionMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addPosition,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['positions'] });
        },
        onError: (error) => {
            console.error('Błąd podczas dodawania stanowiska:', error);
        },
    });
};

export default useAddPositionMutation;
