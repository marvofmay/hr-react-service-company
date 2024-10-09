"use client"

import { AppBar, Toolbar, Typography, Button, Link } from "@mui/material";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "HR APP", activePath: "/" },
  { href: "/home", label: "Home", activePath: "/home" },
  { href: "/info", label: "Info", activePath: "/info" },
];

const Navigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>  
        <Link
          href="/"
          color="inherit"
          underline="none"
        >
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
                backgroundColor: pathname === link.activePath ? "rgba(0, 0, 0, 0.1)" : "transparent",
                padding: "6px 16px",
                borderRadius: "4px",
              }}
            >
              <Button color="inherit">{link.label}</Button>
            </Link>
          ))}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
