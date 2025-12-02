import React from 'react';
import ContractType from '../../../types/ContractType';
import Preview from '../../modal/Preview';
import { useTranslation } from 'react-i18next';

interface PreviewContractTypeModalProps {
    open: boolean;
    selectedContractType: ContractType | null;
    onClose: () => void;
}

const PreviewContractTypeModal: React.FC<PreviewContractTypeModalProps> = ({ open, selectedContractType, onClose }) => {
    const { t } = useTranslation();

    return (
        <Preview
            open={open}
            title={t('contractType.modal.preview.title')}
            details={{
                UUID: selectedContractType?.uuid || 'N/D',
                [t('contractType.form.field.name')]: selectedContractType?.name || 'N/D',
                [t('contractType.form.field.description')]: selectedContractType?.description || 'N/D',
                [t('contractType.form.field.createdAt')]: selectedContractType?.createdAt || 'N/D',
                [t('contractType.form.field.updatedAt')]: selectedContractType?.updatedAt || 'N/D',
            }}
            onClose={onClose}
        />
    );
};

export default PreviewContractTypeModal;
