import { AppBar, Toolbar, Typography, Button, Link } from "@mui/material";

const Navigation: React.FC = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Nazwa aplikacji po lewej */}
        <Link href="/" color="inherit" underline="none" sx={{ flexGrow : 1 }}>
          <Button color="inherit">HR app</Button>
        </Link>

        {/* Linki do "Home" i "Info" po prawej */}
        <Link href="/home" color="inherit" underline="none" sx={{ marginRight: 2 }}>
          <Button color="inherit">Home</Button>
        </Link>
        <Link href="/info" color="inherit" underline="none">
          <Button color="inherit">Info</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;