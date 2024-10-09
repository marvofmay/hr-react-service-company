'use client';

import { ReactNode } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import { usePathname } from "next/navigation";
import { Card, CardContent, Paper } from "@mui/material";
import { colors } from "@mui/material";

interface ContentProps {
  children: ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  const pathname = usePathname(); 
  const pathParts = pathname ? pathname.split("/").filter(Boolean) : [];

  return (
    <main className="ml-6 mr-6 mt-3">
      <Breadcrumbs aria-label="breadcrumb" sx={{ color: colors.grey[700], fontSize: '1rem', padding: '8px 0' }}>
        <Link href="/" passHref>
          <Typography color="text.primary" sx={{ fontWeight: 500 }}>
            HR APP
          </Typography>
        </Link>
        {pathParts.map((part, index) => (
          <Link key={index} href={`/${part}`} passHref>
            <Typography color="text.secondary" sx={{ fontWeight: 400 }}>
              {part.charAt(0).toUpperCase() + part.slice(1)}
            </Typography>
          </Link>
        ))}
      </Breadcrumbs>

      <Paper
        elevation={3}
        sx={{
          padding: '24px',
          marginTop: '24px',
          borderRadius: '8px',
          backgroundColor: colors.common.white,
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Card sx={{ borderRadius: '8px', boxShadow: 'none' }}>
          <CardContent>
            {children}
          </CardContent>
        </Card>
      </Paper>
    </main>
  );
};

export default Content;
