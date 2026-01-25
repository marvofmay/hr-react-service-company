import React from 'react';
import Notification from '../../../types/Notification';
import DeleteConfirmModal from '../../modal/DeleteConfirm';
import { useTranslation } from 'react-i18next';

interface DeleteNotificationModalProps {
    open: boolean;
    selectedNotification: Notification | null;
    onClose: () => void;
    onDeleteConfirm: (notification: Notification) => void;
}

const DeleteNotificationModal: React.FC<DeleteNotificationModalProps> = ({ open, selectedNotification, onClose, onDeleteConfirm }) => {
    const { t } = useTranslation();

    const handleDelete = () => {
        if (selectedNotification) {
            onDeleteConfirm(selectedNotification);
        }
        onClose();
    };

    return (
        <DeleteConfirmModal
            open={open}
            selectedItem={selectedNotification}
            onClose={onClose}
            onDeleteConfirm={handleDelete}
            title={t('notification.modal.delete.title')}
            description={`${t('notification.modal.delete.question')}: ${selectedNotification?.message.title} ?`}
        />
    );
};

export default DeleteNotificationModal;
