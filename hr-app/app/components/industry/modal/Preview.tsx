import React from 'react';
import Industry from '../../../types/Industry';
import Preview from '../../modal/Preview';
import { useTranslation } from 'react-i18next';

interface PreviewIndustryModalProps {
    open: boolean;
    selectedIndustry: Industry | null;
    onClose: () => void;
}

const PreviewIndustryModal: React.FC<PreviewIndustryModalProps> = ({ open, selectedIndustry, onClose }) => {
    const { t } = useTranslation();

    return (
        <Preview
            open={open}
            title={t('industry.modal.preview.title')}
            details={{
                UUID: selectedIndustry?.uuid || 'N/D',
                [t('industry.form.field.name')]: selectedIndustry?.name || 'N/D',
                [t('industry.form.field.description')]: selectedIndustry?.description || 'N/D',
                [t('industry.form.field.createdAt')]: selectedIndustry?.createdAt || 'N/D',
                [t('industry.form.field.updatedAt')]: selectedIndustry?.updatedAt || 'N/D',
            }}
            onClose={onClose}
        />
    );
};

export default PreviewIndustryModal;
