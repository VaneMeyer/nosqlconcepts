import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { Link } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MenuIcon from '@mui/icons-material/Menu';
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import nosqlconceptsLogo from "../images/nosql-logo-light-trans.png";
/* import nosqlconceptsLogo from "../images/nosqlconcepts-logo-transparent.png"; */
import LogOut from "../Login/logout";
import { checkAuth } from "../api/auth";

function TopBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const verifyAuth = async () => {
      const authData = await checkAuth();
      setIsAuthenticated(authData !== null);
      if (authData) {
        setIsAdmin(authData.role === 'admin');
      }
    };

    verifyAuth();
    const fetchUser = async () => {
      const user = await checkAuth();
      if (user) {
        setUsername(user.username); 
      }
    };

    fetchUser();
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img
            style={{ height: "50px" }}
            src={nosqlconceptsLogo}
            alt="NoSQLconcepts Logo"
          />
        </Typography>
        <Button
          component={Link}
          to="/"
          color="inherit"
          startIcon={<GridViewIcon />}
        >
          Dashboard
        </Button>
        <Tooltip title="open menu">
          <IconButton
            onClick={handleClick}
            size="large"
            color="inherit"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {/* {username && <MenuItem>Logged in as {username.replace(/"/g, "")}</MenuItem>} */}
          {username && (
            <MenuItem component={Link} to="/history" onClick={handleClose}>
              My query history
            </MenuItem>
          )}
          {username && (
            <MenuItem component={Link} to="/my-data" onClick={handleClose}>
              My data
            </MenuItem>
          )}
          {username && (
            <MenuItem component={Link} to="/statistics" onClick={handleClose}>
              Course statistics
            </MenuItem>
          )}
          <MenuItem component={Link} to="/information" onClick={handleClose}>
            Information
          </MenuItem>
          <Divider />
          {username && isAdmin && (
            <MenuItem component={Link} to="/manage-users" onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Manage users - admin
            </MenuItem>
          )}
          {username && isAdmin && (
            <MenuItem
              component={Link}
              to="/manage-exercises"
              onClick={handleClose}
            >
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Manage Exercises - admin
            </MenuItem>
          )}
         { username && <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <LogOut />
          </MenuItem>}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
