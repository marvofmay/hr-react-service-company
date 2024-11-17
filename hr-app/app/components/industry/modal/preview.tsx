import React from 'react';
import Industry from '../../../types/Industry';
import Preview from '../../modal/preview';

interface PreviewIndustryModalProps {
    open: boolean;
    selectedIndustry: Industry | null;
    onClose: () => void;
}

const PreviewIndustryModal: React.FC<PreviewIndustryModalProps> = ({ open, selectedIndustry, onClose }) => {
    return (
        <Preview
            open={open}
            title="Preview Industry"
            details={{
                UUID: selectedIndustry?.uuid || 'N/A',
                Name: selectedIndustry?.name || 'N/A',
                Description: selectedIndustry?.description || 'N/A',
                'Created At': selectedIndustry?.created_at || 'N/A',
                'Updated At': selectedIndustry?.updated_at || 'N/A',
            }}
            onClose={onClose}
        />
    );
};

export default PreviewIndustryModal;
