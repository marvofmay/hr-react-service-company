"use client"

import { useTranslation } from 'react-i18next';


const EmployeesSettings = () => {
    const { t } = useTranslation();

    return (
        <div className="grid grid-rows-[10px_1fr_10px] min-h-screen p-1 pb-1 sm:p-1 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <text>{t('employee.settings.title')}</text>
            </main>
        </div>
    );
}

export default EmployeesSettings;