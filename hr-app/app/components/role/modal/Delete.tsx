import React from 'react';
import Role from '../../../types/Role';
import DeleteConfirmModal from '../../modal/DeleteConfirm';
import { useTranslation } from 'react-i18next';

interface DeleteRoleModalProps {
    open: boolean;
    selectedRole: Role | null;
    onClose: () => void;
    onDeleteConfirm: (role: Role) => void;
}

const DeleteRoleModal: React.FC<DeleteRoleModalProps> = ({ open, selectedRole, onClose, onDeleteConfirm }) => {
    const { t } = useTranslation();

    const handleDelete = () => {
        if (selectedRole) {
            onDeleteConfirm(selectedRole);
        }
        onClose();
    };

    return (
        <DeleteConfirmModal
            open={open}
            selectedItem={selectedRole}
            onClose={onClose}
            onDeleteConfirm={handleDelete}
            title={t('role.modal.delete.title')}
            description={`${t('role.modal.delete.question')}: ${selectedRole?.name}?`}
        />
    );
};

export default DeleteRoleModal;
