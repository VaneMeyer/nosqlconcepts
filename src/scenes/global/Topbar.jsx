import React, { useState, useEffect, useContext } from "react";
import { Box, IconButton, useTheme, Button } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Link } from "react-router-dom";
import LogOut from "../../Sign-in/logout";
function useToken() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("token");
      setToken(updatedToken);
    };

    // Event-Listener zum Abfangen von Änderungen im Local Storage hinzufügen
    window.addEventListener("storage", handleStorageChange);

    // Cleanup-Funktion, um den Event-Listener zu entfernen
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return token;
}

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const authToken = useToken();

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        {/* PLACEHOLDER */}
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        {authToken ? (
          <LogOut />
        ) : (
          <Link to="/signin">
            <Button sx={{ color: colors.blueAccent[400] }}>Sign in</Button>
          </Link>
        )}
      </Box>
    </Box>
  );
};
function TopBar() {
  return <Topbar />;
}

export default TopBar;
