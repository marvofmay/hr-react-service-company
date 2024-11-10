"use client";

import IndustriesTable from "@/app/components/industry/table";
import { Box } from '@mui/material';

export default function IndustriesList() {
    return (
        <div className="grid grid-rows-[10px_1fr_10px] min-h-screen p-1 pb-1 sm:p-1 font-[family-name:var(--font-geist-sans)]">
            <main>
                <Box display="flex" justifyContent="center" alignItems="center" >
                    <Box width="80%">
                        <text>Industries list</text>
                        <IndustriesTable />
                    </Box></Box>
            </main>
        </div>
    );
}
