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
    const [errorsAPI, setErrorsAPI] = useState<Record<string, string> | null>(null);

    const handleDeleteMultiple = async () => {
        try {
            if (selectedRoles) {
                await onDeleteMultipleConfirm(selectedRoles);
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
            selectedItems={selectedRoles}
            onClose={onClose}
            onDeleteMultipleConfirm={handleDeleteMultiple}
            title={t('role.modal.delete.title')}
            description={`${t('role.modal.delete.question')}: ${selectedRoles?.length ? selectedRoles.map(role => role.name).join(", ") : ''}?`}
            errorAPI={errorAPI}
            errorsAPI={errorsAPI}
        />
    );
};

export default DeleteMultipleRolesModal;
