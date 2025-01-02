import { useMutation, useQueryClient } from '@tanstack/react-query';
import Notification from '../../types/Notification';
import fakeNotifications from '../../fakeData/Notifications';

const deleteNotification = async (notificationToDelete: Notification): Promise<Notification[] | []> => {
    const currentNotifications = fakeNotifications.filter(notification => notification.uuid !== notificationToDelete.uuid);

    return currentNotifications
};

const useDeleteNotificationMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteNotification,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        },
        onError: (error) => {
            console.error('Błąd podczas aktualizacji roli:', error);
        },
    });
};

export default useDeleteNotificationMutation;
