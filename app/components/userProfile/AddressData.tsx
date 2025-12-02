import Address from '@/app/types/Address';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface AddressDataProps {
    data: Address | undefined;
}

const MainData: React.FC<AddressDataProps> = ({ data }) => {
    const { t } = useTranslation();

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                <div>
                    <p className="text-xs text-gray-500 font-normal">
                        {t('employee.form.field.street')}
                    </p>
                    <p className="text-xs text-gray-700 font-medium">{data?.street || 'N/D'}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 font-normal">
                        {t('employee.form.field.postcode')}
                    </p>
                    <p className="text-xs text-gray-700 font-medium">{data?.postcode || 'N/D'}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 font-normal">
                        {t('employee.form.field.city')}
                    </p>
                    <p className="text-xs text-gray-700 font-medium">{data?.city || 'N/D'}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 font-normal">
                        {t('employee.form.field.country')}
                    </p>
                    <p className="text-xs text-gray-700 font-medium">{data?.country || 'N/D'}</p>
                </div>
            </div>
        </div>
    );
};

export default MainData;
