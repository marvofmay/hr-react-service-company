"use client";

import CompaniesTable from "@/app/components/company/Table";
import { Box, Typography } from '@mui/material';
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
                        <Typography variant="h6" gutterBottom>{t('company.list.title')}</Typography>
                        <QueryClientProvider client={queryClient}>
                            <CompaniesTable />
                        </QueryClientProvider>
                    </Box>
                </Box>
            </main>
        </div>
    );
}
