import { Button, Menu, MenuItem, Link } from "@mui/material";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SettingsIcon from "@mui/icons-material/Settings"

const menuItems = [
    { label: "Companies", href: "/settings/companies", key: "companies" },
    { label: "Employees", href: "/settings/employees", key: "employees" },
    { label: "Roles", href: "/settings/roles", key: "roles" },
];

const SettingsListNavigation: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const pathname = usePathname();
    const [selectedMenuItem, setSelectedMenuItem] = useState<string>("");

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (menuItem: string) => {
        setSelectedMenuItem(menuItem);
        handleMenuClose();
    };

    // Ustaw wybrany element menu na podstawie ścieżki URL
    useEffect(() => {
        const matchedItem = menuItems.find(item => pathname.includes(item.href));
        if (matchedItem) {
            setSelectedMenuItem(matchedItem.key);
        }
    }, [pathname]);

    return (
        <>
            {/* Przycisk „Settings” */}     
            <Button
                color="inherit"
                aria-controls="manage-menu"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                sx={{
                    backgroundColor: open || selectedMenuItem ? "rgba(255, 255, 255, 0.3)" : "transparent", // Podświetlenie, gdy menu jest otwarte lub coś wybrane
                }}
            >
                <SettingsIcon /> Settings
            </Button>

            <Menu
                id="manage-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                    "aria-labelledby": "manage-button",
                }}
            >
                {/* Opcje w rozwijanym menu renderowane dynamicznie */}
                {menuItems.map((item) => (
                    <MenuItem
                        key={item.key}
                        onClick={() => handleMenuItemClick(item.key)}
                        component={Link}
                        href={item.href}
                        sx={{
                            backgroundColor: selectedMenuItem === item.key ? "rgba(0, 0, 0, 0.1)" : "transparent",
                        }}
                    >
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default SettingsListNavigation;
