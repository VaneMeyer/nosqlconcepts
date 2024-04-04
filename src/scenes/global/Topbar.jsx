import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import LogOut from "../../Sign-in/logout";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HistoryIcon from "@mui/icons-material/History";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import nosqlconceptsLogo from "../../images/nosqlconcepts-logo-transparent.png";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import avatarimg from "../../images/avatar.png";

const TopBar = () => {
  //################# Style Settings ######################################################
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //################# State Variables ######################################################
  const [username, setUsername] = useState(localStorage.getItem("token"));
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [isAdmin, setIsAdmin] = useState(false);

  //################# handle Functions ######################################################
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  //################# useEffect Function ######################################################
  useEffect(() => {
    if (role === "admin") {
      setIsAdmin(true);
    }
  }, []);
  //################# Frontend ######################################################
  return (
    <AppBar
      position="static"
      sx={{
        /* backgroundColor: colors.custom01[600] */ backgroundImage:
          "linear-gradient(to right, #FFFFFF, #101226 )",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            component={Link}
            to="/"
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img style={{ height: "100px" }} src={nosqlconceptsLogo} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem component={Link} to="/" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                to="/history"
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">History</Typography>
              </MenuItem>
              {isAdmin && (
                <MenuItem
                  component={Link}
                  to="/admin"
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">Admin</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to="/">
              <IconButton
                sx={{
                  color: colors.grey[100],
                }}
              >
                <HomeOutlinedIcon />
                Dashboard
              </IconButton>
            </Link>
            <Link to="/history">
              <IconButton
                sx={{
                  color: colors.grey[100],
                }}
              >
                <HistoryIcon />
                History
              </IconButton>
            </Link>
            {isAdmin && (
              <Link to="/admin">
                <IconButton
                  sx={{
                    color: colors.grey[100],
                  }}
                >
                  <AdminPanelSettingsIcon />
                  Admin
                </IconButton>
              </Link>
            )}
          </Box>
          {username && (
            <Box sx={{ color: "white" }}>
              <p>Don't forget to logout</p>
            </Box>
          )}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Avatar Icon, click to see username and login or logout button"
                  src={avatarimg}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {username ? (
                <div>
                  <MenuItem>
                    <Typography textAlign="center">
                      Logged in as {username}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <LogOut />
                  </MenuItem>
                </div>
              ) : (
                <Link to="/">
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Sign in</Typography>
                  </MenuItem>
                </Link>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopBar;
