import React, { useState } from 'react';
import Company from '../../../types/Company';
import DeleteMultipleConfirmModal from '../../modal/DeleteMultipleConfirm';
import { useTranslation } from 'react-i18next';

interface DeleteMultipleCompaniesModalProps {
    open: boolean;
    selectedCompanies: Company[] | null;
    onClose: () => void;
    onDeleteMultipleConfirm: (companies: Company[]) => Promise<void>;
}

const DeleteMultipleCompaniesModal: React.FC<DeleteMultipleCompaniesModalProps> = ({ open, selectedCompanies, onClose, onDeleteMultipleConfirm }) => {
    const { t } = useTranslation();

    const [errorAPI, setErrorAPI] = useState<string>();

    const handleDeleteMultiple = async () => {
        try {
            if (selectedCompanies) {
                await onDeleteMultipleConfirm(selectedCompanies);
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
            selectedItems={selectedCompanies}
            onClose={onClose}
            onDeleteMultipleConfirm={handleDeleteMultiple}
            title={t('company.modal.delete.title')}
            description={`${t('company.modal.delete.question')}: ${selectedCompanies?.length ? selectedCompanies.map(company => company.name).join(", ") : ''}`}
            errorAPI={errorAPI}
        />
    );
};

export default DeleteMultipleCompaniesModal;
