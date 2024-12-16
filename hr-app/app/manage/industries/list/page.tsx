"use client";

import IndustriesTable from "@/app/components/industry/table";
import { Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export default function IndustriesList() {
    const queryClient = new QueryClient();
    const { t } = useTranslation();

    return (
        <div className="grid grid-rows-[10px_1fr_10px] min-h-screen p-1 pb-1 sm:p-1 font-[family-name:var(--font-geist-sans)]">
            <main>
                <Box display="flex" justifyContent="center" alignItems="center" >
                    <Box width="80%">
                        <text>{t('industry.list.title')}</text>
                        <QueryClientProvider client={queryClient}>
                            <IndustriesTable />
                        </QueryClientProvider>
                    </Box></Box>
            </main>
        </div>
    );
}
