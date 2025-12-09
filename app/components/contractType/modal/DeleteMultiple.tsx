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
    const [errorsAPI, setErrorsAPI] = useState<Record<string, string> | null>();

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
            selectedItems={selectedContractTypes}
            onClose={onClose}
            onDeleteMultipleConfirm={handleDeleteMultiple}
            title={t('contractType.modal.delete.title')}
            description={`${t('contractType.modal.delete.question')}: ${selectedContractTypes?.length ? selectedContractTypes.map(contractType => contractType.name).join(", ") : ''}`}
            errorAPI={errorAPI}
            errorsAPI={errorsAPI}
        />
    );
};

export default DeleteMultipleContractTypesModal;
