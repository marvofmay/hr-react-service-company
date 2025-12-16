import React, { useState } from 'react';
import Department from '../../../types/Department';
import DeleteMultipleConfirmModal from '../../modal/DeleteMultipleConfirm';
import { useTranslation } from 'react-i18next';

interface DeleteMultipleDepartmentsModalProps {
    open: boolean;
    selectedDepartments: Department[] | null;
    onClose: () => void;
    onDeleteMultipleConfirm: (departments: Department[]) => Promise<void>;
}

const DeleteMultipleDepartmentsModal: React.FC<DeleteMultipleDepartmentsModalProps> = ({ open, selectedDepartments, onClose, onDeleteMultipleConfirm }) => {
    const { t } = useTranslation();

    const [errorAPI, setErrorAPI] = useState<string>();

    const handleDeleteMultiple = async () => {
        try {
            if (selectedDepartments) {
                await onDeleteMultipleConfirm(selectedDepartments);
            }

            onClose();
        } catch (error: unknown) {
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
        <DeleteMultipleConfirmModal
            open={open}
            selectedItems={selectedDepartments}
            onClose={onClose}
            onDeleteMultipleConfirm={handleDeleteMultiple}
            title={t('department.modal.delete.title')}
            description={`${t('department.modal.delete.question')}: ${selectedDepartments?.length ? selectedDepartments.map(department => department.name).join(", ") : ''}?`}
            errorAPI={errorAPI}
        />
    );
};

export default DeleteMultipleDepartmentsModal;
