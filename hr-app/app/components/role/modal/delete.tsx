import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import Role from '../../../types/Role';

interface DeleteRoleModalProps {
    open: boolean;
    selectedRole: Role | null;
    onClose: () => void;
    onDeleteConfirm: (role: Role) => void;
}

const DeleteRoleModal: React.FC<DeleteRoleModalProps> = ({ open, selectedRole, onClose, onDeleteConfirm }) => {
    const handleDelete = () => {
        if (selectedRole) {
            onDeleteConfirm(selectedRole);
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete the role "{selectedRole?.name}"? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteRoleModal;
