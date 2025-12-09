import React, { useState } from 'react';
import Position from '../../../types/Position';
import DeleteMultipleConfirmModal from '../../modal/DeleteMultipleConfirm';
import { useTranslation } from 'react-i18next';

interface DeleteMultiplePositionsModalProps {
    open: boolean;
    selectedPositions: Position[] | null;
    onClose: () => void;
    onDeleteMultipleConfirm: (positions: Position[]) => Promise<void>;
}

const DeleteMultiplePositionsModal: React.FC<DeleteMultiplePositionsModalProps> = ({ open, selectedPositions, onClose, onDeleteMultipleConfirm }) => {
    const { t } = useTranslation();

    const [errorAPI, setErrorAPI] = useState<string>();
    const [errorsAPI, setErrorsAPI] = useState<Record<string, string> | null>();

    const handleDeleteMultiple = async () => {
        try {
            if (selectedPositions) {
                await onDeleteMultipleConfirm(selectedPositions);
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
            selectedItems={selectedPositions}
            onClose={onClose}
            onDeleteMultipleConfirm={handleDeleteMultiple}
            title={t('position.modal.delete.title')}
            description={`${t('position.modal.delete.question')}: ${selectedPositions?.length ? selectedPositions.map(position => position.name).join(", ") : ''}`}
            errorAPI={errorAPI}
            errorsAPI={errorsAPI}
        />
    );
};

export default DeleteMultiplePositionsModal;
