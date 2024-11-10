import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import Industry from '../../../types/Industry';

interface IndustryPreviewModalProps {
    open: boolean;
    selectedIndustry: Industry | null;
    onClose: () => void;
}

const IndustryPreviewModal: React.FC<IndustryPreviewModalProps> = ({ open, selectedIndustry, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ backgroundColor: '#1A237E', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                Preview Industry
            </DialogTitle>

            <DialogContent sx={{ marginTop: '10px', padding: '20px' }}>
                {selectedIndustry ? (
                    <div>
                        <p><strong>UUID:</strong> {selectedIndustry.uuid}</p>
                        <p><strong>Name:</strong> {selectedIndustry.name}</p>
                        <p><strong>Description:</strong> {selectedIndustry.description}</p>
                        <p><strong>Created At:</strong> {selectedIndustry.created_at}</p>
                        <p><strong>Updated At:</strong> {selectedIndustry.updated_at}</p>
                    </div>
                ) : (
                    <p>No industry selected.</p>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} sx={{ backgroundColor: '#1A237E', color: 'white', fontWeight: 'bold' }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default IndustryPreviewModal;
