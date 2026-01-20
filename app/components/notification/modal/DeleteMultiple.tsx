import React, { useState } from 'react';
import Notification from '../../../types/Notification';
import DeleteMultipleConfirmModal from '../../modal/DeleteMultipleConfirm';
import { useTranslation } from 'react-i18next';

interface DeleteMultipleNotificationsModalProps {
    open: boolean;
    selectedNotifications: Notification[] | null;
    onClose: () => void;
    onDeleteMultipleConfirm: (notifications: Notification[]) => Promise<void>;
}

const DeleteMultipleNotificationsModal: React.FC<DeleteMultipleNotificationsModalProps> = ({ open, selectedNotifications, onClose, onDeleteMultipleConfirm }) => {
    const { t } = useTranslation();

    const [errorAPI, setErrorAPI] = useState<string>();
    const [errorsAPI, setErrorsAPI] = useState<Record<string, string> | null>(null);

    const handleDeleteMultiple = async () => {
        try {
            if (selectedNotifications) {
                await onDeleteMultipleConfirm(selectedNotifications);
            }

            onClose();
        } catch (error: unknown) {
            if (
                typeof error === 'object' &&
                error !== null &&
                'response' in error &&
                (error as any).response?.data?.message
            ) {
                setErrorAPI((error as any).response.data.message);
                setErrorsAPI((error as any).response.data.errors);
            } else {
                setErrorAPI('Wystąpił nieznany błąd');
            }
        }
    };

    return (
        <DeleteMultipleConfirmModal
            open={open}
            selectedItems={selectedNotifications}
            onClose={onClose}
            onDeleteMultipleConfirm={handleDeleteMultiple}
            title={t('notification.modal.delete.title')}
            description={`${t('notification.modal.delete.question')}: ${selectedNotifications?.length ? selectedNotifications.map(notification => notification.message.title).join(", ") : ''}?`}
            errorAPI={errorAPI}
            errorsAPI={errorsAPI}
        />
    );
};

export default DeleteMultipleNotificationsModal;
