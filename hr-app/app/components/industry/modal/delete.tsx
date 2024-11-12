import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import Industry from '../../../types/Industry';

interface DeleteIndustryModalProps {
    open: boolean;
    selectedIndustry: Industry | null;
    onClose: () => void;
    onDeleteConfirm: (industry: Industry) => void;
}

const DeleteIndustryModal: React.FC<DeleteIndustryModalProps> = ({ open, selectedIndustry, onClose, onDeleteConfirm }) => {
    const handleDelete = () => {
        if (selectedIndustry) {
            onDeleteConfirm(selectedIndustry);
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete the industry "{selectedIndustry?.name}"? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteIndustryModal;
