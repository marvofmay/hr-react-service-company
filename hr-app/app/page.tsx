"use client";

import Items from './components/dashboard/Items';
import { useUser } from './context/UserContext';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
    const { t } = useTranslation();
    const { user, isAuthenticated } = useUser();

    return (
        <div className="grid grid-rows-[10px_1fr_10px] min-h-screen p-1 pb-1 sm:p-1 font-[family-name:var(--font-geist-sans)]">
            <main>
                {!isAuthenticated ? (
                    <p>{t('common.message.youAreNotLogged')}</p>
                ) : (
                    <>
                        <div>
                            <p>Witaj, {user?.firstName} {user?.lastName}</p>
                            <p>Email: {user?.email}</p>
                        </div>
                        <Items />
                    </>
                )}
            </main>
        </div>
    );
}

export default Home;
