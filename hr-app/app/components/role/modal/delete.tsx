import React from 'react';
import Role from '../../../types/Role';
import DeleteConfirmModal from '../../modal/deleteConfirm';

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
        <DeleteConfirmModal
            open={open}
            selectedItem={selectedRole}
            onClose={onClose}
            onDeleteConfirm={handleDelete}
            title="Confirm Role Deletion"
            description={`Are you sure you want to delete this role: ${selectedRole?.name} ?`}
        />
    );
};

export default DeleteRoleModal;
