import React from 'react';
import Department from '../../../types/Department';
import DeleteConfirmModal from '../../modal/DeleteConfirm';
import { useTranslation } from 'react-i18next';

interface DeleteDepartmentModalProps {
    open: boolean;
    selectedDepartment: Department | null;
    onClose: () => void;
    onDeleteConfirm: (department: Department) => void;
}

const DeleteDepartmentModal: React.FC<DeleteDepartmentModalProps> = ({ open, selectedDepartment, onClose, onDeleteConfirm }) => {
    const { t } = useTranslation();

    const handleDelete = () => {
        if (selectedDepartment) {
            onDeleteConfirm(selectedDepartment);
        }
        onClose();
    };

    return (
        <DeleteConfirmModal
            open={open}
            selectedItem={selectedDepartment}
            onClose={onClose}
            onDeleteConfirm={handleDelete}
            title={t('department.modal.delete.title')}
            description={`${t('department.modal.delete.question')}: ${selectedDepartment?.name}?`}
        />
    );
};

export default DeleteDepartmentModal;
