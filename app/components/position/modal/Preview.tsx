import React from 'react';
import Preview from '../../modal/Preview';
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelIcon from '@mui/icons-material/CancelOutlined';
import { PositionPreview } from '@/app/types/PositionPreview';
import { Box, Typography } from '@mui/material';

interface PreviewPositionModalProps {
    open: boolean;
    selectedPosition: PositionPreview | null;
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
                [t('position.form.field.departments')]: (
                    <div>
                        {selectedPosition?.departments && selectedPosition.departments.length > 0 ? (
                            selectedPosition.departments.map((d) => (
                                <div key={d.uuid} style={{ marginLeft: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span>• {d.name}</span>

                                    {d.active === true && (
                                        <CheckCircleIcon color="success" fontSize="small" />
                                    )}

                                    {d.active === false && (
                                        <CancelIcon color="error" fontSize="small" />
                                    )}
                                </div>
                            ))
                        ) : (
                            <div>N/D</div>
                        )}
                    </div>

                ),
                [t('position.form.field.active')]: selectedPosition?.active === true ? (
                    <CheckCircleIcon color="success" fontSize="small" />
                ) : selectedPosition?.active === false ? (
                    <CancelIcon color="error" fontSize="small" />
                ) : (
                    'N/D'
                ),
                [t('position.form.field.createdAt')]: selectedPosition?.createdAt || 'N/D',
                [t('position.form.field.updatedAt')]: selectedPosition?.updatedAt || 'N/D',
            }}
            onClose={onClose}
        />
    );
};

export default PreviewPositionModal;
