"use client";

import { useUser } from "@/app/context/UserContext";
import { useTranslation } from "react-i18next";
import { Box, CircularProgress } from '@mui/material';

const Info: React.FC = () => {
    const { t } = useTranslation();
    const { isAuthenticated, loading } = useUser();

    return (
        <div className="grid grid-rows-[10px_1fr_10px] min-h-screen p-1 pb-1 sm:p-1 font-[family-name:var(--font-geist-sans)]">
            <main className={`flex flex-col gap-8 row-start-2 ${isAuthenticated ? "items-center sm:items-start" : ""}`}>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                        <CircularProgress />
                    </Box>
                ) : (
                    <>{isAuthenticated ? "Info" : <div className="grid grid-rows-[10px_1fr_10px] justify-items-center min-h-screen p-1 pb-1 sm:p-1 font-[family-name:var(--font-geist-sans)]">
                        <main className="flex flex-col gap-6 row-start-2 items-center sm:items-center w-full h-full">
                            <div className="w-full max-w-md p-4 sm:p-6 bg-white shadow-md rounded-lg">
                                {t('common.message.youAreNotLogged')}
                            </div>
                        </main>
                    </div>}</>
                )}
            </main>
        </div>
    );
};

export default Info;