import React from 'react';
import Industry from '../../../types/Industry';
import Preview from '../../modal/preview';
import '../../../i18n/i18n';
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
                UUID: selectedIndustry?.uuid || 'N/A',
                [t('industry.form.field.name')]: selectedIndustry?.name || 'N/A',
                [t('industry.form.field.description')]: selectedIndustry?.description || 'N/A',
                [t('industry.form.field.createdAt')]: selectedIndustry?.created_at || 'N/A',
                [t('industry.form.field.updatedAt')]: selectedIndustry?.updated_at || 'N/A',
            }}
            onClose={onClose}
        />
    );
};

export default PreviewIndustryModal;
