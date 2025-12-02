import React from 'react';
import CollapseSection from './CollapseSection';
import { useTranslation } from 'react-i18next';

const Requests: React.FC = () => {
    const { t } = useTranslation();
    return (
        <CollapseSection
            title={t('notification.modal.settings.requests')}
            inputLabel={t('notification.modal.settings.requests.label')}
        />
    );
};

export default Requests;
