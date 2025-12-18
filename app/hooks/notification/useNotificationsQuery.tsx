import { useQuery } from '@tanstack/react-query';
import Notification from '../../types/Notification';
import fakeNotifications from '../../fakeData/Notifications';
import { SortDirection } from '@/app/types/SortDirection';

const fetchNotifications = async (pageSize: number, pageIndex: number, sortBy: string, sortDirection: SortDirection): Promise<Notification[]> => {
    // ToDo: dodać wywołanie endpointa z enpoitna API
    // const response = await axios.get('/api/notifications', { params: { pageSize, pageIndex, sortBy, sortDirection } });
    // return response.data;

    pageSize = 10;
    pageIndex = 1;
    sortBy = 'name';
    sortDirection = 'desc';
    console.log(pageIndex, pageSize, sortBy, sortDirection);

    // Na razie zwrócimy dane z fakeNotifications
    return fakeNotifications;
};

const useNotificationsQuery = (pageSize: number, pageIndex: number, sortBy: string, sortDirection: SortDirection) => {
    return useQuery<Notification[]>({
        queryKey: ['notifications', pageSize, pageIndex, sortBy, sortDirection],
        queryFn: () => fetchNotifications(pageSize, pageIndex, sortBy, sortDirection),
    });
};

export default useNotificationsQuery;
