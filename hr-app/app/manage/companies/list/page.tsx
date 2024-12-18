"use client";

import CompaniesTable from "@/app/components/company/table";
import { Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export default function CompaniesList() {
    const { t } = useTranslation();
    const queryClient = new QueryClient();

    return (
        <div className="grid grid-rows-[10px_1fr_10px] min-h-screen p-1 pb-1 sm:p-1 font-[family-name:var(--font-geist-sans)]">
            <main>
                <Box display="flex" justifyContent="center" alignItems="center" >
                    <Box width="90%">
                        <text>{t('company.list.title')}</text>
                        <QueryClientProvider client={queryClient}>
                            <CompaniesTable />
                        </QueryClientProvider>
                    </Box>
                </Box>
            </main>
        </div>
    );
}
