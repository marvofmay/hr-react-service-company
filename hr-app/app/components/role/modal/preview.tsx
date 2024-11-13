import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import Role from '../../../types/Role';

interface PreviewRoleModalProps {
    open: boolean;
    selectedRole: Role | null;
    onClose: () => void;
}

const PreviewRoleModal: React.FC<PreviewRoleModalProps> = ({ open, selectedRole, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ backgroundColor: '#1A237E', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                Preview Role
            </DialogTitle>

            <DialogContent sx={{ marginTop: '10px', padding: '20px' }}>
                {selectedRole ? (
                    <div>
                        <p><strong>UUID:</strong> {selectedRole.uuid}</p>
                        <p><strong>Name:</strong> {selectedRole.name}</p>
                        <p><strong>Description:</strong> {selectedRole.description}</p>
                        <p><strong>Created At:</strong> {selectedRole.created_at}</p>
                        <p><strong>Updated At:</strong> {selectedRole.updated_at}</p>
                    </div>
                ) : (
                    <p>No role selected.</p>
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

export default PreviewRoleModal;
