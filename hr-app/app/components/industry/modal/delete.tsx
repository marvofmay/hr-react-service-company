import React from 'react';
import Industry from '../../../types/Industry';
import DeleteConfirmModal from '../../modal/deleteConfirm';
import { useTranslation } from 'react-i18next';

interface DeleteIndustryModalProps {
    open: boolean;
    selectedIndustry: Industry | null;
    onClose: () => void;
    onDeleteConfirm: (industry: Industry) => void;
}

const DeleteIndustryModal: React.FC<DeleteIndustryModalProps> = ({ open, selectedIndustry, onClose, onDeleteConfirm }) => {
    const handleDelete = () => {
        if (selectedIndustry) {
            onDeleteConfirm(selectedIndustry);
        }
        onClose();
    };

    const { t } = useTranslation();

    return (
        <DeleteConfirmModal
            open={open}
            selectedItem={selectedIndustry}
            onClose={onClose}
            onDeleteConfirm={handleDelete}
            title={t('industry.modal.delete.title')}
            description={`${t('industry.modal.delete.question')}: ${selectedIndustry?.name}?`}
        />
    );
};

export default DeleteIndustryModal;
