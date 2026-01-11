import React, { useState } from 'react';
import Note from '../../../types/Note';
import DeleteMultipleConfirmModal from '../../modal/DeleteMultipleConfirm';
import { useTranslation } from 'react-i18next';

interface DeleteMultipleNotesModalProps {
    open: boolean;
    selectedNotes: Note[] | null;
    onClose: () => void;
    onDeleteMultipleConfirm: (notes: Note[]) => Promise<void>;
}

const DeleteMultipleNotesModal: React.FC<DeleteMultipleNotesModalProps> = ({ open, selectedNotes, onClose, onDeleteMultipleConfirm }) => {
    const { t } = useTranslation();

    const [errorAPI, setErrorAPI] = useState<string>();
    const [errorsAPI, setErrorsAPI] = useState<Record<string, string> | null>(null);

    const handleDeleteMultiple = async () => {
        try {
            if (selectedNotes) {
                await onDeleteMultipleConfirm(selectedNotes);
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
            selectedItems={selectedNotes}
            onClose={onClose}
            onDeleteMultipleConfirm={handleDeleteMultiple}
            title={t('note.modal.delete.title')}
            description={`${t('note.modal.delete.question')}: ${selectedNotes?.length ? selectedNotes.map(note => note.title).join(", ") : ''}?`}
            errorAPI={errorAPI}
            errorsAPI={errorsAPI}
        />
    );
};

export default DeleteMultipleNotesModal;
