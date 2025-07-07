"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/app/context/UserContext";
import { useTranslation } from "react-i18next";
import { Box, CircularProgress } from '@mui/material';

const Emails: React.FC = () => {
    const { t } = useTranslation();
    const { hasAccessToModule, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !hasAccessToModule(["emails"])) {
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
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <p>{t("common.path.emails")}</p>
            </main>
        </div>
    );
};

export default Emails;

