import React from 'react';
import Position from '../../../types/Position';
import DeleteConfirmModal from '../../modal/deleteConfirm';

interface DeletePositionModalProps {
    open: boolean;
    selectedPosition: Position | null;
    onClose: () => void;
    onDeleteConfirm: (position: Position) => void;
}

const DeletePositionModal: React.FC<DeletePositionModalProps> = ({ open, selectedPosition, onClose, onDeleteConfirm }) => {
    const handleDelete = () => {
        if (selectedPosition) {
            onDeleteConfirm(selectedPosition);
        }
        onClose();
    };

    return (
        <DeleteConfirmModal
            open={open}
            selectedItem={selectedPosition}
            onClose={onClose}
            onDeleteConfirm={handleDelete}
            title="Confirm Position Deletion"
            description={`Are you sure you want to delete this position: ${selectedPosition?.name} ?`}
        />
    );
};

export default DeletePositionModal;
