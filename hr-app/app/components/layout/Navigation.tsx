"use client";

import { AppBar, Toolbar, Typography, Button, Link } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
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

const navLinks = [
    { href: "/", label: { APP_NAME }, activePath: "/", icon: <HomeIcon /> },
    { href: "/home", label: "Home", activePath: "/home", icon: <HomeIcon /> },
    { href: "/info", label: "Info", activePath: "/info", icon: <InfoIcon /> },
];

const Navigation: React.FC = () => {
    const pathname = usePathname();
    const { user, isAuthenticated, hasPermission, hasAccessToModule } = useUser();
    const { t } = useTranslation();

    return (
        <AppBar position="static" sx={{ backgroundColor: "#34495e" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link href="/" color="inherit" underline="none">
                    <Typography>{APP_NAME}</Typography>
                </Link>
                <div style={{ display: "flex", gap: "16px" }}>
                    {navLinks.slice(1).map(link => (
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
                    {isAuthenticated && <ManageListNavigation />}
                    {isAuthenticated && <SettingsListNavigation />}
                    {isAuthenticated && hasAccessToModule('notifications') && <Link
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
                        <Button color="inherit"><CircleNotificationsIcon /> </Button>
                    </Link>
                    }

                    {isAuthenticated && hasAccessToModule('emails') && <Link
                        key="/emails"
                        href="/emails"
                        color="inherit"
                        underline="none"
                        sx={{
                            backgroundColor: pathname === "/emails" ? "rgba(255, 255, 255, 0.3)" : "transparent",
                            padding: 0,
                            borderRadius: "2px",
                        }}
                    >
                        <Button color="inherit"><EmailIcon /> </Button>
                    </Link>
                    }
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