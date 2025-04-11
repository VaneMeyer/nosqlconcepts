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
import SchoolIcon from '@mui/icons-material/School';
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import nosqlconceptsLogo from "../images/nosql-logo-light-trans.png";

import LogOut from "../Auth/logout";
import { checkAuth } from "../api/loginApi";

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
    <AppBar position="static" sx={{ color:'black', background: 'linear-gradient(135deg,rgb(256, 256, 256) 0%,rgb(256, 256, 256) 100%)'}}>
    
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {/*   <img
            style={{ height: "50px" }}
            src={nosqlconceptsLogo}
            alt="NoSQLconcepts Logo"
          /> */}
          NoSQLconcepts
        </Typography>
      {/*   <Button
          component={Link}
          to="/tutorial"
          color="inherit"
          startIcon={<SchoolIcon />} 
        >
          Tutorial
        </Button> */}
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
          
       {/*    {username && (
            <MenuItem component={Link} to="/history" onClick={handleClose}>
              My query history
            </MenuItem>
          )}
          {username && (
            <MenuItem component={Link} to="/my-data" onClick={handleClose}>
              My data
            </MenuItem>
          )} */}
          {username && (
            <MenuItem component={Link} to="/userprofile" onClick={handleClose}>
              User profile
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
          {/* {username && isAdmin && (
            <MenuItem
              component={Link}
              to="/test-dashboard"
              onClick={handleClose}
            >
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              TestDashboard - admin
            </MenuItem>
          )} 
          {username && isAdmin && (
            <MenuItem
              component={Link}
              to="/test-exercise"
              onClick={handleClose}
            >
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              TestExercise - admin
            </MenuItem>
          )}*/}
        {/*   {username && isAdmin && (
            <MenuItem
              component={Link}
              to="/test-statistics"
              onClick={handleClose}
            >
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              TestStatistics - admin
            </MenuItem>
          )}
          {username && isAdmin && (
            <MenuItem
              component={Link}
              to="/test-userprofile"
              onClick={handleClose}
            >
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              TestUserProfile - admin
            </MenuItem>
          )}
          {username && isAdmin && (
            <MenuItem
              component={Link}
              to="/test-adminpage"
              onClick={handleClose}
            >
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              TestAdminPage - admin
            </MenuItem>
          )} */}
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
 

 

/* import React, { useState, useEffect } from "react";
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
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import nosqlconceptsLogo from "../images/nosql-logo-light-trans.png"; // Dein Logo

import LogOut from "../Login/logout";
import { checkAuth } from "../api/loginApi";

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
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#ffffff', // Heller Hintergrund
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Leichter Schatten
        color: '#000', // Schwarze Schrift
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        
        <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
       
          <span style={{ fontSize: '1.2rem' }}>NoSQLconcepts</span>
        </Typography>

        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            component={Link}
            to="/tutorial"
            color="inherit"
            startIcon={<SchoolIcon />}
            sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }} // Leichter Hover-Effekt
          >
            Tutorial
          </Button>
          <Button
            component={Link}
            to="/"
            color="inherit"
            startIcon={<GridViewIcon />}
            sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }} // Leichter Hover-Effekt
          >
            Dashboard
          </Button>
          
          
          <Tooltip title="Open menu">
            <IconButton
              onClick={handleClick}
              size="large"
              color="inherit"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <MenuIcon sx={{ fontSize: '1.5rem' }} />
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
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))", // Leichter Schatten
                mt: 1.5,
                '& .MuiAvatar-root': {
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
              <MenuItem component={Link} to="/manage-exercises" onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Manage Exercises - admin
              </MenuItem>
            )}
            {username && (
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <LogOut />
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar; */
