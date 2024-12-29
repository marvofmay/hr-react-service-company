import React from 'react';
import ContractType from '../../../types/ContractType';
import DeleteConfirmModal from '../../modal/deleteConfirm';
import { useTranslation } from 'react-i18next';

interface DeleteContractTypeModalProps {
    open: boolean;
    selectedContractType: ContractType | null;
    onClose: () => void;
    onDeleteConfirm: (ContractType: ContractType) => void;
}

const DeleteContractTypeModal: React.FC<DeleteContractTypeModalProps> = ({ open, selectedContractType, onClose, onDeleteConfirm }) => {
    const { t } = useTranslation();

    const handleDelete = () => {
        if (selectedContractType) {
            onDeleteConfirm(selectedContractType);
        }
        onClose();
    };

    return (
        <DeleteConfirmModal
            open={open}
            selectedItem={selectedContractType}
            onClose={onClose}
            onDeleteConfirm={handleDelete}
            title={t('contractType.modal.delete.title')}
            description={`${t('contractType.modal.delete.question')}: ${selectedContractType?.name}?`}
        />
    );
};

export default DeleteContractTypeModal;
