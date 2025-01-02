"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/app/context/UserContext";
import { useTranslation } from "react-i18next";
import { Box, CircularProgress } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NotificationsTable from "@/app/components/notification/Table";

const Notifications: React.FC = () => {
    const { t } = useTranslation();
    const { hasAccessToModule, loading } = useUser();
    const router = useRouter();
    const queryClient = new QueryClient();

    useEffect(() => {
        if (!loading && !hasAccessToModule(["notifications"])) {
            router.replace("/unauthorized");
        }
    }, [hasAccessToModule, loading]);

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
                        <p>{t("common.path.notifications")}</p>
                        <QueryClientProvider client={queryClient}>
                            <NotificationsTable />
                        </QueryClientProvider>
                    </Box>
                </Box>
            </main>
        </div>
    );
};

export default Notifications;

