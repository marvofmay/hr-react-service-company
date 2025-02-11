import React, { useState } from 'react';
import Role from '../../../types/Role';
import DeleteMultipleConfirmModal from '../../modal/DeleteMultipleConfirm';
import { useTranslation } from 'react-i18next';

interface DeleteMultipleRolesModalProps {
    open: boolean;
    selectedRoles: Role[] | null;
    onClose: () => void;
    onDeleteMultipleConfirm: (roles: Role[]) => Promise<void>;
}

const DeleteMultipleRolesModal: React.FC<DeleteMultipleRolesModalProps> = ({ open, selectedRoles, onClose, onDeleteMultipleConfirm }) => {
    const { t } = useTranslation();

    const [errorAPI, setErrorAPI] = useState<string>();

    const handleDeleteMultiple = async () => {
        try {
            if (selectedRoles) {
                await onDeleteMultipleConfirm(selectedRoles);
            }

            onClose();
        } catch (error: any) {
            if (error.response?.status !== 200) {
                setErrorAPI(error.response.data.message);
            }
        }
    };

    return (
        <DeleteMultipleConfirmModal
            open={open}
            selectedItems={selectedRoles}
            onClose={onClose}
            onDeleteMultipleConfirm={handleDeleteMultiple}
            title={t('role.modal.delete.title')}
            description={`${t('role.modal.delete.question')}: ${selectedRoles?.length ? selectedRoles.map(role => role.name).join(", ") : ''}`}
            errorAPI={errorAPI}
        />
    );
};

export default DeleteMultipleRolesModal;
