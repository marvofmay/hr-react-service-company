"use client";

import { useUser } from '../../context/UserContext';
import { useTranslation } from 'react-i18next';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
    const { t } = useTranslation();
    const { isAuthenticated, hasAccessToModule, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !hasAccessToModule(["notes"])) {
            router.replace("/unauthorized");
        }
    }, [hasAccessToModule, loading]);

    return (
        <div className="grid grid-rows-[10px_1fr_10px] min-h-screen p-1 pb-1 sm:p-1 font-[family-name:var(--font-geist-sans)]">
            <main>
                {!loading && !isAuthenticated ? (
                    <p>{t('common.message.youAreNotLogged')}</p>
                ) : (
                    <>
                        <p>{t('notes.title')}</p>
                    </>
                )}
            </main>
        </div>
    );
}

export default Home;
