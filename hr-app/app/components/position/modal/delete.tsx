import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import Position from '../../../types/Position';

interface DeletePositionModalProps {
    open: boolean;
    selectedPosition: Position | null;
    onClose: () => void;
    onDeleteConfirm: (position: Position) => void;
}

const DeletePositionModal: React.FC<DeletePositionModalProps> = ({ open, selectedPosition, onClose, onDeleteConfirm }) => {
    const handleDelete = () => {
        if (selectedPosition) {
            onDeleteConfirm(selectedPosition);
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete the position "{selectedPosition?.name}"? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeletePositionModal;
