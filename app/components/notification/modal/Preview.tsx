import React from 'react';
import Notification from '../../../types/Notification';
import Preview from '../../modal/Preview';
import { useTranslation } from 'react-i18next';

interface PreviewNotificationModalProps {
    open: boolean;
    selectedNotification: Notification | null;
    onClose: () => void;
}

const PreviewNotificationModal: React.FC<PreviewNotificationModalProps> = ({ open, selectedNotification, onClose }) => {
    const { t } = useTranslation();

    return (
        <Preview
            open={open}
            title={t('notification.modal.preview.title')}
            details={{
                UUID: selectedNotification?.uuid || 'N/D',
                [t('notification.form.field.name')]: selectedNotification?.title || 'N/D',
                [t('notification.form.field.message')]: selectedNotification?.message || 'N/D',
                [t('notification.form.field.createdAt')]: selectedNotification?.readedAt || 'N/D',
                [t('notification.form.field.createdAt')]: selectedNotification?.createdAt || 'N/D',
            }}
            onClose={onClose}
        />
    );
};

export default PreviewNotificationModal;
