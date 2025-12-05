import React, { useState } from 'react';
import Industry from '../../../types/Industry';
import DeleteMultipleConfirmModal from '../../modal/DeleteMultipleConfirm';
import { useTranslation } from 'react-i18next';

interface DeleteMultipleIndustriesModalProps {
    open: boolean;
    selectedIndustries: Industry[] | null;
    onClose: () => void;
    onDeleteMultipleConfirm: (industries: Industry[]) => Promise<void>;
}

const DeleteMultipleIndustriesModal: React.FC<DeleteMultipleIndustriesModalProps> = ({ open, selectedIndustries, onClose, onDeleteMultipleConfirm }) => {
    const { t } = useTranslation();

    const [errorAPI, setErrorAPI] = useState<string>();

    const handleDeleteMultiple = async () => {
        try {
            if (selectedIndustries) {
                await onDeleteMultipleConfirm(selectedIndustries);
            }

            onClose();
        } catch (error: unknown) {
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
        <DeleteMultipleConfirmModal
            open={open}
            selectedItems={selectedIndustries}
            onClose={onClose}
            onDeleteMultipleConfirm={handleDeleteMultiple}
            title={t('industry.modal.delete.title')}
            description={`${t('industry.modal.delete.question')}: ${selectedIndustries?.length ? selectedIndustries.map(industry => industry.name).join(", ") : ''}`}
            errorAPI={errorAPI}
        />
    );
};

export default DeleteMultipleIndustriesModal;
