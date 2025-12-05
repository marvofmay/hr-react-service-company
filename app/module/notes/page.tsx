"use client";

import { useUser } from '../../context/userContext';
import { useTranslation } from 'react-i18next';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CenteredMessage from '@/app/components/shared/CenterdeMessage';

const Note: React.FC = () => {
    const { t } = useTranslation();
    const { isAuthenticated, hasAccess, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/user/logout");
        }

        if (!loading && !hasAccess("notes")) {
            router.push("/forbidden");
        }
    }, [hasAccess, loading, router]);

    return (
        <div className="grid grid-rows-[10px_1fr_10px] min-h-screen p-1 pb-1 sm:p-1 font-[family-name:var(--font-geist-sans)]">
            <main>
                {!loading && !isAuthenticated ? (
                    <CenteredMessage message={t('common.message.youAreNotLogged')} />
                ) : (
                    <>
                        <p>{t('notes.title')}</p>
                    </>
                )}
            </main>
        </div>
    );
}

export default Note;
