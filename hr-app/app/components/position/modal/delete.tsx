import React from 'react';
import Position from '../../../types/Position';
import DeleteConfirmModal from '../../modal/deleteConfirm';
import { useTranslation } from 'react-i18next';

interface DeletePositionModalProps {
    open: boolean;
    selectedPosition: Position | null;
    onClose: () => void;
    onDeleteConfirm: (position: Position) => void;
}

const DeletePositionModal: React.FC<DeletePositionModalProps> = ({ open, selectedPosition, onClose, onDeleteConfirm }) => {
    const { t } = useTranslation();

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
            title={t('position.modal.delete.title')}
            description={`${t('position.modal.delete.question')}: ${selectedPosition?.name}?`}
        />
    );
};

export default DeletePositionModal;
