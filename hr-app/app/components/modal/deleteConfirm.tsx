import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface DeleteConfirmModalProps<T> {
    open: boolean;
    selectedItem: T | null;
    onClose: () => void;
    onDeleteConfirm: (item: T) => void;
    title: string;
    description: string;
}

const DeleteConfirmModal = <T,>({
    open,
    selectedItem,
    onClose,
    onDeleteConfirm,
    title,
    description,
}: DeleteConfirmModalProps<T>) => {
    const handleDelete = () => {
        if (selectedItem) {
            onDeleteConfirm(selectedItem);
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle
                sx={{
                    backgroundColor: '#1A237E',
                    color: 'white',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                }}
            >
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ marginTop: '1rem' }}>
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    variant="contained"
                    sx={{ backgroundColor: '#999a99', color: 'white', fontWeight: 'bold' }}
                >
                    Cancel
                </Button>
                <Button onClick={handleDelete} color="error" variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmModal;

