"use client";

import { useUser } from "@/app/context/UserContext";
import { useTranslation } from "react-i18next";
import { Box, CircularProgress } from '@mui/material';
import CenteredMessage from "../components/shared/CenteredMessage";

const Info: React.FC = () => {
    const { t } = useTranslation();
    const { isAuthenticated, loading } = useUser();

    return (
        <div className="grid grid-rows-[10px_1fr_10px] min-h-screen p-1 pb-1 sm:p-1 font-[family-name:var(--font-geist-sans)]">
            <main>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                        <CircularProgress />
                    </Box>
                ) : (
                    <>{isAuthenticated ? "Info" :
                        <CenteredMessage message={t('common.message.youAreNotLogged')} />
                    }</>
                )}
            </main>
        </div>
    );
};

export default Info;