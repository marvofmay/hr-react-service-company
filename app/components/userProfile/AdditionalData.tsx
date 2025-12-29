import Employee from '@/app/types/Employee';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface AdditionalDataProps {
    data: Employee | undefined;
}

const AdditionalData: React.FC<AdditionalDataProps> = ({ data }) => {
    const { t } = useTranslation();

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                <div>
                    <p className="text-xs text-gray-500 font-normal">
                        {t('employee.form.field.email')}
                    </p>
                    <p className="text-xs text-gray-700 font-medium">{data?.email || 'N/D'}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mt-4">
                <div>
                    <p className="text-xs text-gray-500 font-medium">
                        {t('employee.form.field.phone')}
                    </p>
                    {data?.phones && data.phones.length > 0 ? (
                        data.phones.map((phone, index) => (
                            <p key={index} className="text-xs text-gray-700 font-medium">
                                {phone}
                            </p>
                        ))
                    ) : (
                        <p className="text-xs text-gray-700 font-medium">{'N/D'}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdditionalData;
