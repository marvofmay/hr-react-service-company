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
    const [errorsAPI, setErrorsAPI] = useState<Record<string, string> | null>();

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
            selectedItems={selectedIndustries}
            onClose={onClose}
            onDeleteMultipleConfirm={handleDeleteMultiple}
            title={t('industry.modal.delete.title')}
            description={`${t('industry.modal.delete.question')}: ${selectedIndustries?.length ? selectedIndustries.map(industry => industry.name).join(", ") : ''}?`}
            errorAPI={errorAPI}
            errorsAPI={errorsAPI}
        />
    );
};

export default DeleteMultipleIndustriesModal;
