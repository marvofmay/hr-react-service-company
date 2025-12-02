import React, { useState } from 'react';
import Role from '../../../types/Role';
import DeleteConfirmModal from '../../modal/DeleteConfirm';
import { useTranslation } from 'react-i18next';

interface DeleteRoleModalProps {
    open: boolean;
    selectedRole: Role | null;
    onClose: () => void;
    onDeleteConfirm: (role: Role) => Promise<void>;
}

const DeleteRoleModal: React.FC<DeleteRoleModalProps> = ({ open, selectedRole, onClose, onDeleteConfirm }) => {
    const { t } = useTranslation();

    const [errorAPI, setErrorAPI] = useState<string>();

    const handleDelete = async () => {
        try {
            if (selectedRole) {
                await onDeleteConfirm(selectedRole);
            }

            onClose();
        } catch (error: unknown) {
            console.log('error', error);
            if (
                typeof error === 'object' &&
                error !== null &&
                'response' in error &&
                typeof (error as { response?: unknown }).response === 'object' &&
                (error as { response?: { status?: number } }).response?.status !== 200
            ) {
                setErrorAPI(
                    (error as { response: { data: { message: string } } }).response.data.message
                );
            }
        }
    };

    return (
        <DeleteConfirmModal
            open={open}
            selectedItem={selectedRole}
            onClose={onClose}
            onDeleteConfirm={handleDelete}
            title={t('role.modal.delete.title')}
            description={`${t('role.modal.delete.question')}: "${selectedRole?.name}"?`}
            errorAPI={errorAPI}
        />
    );
};

export default DeleteRoleModal;
