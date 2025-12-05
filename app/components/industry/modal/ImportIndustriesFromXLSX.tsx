import React, { useState } from 'react';
import UploadFile from '../../modal/UploadFile';
import { useTranslation } from 'react-i18next';

type APIError422 = {
    response: {
        status: number;
        data: {
            errors: Record<string, string[]>;
        };
    };
};

interface ImportIndustriesFromXLSXProps {
    open: boolean;
    onClose: () => void;
    onImportIndustriesFromXLSX: (file: File) => Promise<void>;
    allowedTypes?: string[];
}

const ImportIndustriesFromXLSXModal: React.FC<ImportIndustriesFromXLSXProps> = ({ open, onClose, onImportIndustriesFromXLSX, allowedTypes }) => {
    const { t } = useTranslation();
    const [errorsAPI, setErrorsAPI] = useState<Record<string, string[]> | undefined>();

    const onUploadFile = async (file: File) => {
        try {
            await onImportIndustriesFromXLSX(file);

            onClose();
        } catch (error: unknown) {
            if (
                typeof error === 'object' &&
                error !== null &&
                'response' in error &&
                typeof (error as { response?: unknown }).response === 'object' &&
                (error as APIError422).response?.status === 422
            ) {
                setErrorsAPI((error as APIError422).response.data.errors);
            }
        }
    };

    return (
        <UploadFile
            open={open}
            onClose={onClose}
            onUploadFile={onUploadFile}
            allowedTypes={allowedTypes}
            title={t('industry.modal.import.title')}
            errorsAPI={errorsAPI}
        />
    );
};


export default ImportIndustriesFromXLSXModal;