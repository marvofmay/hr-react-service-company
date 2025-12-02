"use client";

import { useTranslation } from 'react-i18next';

const Unauthorized: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="grid grid-rows-[10px_1fr_10px] min-h-[50vh] p-4 sm:p-6 font-[family-name:var(--font-geist-sans)] bg-gray-100">
            <main className="flex flex-col gap-4 row-start-2 items-center justify-center text-center">
                <h1 className="text-6xl font-bold text-[#34495e]">{t('common.error403')}</h1>
                <h2 className="text-3xl text-[#34495e] italic">{t('common.path.forbidden')}</h2>
            </main>
        </div>
    );
};

export default Unauthorized;
