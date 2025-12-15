import React from 'react';
import Department from '../../../types/Department';
import Preview from '../../modal/Preview';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelIcon from '@mui/icons-material/CancelOutlined';
import { useTranslation } from 'react-i18next';

interface PreviewDepartmentModalProps {
    open: boolean;
    selectedDepartment: Department | null;
    onClose: () => void;
}

const PreviewDepartmentModal: React.FC<PreviewDepartmentModalProps> = ({ open, selectedDepartment, onClose }) => {
    const { t } = useTranslation();

    const getContactsByType = (type: "phone" | "email" | "website"): string[] => {
        const contacts = selectedDepartment?.contacts?.filter(d => d.type === type).map(d => d.data) || [];

        return contacts.length > 0 ? contacts : [""];
    };

    return (
        <Preview
            open={open}
            title={t('department.modal.preview.title')}
            details={{
                UUID: selectedDepartment?.uuid || 'N/D',
                [t('department.form.field.name')]: selectedDepartment?.name || 'N/D',
                [t('department.form.field.internalCode')]: selectedDepartment?.internalCode || 'N/D',
                [t('department.form.field.company')]: selectedDepartment?.company.fullName || 'N/D',
                [t('department.form.field.active')]: selectedDepartment?.active === true ? (<CheckCircleIcon color="success" fontSize="small" />) : selectedDepartment?.active === false ? (<CancelIcon color="error" fontSize="small" />) : 'N/D',
                [t('department.form.field.description')]: selectedDepartment?.description || 'N/D',
                [t('department.form.field.phone')]: getContactsByType("phone").length
                    ? getContactsByType("phone").join(', ')
                    : 'N/D',
                [t('department.form.field.email')]: getContactsByType("email").length
                    ? getContactsByType("email").join(', ')
                    : 'N/D',
                [t('department.form.field.web')]: getContactsByType("website").length
                    ? getContactsByType("website").join(', ')
                    : 'N/D',
                [t('department.form.field.parentDepartment')]: selectedDepartment?.parentDepartment?.name || 'N/D',
                [t('department.form.field.address')]: `${selectedDepartment?.address.street}, ${selectedDepartment?.address.postcode} ${selectedDepartment?.address.city}, ${selectedDepartment?.address.country}`,
                [t('department.form.field.createdAt')]: selectedDepartment?.createdAt || 'N/D',
                [t('department.form.field.updatedAt')]: selectedDepartment?.updatedAt || 'N/D',
                [t('department.form.field.deletedAt')]: selectedDepartment?.deletedAt || 'N/D',
            }}
            onClose={onClose}
        />
    );
};

export default PreviewDepartmentModal;
