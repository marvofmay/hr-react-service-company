"use client";

import RolesTable from "@/app/components/role/Table";
import { Box, Typography, CircularProgress } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RolesList: React.FC = () => {
    const queryClient = new QueryClient();
    const { hasAccessToModule, hasPermission, loading } = useUser();
    const router = useRouter();
    const { t } = useTranslation();

    useEffect(() => {
        if (!loading && !hasAccessToModule(["roles"])) {
            router.replace("/unauthorized");
        }
    }, [hasAccessToModule, loading, router]);

    if (loading) {
        return (<Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <CircularProgress />
        </Box>);
    }

    return (
        <div className="grid grid-rows-[10px_1fr_10px] min-h-screen p-1 pb-1 sm:p-1 font-[family-name:var(--font-geist-sans)]">
            <main>
                <Box display="flex" justifyContent="center" alignItems="center" >
                    <Box width="90%">
                        <Typography variant="h6" gutterBottom>{t('role.list.title')}</Typography>
                        <QueryClientProvider client={queryClient}>
                            {hasPermission('roles.list') && <RolesTable />}
                        </QueryClientProvider>
                    </Box></Box>
            </main>
        </div>
    );
}

export default RolesList; 