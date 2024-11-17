"use client";

import RolesTable from "@/app/components/role/table";
import { Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const RolesList: React.FC = () => {
    const queryClient = new QueryClient();

    return (
        <div className="grid grid-rows-[10px_1fr_10px] min-h-screen p-1 pb-1 sm:p-1 font-[family-name:var(--font-geist-sans)]">
            <main>
                <Box display="flex" justifyContent="center" alignItems="center" >
                    <Box width="80%">
                        <text>Roles list</text>
                        <QueryClientProvider client={queryClient}>
                            <RolesTable />
                        </QueryClientProvider>
                    </Box></Box>
            </main>
        </div>
    );
}

export default RolesList; 