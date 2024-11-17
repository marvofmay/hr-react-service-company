import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import Position from '../../../types/Position';

interface PreviewPositionModalProps {
    open: boolean;
    selectedPosition: Position | null;
    onClose: () => void;
}

const PreviewPositionModal: React.FC<PreviewPositionModalProps> = ({ open, selectedPosition, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ backgroundColor: '#1A237E', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                Preview Position
            </DialogTitle>

            <DialogContent sx={{ marginTop: '10px', padding: '20px' }}>
                {selectedPosition ? (
                    <div>
                        <p><strong>UUID:</strong> {selectedPosition.uuid}</p>
                        <p><strong>Name:</strong> {selectedPosition.name}</p>
                        <p><strong>Description:</strong> {selectedPosition.description}</p>
                        <p><strong>Created At:</strong> {selectedPosition.created_at}</p>
                        <p><strong>Updated At:</strong> {selectedPosition.updated_at}</p>
                    </div>
                ) : (
                    <p>No position selected.</p>
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

export default PreviewPositionModal;
