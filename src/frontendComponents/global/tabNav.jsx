import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Box,
  AppBar,
  useMediaQuery,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Toolbar,
  Typography,
  Tooltip,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Logout from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import LogOut from "../Auth/logout";
import { checkAuth } from "../api/loginApi";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import BarChartIcon from "@mui/icons-material/BarChart";
import InfoIcon from "@mui/icons-material/Info";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import BuildIcon from "@mui/icons-material/Build";
import LogoutIcon from "@mui/icons-material/Logout";


function TabNav() {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const open = Boolean(anchorEl);
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  useEffect(() => {
    const init = async () => {
      const user = await checkAuth();
      if (user) {
        setUsername(user.username);
        setIsAdmin(user.role === "admin");
      }
    };
    init();
  }, []);

  const tabs = [
    { label: "Dashboard", to: "/", icon: <DashboardIcon />, visible: true },
    { label: "Tutorial", to: "/tutorial", icon: <SchoolIcon />, visible: true },
    {
      label: "User Profile",
      to: "/userprofile",
      icon: <PersonIcon />,
      visible: !!username,
    },
    {
      label: "Statistics",
      to: "/statistics",
      icon: <BarChartIcon />,
      visible: !!username,
    },
    {
      label: "Information",
      to: "/information",
      icon: <InfoIcon />,
      visible: true,
    },
    {
      label: "Manage Users",
      to: "/manage-users",
      icon: <GroupAddIcon />,
      visible: isAdmin,
    },
    {
      label: "Manage Exercises",
      to: "/manage-exercises",
      icon: <BuildIcon />,
      visible: isAdmin,
    },
   /*  { label: "Logout", to: "#logout", icon: <LogoutIcon />, visible: !!username, isLogout: true }, */

  ];

  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.to === location.pathname);
    setValue(index === -1 ? 0 : index);
  }, [location.pathname]);

  return (
    <AppBar position="static" color="default"/* sx={{ backgroundColor: "rgb(255, 255, 255)" }} */>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          NoSQLconcepts
        </Typography>

        {isSmallScreen ? (
          <>
            <IconButton
              onClick={handleMenuOpen}
              aria-label="menu"
              aria-controls="nav-menu"
              aria-haspopup="true"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="nav-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              keepMounted
            >
              {tabs
                .filter((tab) => tab.visible)
                .map((tab, index) => (
                  <MenuItem
                    key={index}
                    component={Link}
                    to={tab.to}
                    onClick={handleMenuClose}
                  >
                    <ListItemIcon>{tab.icon}</ListItemIcon>
                    {tab.label}
                  </MenuItem>
                ))}
              {username && (
                <>
                  <Divider />
                  {/* {isAdmin && (
                    <>
                      <MenuItem
                        component={Link}
                        to="/manage-users"
                        onClick={handleMenuClose}
                      >
                        <ListItemIcon>
                          <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Manage Users
                      </MenuItem>
                      <MenuItem
                        component={Link}
                        to="/manage-exercises"
                        onClick={handleMenuClose}
                      >
                        <ListItemIcon>
                          <Settings fontSize="small" />
                        </ListItemIcon>
                        Manage Exercises
                      </MenuItem>
                    </>
                  )} */}
                  <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    <LogOut />
                  </MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
         
        <Box  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    overflow: "hidden",
  }}>
             <Tabs
            value={value}
            onChange={(e, newVal) => setValue(newVal)}
            aria-label="main navigation tabs"
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabs
              .filter((tab) => tab.visible)
              .map((tab, index) => (
                <Tab
                  key={index}
                  label={tab.label}
                  icon={tab.icon}
                  iconPosition="start"
                  component={Link}
                  to={tab.to}
                  id={`tab-${index}`}
                  aria-controls={`tabpanel-${index}`}
                />
              ))}
                
          </Tabs>
           {username && (
   <Tooltip title="Logout">
      <Box sx={{ ml: 2, flexShrink: 0, display: "flex", alignItems: "center" }}>
        {/* <IconButton color="inherit"> */}
          <LogoutIcon />
       {/*  </IconButton> */}
        <LogOut />
      </Box>
    </Tooltip>
        )}
        </Box>)
}
      </Toolbar>
    </AppBar>
  );
}

export default TabNav;
