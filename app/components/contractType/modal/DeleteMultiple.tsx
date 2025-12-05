import React, { useState } from 'react';
import ContractType from '../../../types/ContractType';
import DeleteMultipleConfirmModal from '../../modal/DeleteMultipleConfirm';
import { useTranslation } from 'react-i18next';

interface DeleteMultipleContractTypesModalProps {
    open: boolean;
    selectedContractTypes: ContractType[] | null;
    onClose: () => void;
    onDeleteMultipleConfirm: (contractTypes: ContractType[]) => Promise<void>;
}

const DeleteMultipleContractTypesModal: React.FC<DeleteMultipleContractTypesModalProps> = ({ open, selectedContractTypes, onClose, onDeleteMultipleConfirm }) => {
    const { t } = useTranslation();

    const [errorAPI, setErrorAPI] = useState<string>();

    const handleDeleteMultiple = async () => {
        try {
            if (selectedContractTypes) {
                await onDeleteMultipleConfirm(selectedContractTypes);
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
            selectedItems={selectedContractTypes}
            onClose={onClose}
            onDeleteMultipleConfirm={handleDeleteMultiple}
            title={t('contractType.modal.delete.title')}
            description={`${t('contractType.modal.delete.question')}: ${selectedContractTypes?.length ? selectedContractTypes.map(contractType => contractType.name).join(", ") : ''}`}
            errorAPI={errorAPI}
        />
    );
};

export default DeleteMultipleContractTypesModal;
