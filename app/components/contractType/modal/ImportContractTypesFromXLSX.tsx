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

interface ImportContractTypesFromXLSXProps {
    open: boolean;
    onClose: () => void;
    onImportContractTypesFromXLSX: (file: File) => Promise<void>;
    allowedTypes?: string[];
}

const ImportContractTypesFromXLSXModal: React.FC<ImportContractTypesFromXLSXProps> = ({ open, onClose, onImportContractTypesFromXLSX, allowedTypes }) => {
    const { t } = useTranslation();
    const [errorsAPI, setErrorsAPI] = useState<Record<string, string[]> | undefined>();

    const onUploadFile = async (file: File) => {
        try {
            await onImportContractTypesFromXLSX(file);

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
            title={t('contractType.modal.import.title')}
            errorsAPI={errorsAPI}
        />
    );
};


export default ImportContractTypesFromXLSXModal;