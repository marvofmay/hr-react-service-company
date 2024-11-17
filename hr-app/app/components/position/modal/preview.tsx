import React from 'react';
import Position from '../../../types/Position';
import Preview from '../../modal/preview';

interface PreviewPositionModalProps {
    open: boolean;
    selectedPosition: Position | null;
    onClose: () => void;
}

const PreviewPositionModal: React.FC<PreviewPositionModalProps> = ({ open, selectedPosition, onClose }) => {
    return (
        <Preview
            open={open}
            title="Preview Position"
            details={{
                UUID: selectedPosition?.uuid || 'N/A',
                Name: selectedPosition?.name || 'N/A',
                Description: selectedPosition?.description || 'N/A',
                'Created At': selectedPosition?.created_at || 'N/A',
                'Updated At': selectedPosition?.updated_at || 'N/A',
            }}
            onClose={onClose}
        />
    );
};

export default PreviewPositionModal;
