import React from 'react';
import Role from '../../../types/Role';
import Preview from '../../modal/preview';

interface PreviewRoleModalProps {
    open: boolean;
    selectedRole: Role | null;
    onClose: () => void;
}

const PreviewRoleModal: React.FC<PreviewRoleModalProps> = ({ open, selectedRole, onClose }) => {
    return (
        <Preview
            open={open}
            title="Preview Role"
            details={{
                UUID: selectedRole?.uuid || 'N/A',
                Name: selectedRole?.name || 'N/A',
                Description: selectedRole?.description || 'N/A',
                'Created At': selectedRole?.created_at || 'N/A',
                'Updated At': selectedRole?.updated_at || 'N/A',
            }}
            onClose={onClose}
        />
    );
};

export default PreviewRoleModal;
