import React from 'react';
import Company from '../../../types/Company';
import Preview from '../../modal/preview';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTranslation } from 'react-i18next';
import fakeCompanies from '../../../fake_data/Companies';

interface PreviewCompanyModalProps {
    open: boolean;
    selectedCompany: Company | null;
    onClose: () => void;
}

const PreviewCompanyModal: React.FC<PreviewCompanyModalProps> = ({ open, selectedCompany, onClose }) => {
    const { t } = useTranslation();

    const companySuperior = fakeCompanies.find(
        (emp) => emp.uuid === selectedCompany?.companyUUID && emp.active
    );

    return (
        <Preview
            open={open}
            title={t('company.modal.preview.title')}
            details={{
                UUID: selectedCompany?.uuid || 'N/D',
                [t('company.form.field.fullName')]: selectedCompany?.fullName || 'N/D',

                [t('company.form.field.active')]: selectedCompany?.active === true ? (<CheckCircleIcon color="success" fontSize="small" />) : selectedCompany?.active === false ? (<CancelIcon color="error" fontSize="small" />) : 'N/D',

                [t('company.form.field.createdAt')]: selectedCompany?.createdAt || 'N/D',
                [t('company.form.field.updatedAt')]: selectedCompany?.updatedAt || 'N/D',
                [t('company.form.field.updatedAt')]: selectedCompany?.deletedAt || 'N/D',
            }}
            onClose={onClose}
        />
    );
};

export default PreviewCompanyModal;
