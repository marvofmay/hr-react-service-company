import React, { useState } from 'react';
import Employee from '../../../types/Employee';
import DeleteMultipleConfirmModal from '../../modal/DeleteMultipleConfirm';
import { useTranslation } from 'react-i18next';

interface DeleteMultipleEmployeesModalProps {
    open: boolean;
    selectedEmployees: Employee[] | null;
    onClose: () => void;
    onDeleteMultipleConfirm: (employees: Employee[]) => Promise<void>;
}

const DeleteMultipleEmployeesModal: React.FC<DeleteMultipleEmployeesModalProps> = ({ open, selectedEmployees, onClose, onDeleteMultipleConfirm }) => {
    const { t } = useTranslation();

    const [errorAPI, setErrorAPI] = useState<string>();

    const handleDeleteMultiple = async () => {
        try {
            if (selectedEmployees) {
                await onDeleteMultipleConfirm(selectedEmployees);
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
            selectedItems={selectedEmployees}
            onClose={onClose}
            onDeleteMultipleConfirm={handleDeleteMultiple}
            title={t('employee.modal.delete.title')}
            description={`${t('employee.modal.delete.question')}: ${selectedEmployees?.length ? selectedEmployees.map(employee => `${employee.lastName} ${employee.firstName}`).join(", ") : ''}?`}
            errorAPI={errorAPI}
        />
    );
};

export default DeleteMultipleEmployeesModal;
