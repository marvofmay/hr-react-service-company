"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress, Typography } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Items from "./components/dashboard/Items";
import { useUser } from "./context/UserContext";

const Home: React.FC = () => {

    const router = useRouter();

    const queryClient = useMemo(() => new QueryClient(), []);
    const { isAuthenticated, hasAccessToModule, hasPermission, loading, employee } = useUser();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.replace("/unauthorized");
        }

        if (!loading && !hasAccessToModule(["pages"]) && !hasPermission("pages.home")) {
            router.replace("/forbidden");
        }
    }, [hasAccessToModule, hasPermission, isAuthenticated, loading, router]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div className="grid grid-rows-[10px_1fr_10px] min-h-screen p-1 pb-1 sm:p-1 font-[family-name:var(--font-geist-sans)]">
            <main>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Box width="90%">
                        <QueryClientProvider client={queryClient}>
                            {
                                <>
                                    {employee && (
                                        <Typography variant="body1" mb={2}>
                                            Witaj, {employee.firstName} {employee.lastName}
                                        </Typography>
                                    )}
                                    <Items />
                                </>
                            }
                        </QueryClientProvider>
                    </Box>
                </Box>
            </main>
        </div>
    );
};

export default Home;
