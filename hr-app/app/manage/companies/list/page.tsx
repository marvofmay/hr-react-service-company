"use client";

import '../../../i18n/i18n';
import { useTranslation } from 'react-i18next';

export default function CompaniesList() {
    const { t } = useTranslation();

    return (
        <div className="grid grid-rows-[10px_1fr_10px] min-h-screen p-1 pb-1 sm:p-1 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <text>{t('industry.list.title')}</text>
            </main>
        </div>
    );
}
