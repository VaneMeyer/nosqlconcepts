import React, { useState } from "react";
import { Box, IconButton, Typography, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import LogOut from "../../Sign-in/logout";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HistoryIcon from '@mui/icons-material/History';
const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [username, setUsername] = useState(localStorage.getItem("token"));
  return (
    <Box
      sx={{ backgroundColor: `${colors.blueAccent[100]}` }}
      display="flex"
      justifyContent="space-between"
      p={2}
    >
      <Box display="flex">
        <Typography
          variant="h3"
          color={colors.grey[900]}
          sx={{ marginRight: "20px", display: "flex", alignItems: "center" }}
        >
          NoSQLconcepts
          
        </Typography>
        <Box display="flex" alignItems="center">
          <Link to="/">
            <IconButton
              sx={{
                color: colors.grey[900],
                "&:hover": { backgroundColor: `${colors.blueAccent[200]}` },
              }}
            >
              <HomeOutlinedIcon />
              Dashboard
            </IconButton>
          </Link>
          <Link to="/history">
            <IconButton
              sx={{
                color: colors.grey[900],
                "&:hover": { backgroundColor: `${colors.blueAccent[200]}` },
              }}
            >
              <HistoryIcon />
              History
            </IconButton>
          </Link>
        </Box>
      </Box>

      <Box display="flex">
        {username ? (
          <p
            style={{
              color: colors.grey[900],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "5px 20px",
              /* margin: "10px", */
            }}
          >
            Logged in as {username}
          </p>
        ) : (
          <p></p>
        )}

        {username ? (
          <div>
            <LogOut />
          </div>
        ) : (
          <Link to="/">
            <Button
              sx={{
                color: colors.grey[900],
                "&:hover": { backgroundColor: `${colors.blueAccent[200]}` },
              }}
            >
              Sign in
            </Button>
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
