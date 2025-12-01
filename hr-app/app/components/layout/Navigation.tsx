"use client";

import { AppBar, Toolbar, Button, Link, Badge } from "@mui/material";
import { usePathname } from "next/navigation";
import ManageListNavigation from "../manage/navigation/List";
import SettingsListNavigation from "../settings/navigation/List";
import UserProfileNavigation from "../user/UserProfileNavigation"
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from '@mui/icons-material/Login';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import EmailIcon from '@mui/icons-material/Email';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '../../utility/constans';
import { useUser } from "@/app/context/UserContext";
import Image from "next/image";
import React, { useEffect, useState } from 'react';

const navLinks = [
    { href: "/", label: APP_NAME, activePath: "/", icon: <HomeIcon /> },
    { href: "/", label: "Home", activePath: "/", icon: <HomeIcon />, name: 'home' },
    { href: "/info", label: "Info", activePath: "/info", icon: <InfoIcon />, name: 'info' },
];

const Navigation: React.FC = () => {
    const pathname = usePathname();
    const { isAuthenticated, hasAccessToModule, hasPermission, employee } = useUser();
    const [notificationCount, setNotificationCount] = useState(0);
    const { t } = useTranslation();

    console.log('uuid ' + employee?.uuid, 'isAuth ' + isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchMercureToken = async () => {
            try {
                //const token = localStorage.getItem('token');
                // const res = await fetch(`${SERVICE_COMPANY_URL}/api/mercure/subscriber-token`, {
                //     method: "GET",
                //     credentials: "include",
                //     headers: { Authorization: `Bearer ${token}` },
                // });

                // if (!res.ok) {
                //     console.error('Błąd pobierania tokena Mercure', res.status);
                //     return;
                // }

                // const data = await res.json();
                // console.log(data.mercure_jwt);

                const url = new URL('http://localhost:3001/.well-known/mercure');
                url.searchParams.append('topic', `user.${employee?.uuid}`);

                const es = new EventSource(url.toString());

                es.onmessage = (event) => {
                    const data = JSON.parse(event.data);      // parsuje JSON string
                    const subscriberType = data.payload?.subscriberType;

                    if (subscriberType === 'internal') {
                        setNotificationCount(prev => prev + 1);
                    }

                    console.log('payload: ', data.payload);
                    console.log('even: ', data.event);
                };

                es.onerror = (err) => {
                    console.error("Błąd Mercure:", err);
                };

            } catch (err) {
                console.error('Błąd fetch Mercure token:', err);
            }
        };

        fetchMercureToken();
    }, [isAuthenticated, employee]);



    return (
        <AppBar position="static" sx={{ backgroundColor: "#34495e" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link href="/" color="inherit" underline="none">
                    <Image
                        src="/icons/hr-app-logo.png"
                        alt="Logo"
                        className="logo"
                        width={100}
                        height={100}
                    />
                    {/* <Typography>
                        {APP_NAME}
                    </Typography> */}
                </Link>
                <div style={{ display: "flex" }}>
                    {/* Page links */}
                    {navLinks.slice(1).map(link => isAuthenticated && hasPermission(`pages.${link.name}`) && (
                        <Link
                            key={link.href}
                            href={link.href}
                            color="inherit"
                            underline="none"
                            sx={{
                                backgroundColor: pathname === link.activePath ? "rgba(255, 255, 255, 0.3)" : "transparent",
                                padding: 0,
                                borderRadius: "2px",
                            }}
                        >
                            <Button color="inherit">{link.icon} {t(`navigation.${link.label.toLowerCase()}`)}</Button>
                        </Link>
                    ))}

                    {/* Manage links */}
                    {isAuthenticated
                        && hasAccessToModule(['companies', 'departments', 'employees', 'positions', 'roles', 'industries', 'contractTypes'])
                        && <ManageListNavigation />}


                    {/* Setting links */}
                    {isAuthenticated
                        && hasAccessToModule(['companies', 'departments', 'employees', 'positions', 'roles', 'industries', 'contractTypes'])
                        && <SettingsListNavigation />}

                    {/* Notification link */}
                    {isAuthenticated && hasAccessToModule(['notifications'])
                        && <Link
                            key="/notifications"
                            href="/notifications"
                            color="inherit"
                            underline="none"
                            sx={{
                                backgroundColor: pathname === "/notifications" ? "rgba(255, 255, 255, 0.3)" : "transparent",
                                padding: 0,
                                borderRadius: "2px",
                            }}
                        >
                            <Button color="inherit">
                                <Badge badgeContent={notificationCount} color="error">
                                    <CircleNotificationsIcon />
                                </Badge>
                            </Button>
                        </Link>
                    }

                    {/* Message link */}
                    {isAuthenticated && hasAccessToModule(['messages']) && <Link
                        key="/messages"
                        href="/messages"
                        color="inherit"
                        underline="none"
                        sx={{
                            backgroundColor: pathname === "/messages" ? "rgba(255, 255, 255, 0.3)" : "transparent",
                            padding: 0,
                            borderRadius: "2px",
                        }}
                    >
                        <Button color="inherit"><EmailIcon /> </Button>
                    </Link>
                    }

                    {/* User profile link or login */}
                    {isAuthenticated ? (
                        <UserProfileNavigation />
                    ) : (
                        <Link
                            href="/login"
                            color="inherit"
                            underline="none"
                            sx={{
                                backgroundColor: pathname === '/login' ? "rgba(255, 255, 255, 0.3)" : "transparent",
                                color: pathname === '/login' ? "#fff" : "inherit",
                                padding: 0,
                                borderRadius: "2px",
                            }}
                        >
                            <Button color="inherit"><LoginIcon />{t('login')}</Button>
                        </Link>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;