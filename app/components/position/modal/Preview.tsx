import React from 'react';
import Position from '../../../types/Position';
import Preview from '../../modal/Preview';
import { useTranslation } from 'react-i18next';

interface PreviewPositionModalProps {
    open: boolean;
    selectedPosition: Position | null;
    onClose: () => void;
}

const PreviewPositionModal: React.FC<PreviewPositionModalProps> = ({ open, selectedPosition, onClose }) => {
    const { t } = useTranslation();

    return (
        <Preview
            open={open}
            title={t('position.modal.preview.title')}
            details={{
                UUID: selectedPosition?.uuid || 'N/D',
                [t('position.form.field.name')]: selectedPosition?.name || 'N/D',
                [t('position.form.field.description')]: selectedPosition?.description || 'N/D',
                [t('position.form.field.createdAt')]: selectedPosition?.createdAt || 'N/D',
                [t('position.form.field.updatedAt')]: selectedPosition?.updatedAt || 'N/D',
            }}
            onClose={onClose}
        />
    );
};

export default PreviewPositionModal;
