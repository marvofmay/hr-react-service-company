import React from 'react';
import Role from '../../../types/Role';
import Preview from '../../modal/preview';
import { useTranslation } from 'react-i18next';

interface PreviewRoleModalProps {
    open: boolean;
    selectedRole: Role | null;
    onClose: () => void;
}

const PreviewRoleModal: React.FC<PreviewRoleModalProps> = ({ open, selectedRole, onClose }) => {
    const { t } = useTranslation();

    return (
        <Preview
            open={open}
            title={t('role.modal.preview.title')}
            details={{
                UUID: selectedRole?.uuid || 'N/D',
                [t('role.form.field.name')]: selectedRole?.name || 'N/D',
                [t('role.form.field.description')]: selectedRole?.description || 'N/D',
                [t('role.form.field.createdAt')]: selectedRole?.created_at || 'N/D',
                [t('role.form.field.updatedAt')]: selectedRole?.updated_at || 'N/D',
            }}
            onClose={onClose}
        />
    );
};

export default PreviewRoleModal;
