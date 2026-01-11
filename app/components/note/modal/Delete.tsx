import React, { useState } from 'react';
import Note from '../../../types/Note';
import DeleteConfirmModal from '../../modal/DeleteConfirm';
import { useTranslation } from 'react-i18next';

interface DeleteNoteModalProps {
    open: boolean;
    selectedNote: Note | null;
    onClose: () => void;
    onDeleteConfirm: (note: Note) => Promise<void>;
}

const DeleteNoteModal: React.FC<DeleteNoteModalProps> = ({ open, selectedNote, onClose, onDeleteConfirm }) => {
    const { t } = useTranslation();

    const [errorAPI, setErrorAPI] = useState<string>();

    const handleDelete = async () => {
        try {
            if (selectedNote) {
                await onDeleteConfirm(selectedNote);
            }

            onClose();
        } catch (error: unknown) {
            console.log('error', error);
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
        <DeleteConfirmModal
            open={open}
            selectedItem={selectedNote}
            onClose={onClose}
            onDeleteConfirm={handleDelete}
            title={t('note.modal.delete.title')}
            description={`${t('note.modal.delete.question')}: "${selectedNote?.title}"?`}
            errorAPI={errorAPI}
        />
    );
};

export default DeleteNoteModal;
