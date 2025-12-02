"use client";

import SignIn from "../components/user/login/SignIn";

const Login: React.FC = () => {
    return (
        <div className="grid grid-rows-[10px_1fr_10px] justify-items-center min-h-screen p-1 pb-1 sm:p-1 font-[family-name:var(--font-geist-sans)] w-full">
            <main className="flex flex-col gap-2 row-start-2 items-center sm:items-center w-full h-full">
                <div className="flex justify-center items-center w-full max-w-lg sm:max-w-2xl">
                    <SignIn />
                </div>
            </main>
        </div>
    );
}

export default Login;
