"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MainData from "@/app/components/userProfile/MainData";
import AvatarForm from "@/app/components/userProfile/Avatar";
import AddressData from "@/app/components/userProfile/AddressData";
import AdditionalData from "@/app/components/userProfile/AdditionalData";
import useUserProfileQuery from "@/app/hooks/userProfile/useUserProfileQuery";
import { Box, CircularProgress } from '@mui/material';

const DataContent: React.FC = () => {
    const { t } = useTranslation();

    const { data, isLoading, error } = useUserProfileQuery('121');

    if (isLoading) {
        return (<Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <CircularProgress />
        </Box>);
    }

    if (error) {
        return <p>{t('error.loadingUserProfile')}</p>;
    }

    return (
        <div className="grid grid-rows-[5px_1fr_5px] justify-items-center min-h-screen p-1 pb-1 sm:p-1 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-6 row-start-2 items-center sm:items-center w-full h-full">
                <div className="w-4/4 p-4 sm:p-6 bg-white shadow-md rounded-lg">
                    <h1 className="text-2xl font-bold text-center mb-6">
                        {t('userProfile.data.title')}
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div className="p-4 bg-gray-100 rounded-md shadow">
                            <h2 className="text-lg font-semibold mb-2 text-center">
                                {t('userProfile.data.main')}
                            </h2>
                            <div className="text-sm text-gray-600">
                                <MainData data={data} />
                            </div>
                        </div>

                        <div className="p-4 bg-gray-100 rounded-md shadow">
                            <h2 className="text-lg font-semibold mb-2 text-center">
                                {t('userProfile.data.avatar')}
                            </h2>
                            <div className="text-sm text-gray-600">
                                <AvatarForm />
                            </div>
                        </div>

                        <div className="p-4 bg-gray-100 rounded-md shadow">
                            <h2 className="text-lg font-semibold mb-2 text-center">
                                {t('userProfile.data.address')}
                            </h2>
                            <div className="text-sm text-gray-600">
                                <AddressData data={data?.address} />
                            </div>
                        </div>

                        <div className="p-4 bg-gray-100 rounded-md shadow">
                            <h2 className="text-lg font-semibold mb-2 text-center">
                                {t('userProfile.data.additional')}
                            </h2>
                            <div className="text-sm text-gray-600">
                                <AdditionalData data={data} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const Data: React.FC = () => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <DataContent />
        </QueryClientProvider>
    );
};

export default Data;
