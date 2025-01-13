import React from 'react';
import CollapseSection from './CollapseSection';
import { useTranslation } from 'react-i18next';

const Tasks: React.FC = () => {
    const { t } = useTranslation();
    return (
        <CollapseSection
            title={t('notification.modal.settings.tasks')}
            inputLabel={t('notification.modal.settings.tasks.label')}
        />
    );
};

export default Tasks;
