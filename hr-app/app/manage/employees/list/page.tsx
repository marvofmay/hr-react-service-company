"use client";

import EmployeesTable from "@/app/components/employee/table";
import { Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

const EmployeesList: React.FC = () => {
    const queryClient = new QueryClient();
    const { t } = useTranslation();

    return (
        <div className="grid grid-rows-[10px_1fr_10px] min-h-screen p-1 pb-1 sm:p-1 font-[family-name:var(--font-geist-sans)]">
            <main>
                <Box display="flex" justifyContent="center" alignItems="center" >
                    <Box width="90%">
                        <text>{t('employee.list.title')}</text>
                        <QueryClientProvider client={queryClient}>
                            <EmployeesTable />
                        </QueryClientProvider>
                    </Box></Box>
            </main>
        </div>
    );
}

export default EmployeesList; 