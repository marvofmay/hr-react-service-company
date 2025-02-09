import React, { useEffect, useState } from 'react';
import UploadFile from '../../modal/UploadFile';
import { useTranslation } from 'react-i18next';

interface ImportRolesFromXLSXProps {
    open: boolean;
    onClose: () => void;
    onImportRolesFromXLSX: (file: File) => Promise<void>;
    allowedTypes?: string[];
}

const ImportRolesFromXLSXModal: React.FC<ImportRolesFromXLSXProps> = ({ open, onClose, onImportRolesFromXLSX, allowedTypes }) => {
    const { t } = useTranslation();
    const [errorsAPI, setErrorsAPI] = useState<Object>();

    const onUploadFile = async (file: File) => {
        try {
            await onImportRolesFromXLSX(file);

            onClose();
        } catch (error: any) {
            if (error.response?.status === 422) {
                setErrorsAPI(error.response.data.errors);
            }
        }
    };

    return (
        <UploadFile
            open={open}
            onClose={onClose}
            onUploadFile={onUploadFile}
            allowedTypes={allowedTypes}
            title={t('role.modal.import.title')}
            errorsAPI={errorsAPI}
        />
    );
};


export default ImportRolesFromXLSXModal;