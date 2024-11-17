import React from 'react';
import Industry from '../../../types/Industry';
import DeleteConfirmModal from '../../modal/deleteConfirm';

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

    return (
        <DeleteConfirmModal
            open={open}
            selectedItem={selectedIndustry}
            onClose={onClose}
            onDeleteConfirm={handleDelete}
            title="Confirm Industry Deletion"
            description={`Are you sure you want to delete this industry: ${selectedIndustry?.name} ?`}
        />
    );
};

export default DeleteIndustryModal;
