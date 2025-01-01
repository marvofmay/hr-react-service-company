import React from 'react';
import Employee from '../../../types/Employee';
import DeleteConfirmModal from '../../modal/DeleteConfirm';
import { useTranslation } from 'react-i18next';

interface DeleteEmployeeModalProps {
    open: boolean;
    selectedEmployee: Employee | null;
    onClose: () => void;
    onDeleteConfirm: (employee: Employee) => void;
}

const DeleteEmployeeModal: React.FC<DeleteEmployeeModalProps> = ({ open, selectedEmployee, onClose, onDeleteConfirm }) => {
    const { t } = useTranslation();

    const handleDelete = () => {
        if (selectedEmployee) {
            onDeleteConfirm(selectedEmployee);
        }
        onClose();
    };

    return (
        <DeleteConfirmModal
            open={open}
            selectedItem={selectedEmployee}
            onClose={onClose}
            onDeleteConfirm={handleDelete}
            title={t('employee.modal.delete.title')}
            description={`${t('employee.modal.delete.question')}: ${selectedEmployee?.firstName} ${selectedEmployee?.lastName}?`}
        />
    );
};

export default DeleteEmployeeModal;
