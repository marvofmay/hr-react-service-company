import React from 'react';
import Company from '../../../types/Company';
import Preview from '../../modal/Preview';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelIcon from '@mui/icons-material/CancelOutlined';
import { useTranslation } from 'react-i18next';

interface PreviewCompanyModalProps {
    open: boolean;
    selectedCompany: Company | null;
    onClose: () => void;
}

const PreviewCompanyModal: React.FC<PreviewCompanyModalProps> = ({ open, selectedCompany, onClose }) => {
    const { t } = useTranslation();

    const getContactsByType = (type: "phone" | "email" | "website"): string[] => {
        const contacts = selectedCompany?.contacts?.filter(c => c.type === type).map(c => c.data) || [];

        return contacts.length > 0 ? contacts : [""];
    };

    return (
        <Preview
            open={open}
            title={t('company.modal.preview.title')}
            details={{
                UUID: selectedCompany?.uuid || 'N/D',
                [t('company.form.field.fullName')]: selectedCompany?.fullName || 'N/D',
                [t('company.form.field.shortName')]: selectedCompany?.shortName || 'N/D',
                [t('company.form.field.nip')]: selectedCompany?.nip || 'N/D',
                [t('company.form.field.regon')]: selectedCompany?.regon || 'N/D',
                [t('company.form.field.internalCode')]: selectedCompany?.internalCode || 'N/D',
                [t('company.form.field.industry')]: selectedCompany?.industry.name || 'N/D',
                [t('company.form.field.active')]: selectedCompany?.active === true ? (<CheckCircleIcon color="success" fontSize="small" />) : selectedCompany?.active === false ? (<CancelIcon color="error" fontSize="small" />) : 'N/D',
                [t('company.form.field.description')]: selectedCompany?.description || 'N/D',
                [t('company.form.field.phone')]: getContactsByType("phone").length
                    ? getContactsByType("phone").join(', ')
                    : 'N/D',
                [t('company.form.field.email')]: getContactsByType("email").length
                    ? getContactsByType("email").join(', ')
                    : 'N/D',
                [t('company.form.field.web')]: getContactsByType("website").length
                    ? getContactsByType("website").join(', ')
                    : 'N/D',
                [t('company.form.field.parentCompany')]: selectedCompany?.parentCompany?.fullName || 'N/D',
                [t('company.form.field.address')]: `${selectedCompany?.address.street}, ${selectedCompany?.address.postcode} ${selectedCompany?.address.city}, ${selectedCompany?.address.country}`,
                [t('company.form.field.createdAt')]: selectedCompany?.createdAt || 'N/D',
                [t('company.form.field.updatedAt')]: selectedCompany?.updatedAt || 'N/D',
                [t('company.form.field.deletedAt')]: selectedCompany?.deletedAt || 'N/D',
            }}
            onClose={onClose}
        />
    );
};

export default PreviewCompanyModal;
