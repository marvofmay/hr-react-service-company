import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, IconButton, Button, Box, CircularProgress } from '@mui/material';
import { Preview, Delete } from '@mui/icons-material';
import SettingsIcon from "@mui/icons-material/Settings"
import Notification from '../../types/Notification';
import PreviewNotificationModal from './modal/Preview';
import DeleteNotificationModal from './modal/Delete';
import SettingsNotificationsModal from './modal/Settings';
import useNotificationsQuery from '../../hooks/notification/useNotificationsQuery';
import useDeleteNotificationMutation from '@/app/hooks/notification/useDeleteNotificationMutation';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

type SortDirection = 'asc' | 'desc' | undefined;

const NotificationsTable = () => {
    const [localNotifications, setLocalNotifications] = useState<Notification[] | null>([]);
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(0);
    const [sortBy, setSortBy] = useState('name');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [modalType, setModalType] = useState<string | null>(null);
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

    const { data, isLoading, error } = useNotificationsQuery(pageSize, pageIndex, sortBy, sortDirection);
    const { mutate: deleteNotificationMutate, isSuccess: isDeleteSuccess, error: isDeleteError } = useDeleteNotificationMutation();
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            setLocalNotifications(data);
        }
    }, [data]);

    useEffect(() => {
        if (isDeleteSuccess) {
            closeModal();
            toast.success(t('notification.delete.success'));
        }
        if (isDeleteError) {
            closeModal();
            toast.success(t('notification.delete.error'));
        }
    }, [isDeleteSuccess, isDeleteError]);

    const handleSort = (column: string) => {
        const direction = sortBy === column && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortBy(column);
        setSortDirection(direction);
    };

    const openModal = (type: string, notification: Notification | null = null) => {
        setModalType(type);
        setSelectedNotification(notification);
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedNotification(null);
    };

    const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(Number(event.target.value));
    };

    const handleDelete = (notificationToDelete: Notification) => {
        deleteNotificationMutate(notificationToDelete, {
            onSuccess: (currentNotifications: Notification[]) => {
                setLocalNotifications(currentNotifications);
            }
        });
    };

    return (
        <div>
            <Box display="flex" justifyContent="flex-end" marginBottom={2}>
                <Button variant="contained" color="success" startIcon={<SettingsIcon />} onClick={() => openModal('settings')}>
                    {t('notification.button.settings')}
                </Button>
            </Box>

            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                    <div>{t('common.message.somethingWentWrong')} :(</div>
                </Box>
            ) : localNotifications && localNotifications.length === 0 ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                    <div>{t('common.noData')}</div>
                </Box>
            ) : (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sortDirection={sortBy === 'id' ? sortDirection : false}
                                    onClick={() => handleSort('id')}
                                    sx={{ padding: '4px 8px' }}
                                >
                                    <TableSortLabel active={sortBy === 'id'} direction={sortBy === 'id' ? sortDirection : 'asc'}>
                                        #
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell
                                    sortDirection={sortBy === 'title' ? sortDirection : false}
                                    onClick={() => handleSort('title')}
                                    sx={{ padding: '4px 8px' }}
                                >
                                    <TableSortLabel active={sortBy === 'title'} direction={sortBy === 'title' ? sortDirection : 'asc'}>
                                        {t('notification.table.column.title')}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('notification.table.column.source')}</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('notification.table.column.readedAt')}</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('notification.table.column.createdAt')}</TableCell>
                                <TableCell sx={{ padding: '4px 8px' }}>{t('notification.table.column.actions')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {localNotifications?.map((notification, index) => (
                                <TableRow key={notification.uuid}>
                                    <TableCell sx={{ padding: '4px 8px' }}>{index + 1}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{notification.title}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{notification.source}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{notification.readedAt ? (<CheckCircleIcon color="success" fontSize="small" />) : (<CancelIcon color="error" fontSize="small" />)}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>{notification.createdAt}</TableCell>
                                    <TableCell sx={{ padding: '4px 8px' }}>
                                        <IconButton onClick={() => openModal('preview', notification)}><Preview /></IconButton>
                                        <IconButton onClick={() => openModal('delete', notification)}><Delete /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
            }

            {
                localNotifications && localNotifications.length > 0 && <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    component="div"
                    count={localNotifications.length}
                    rowsPerPage={pageSize}
                    page={pageIndex}
                    onPageChange={(event, newPage) => setPageIndex(newPage)}
                    onRowsPerPageChange={handlePageSizeChange}
                />
            }

            {
                modalType === 'preview' && <PreviewNotificationModal
                    open={true}
                    selectedNotification={selectedNotification}
                    onClose={closeModal}
                />
            }

            {
                modalType === 'delete' && <DeleteNotificationModal
                    open={true}
                    selectedNotification={selectedNotification}
                    onClose={closeModal}
                    onDeleteConfirm={notification => { handleDelete(notification); }}
                />
            }

            {
                modalType === 'settings' && <SettingsNotificationsModal
                    open={true}
                    onClose={closeModal}
                />
            }
        </div >
    );
};

export default NotificationsTable;
