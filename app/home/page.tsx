"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useUser } from "@/app/context/UserContext";
import { Box, CircularProgress } from '@mui/material';

const Home: React.FC = () => {
    const { loading } = useUser();

    useEffect(() => {
    }, [loading]);

    if (loading) {
        return (<Box display="flex" justifyContent="center" alignItems="center" height="700px">
            <CircularProgress />
        </Box>);
    }

    return (
        <div className="grid grid-rows-[10px_1fr_10px] justify-items-center min-h-screen p-1 pb-1 sm:p-1 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <Image
                    className="dark:invert"
                    src="https://nextjs.org/icons/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />
            </main>
        </div>
    );
}

export default Home;
