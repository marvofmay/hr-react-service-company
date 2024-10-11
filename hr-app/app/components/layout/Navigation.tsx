"use client";

import { AppBar, Toolbar, Typography, Button, Link } from "@mui/material";
import { usePathname } from "next/navigation";
import ManageListNavigation from "../manage/navigation/List";
import SettingsListNavigation from "../settings/navigation/List";

import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";

const navLinks = [
  { href: "/", label: "HR APP", activePath: "/", icon: <HomeIcon /> },
  { href: "/home", label: "Home", activePath: "/home", icon: <HomeIcon /> },
  { href: "/info", label: "Info", activePath: "/info", icon: <InfoIcon /> },
];

const Navigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" color="inherit" underline="none">
          <Typography>HR APP</Typography>
        </Link>

        <div style={{ display: "flex", gap: "16px" }}>
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              color="inherit"
              underline="none"
              sx={{
                backgroundColor: pathname.startsWith(link.activePath) ? "rgba(0, 0, 0, 0.1)" : "transparent",
                padding: 0,
                borderRadius: "2px",
              }}
            >              
              <Button color="inherit">{link.icon} {link.label}</Button>
            </Link>
          ))}      
          <ManageListNavigation />
          <SettingsListNavigation />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
