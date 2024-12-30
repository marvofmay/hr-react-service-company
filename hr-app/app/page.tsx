"use client";

import Image from "next/image";
import { useUser } from './context/UserContext';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
    const { t } = useTranslation();
    const { user, isAuthenticated } = useUser();

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

                {!isAuthenticated ? (
                    <p>{t('common.message.youAreNotLogged')}</p>
                ) : (
                    <div>
                        <p>Witaj, {user?.firstName} {user?.lastName}</p>
                        <p>Email: {user?.email}</p>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Home;
