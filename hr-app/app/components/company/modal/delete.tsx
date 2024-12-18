import React from 'react';
import Company from '../../../types/Company';
import DeleteConfirmModal from '../../modal/deleteConfirm';
import { useTranslation } from 'react-i18next';

interface DeleteCompanyModalProps {
    open: boolean;
    selectedCompany: Company | null;
    onClose: () => void;
    onDeleteConfirm: (company: Company) => void;
}

const DeleteCompanyModal: React.FC<DeleteCompanyModalProps> = ({ open, selectedCompany, onClose, onDeleteConfirm }) => {
    const { t } = useTranslation();

    const handleDelete = () => {
        if (selectedCompany) {
            onDeleteConfirm(selectedCompany);
        }
        onClose();
    };

    return (
        <DeleteConfirmModal
            open={open}
            selectedItem={selectedCompany}
            onClose={onClose}
            onDeleteConfirm={handleDelete}
            title={t('company.modal.delete.title')}
            description={`${t('company.modal.delete.question')}: ${selectedCompany?.fullName}?`}
        />
    );
};

export default DeleteCompanyModal;
