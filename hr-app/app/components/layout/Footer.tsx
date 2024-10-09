import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        padding: 2,
        position: "fixed",
        bottom: 0,
        width: "100%",
        textAlign: "center",
        color: "white",
      }}
    >
      <Typography variant="body2">
        HR-APP {new Date().getFullYear()} Moja Aplikacja. Wszelkie prawa zastrzeżone.
      </Typography>
    </Box>
  );
};

export default Footer;
