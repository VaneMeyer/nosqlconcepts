import React from "react";
import PropTypes from "prop-types";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import History from "../components/userProfileComponents/history";
import UserData from "../components/userProfileComponents/userData";
import EditUser from "../components/adminComponents/editUser";
import ManageUserData from "../components/adminComponents/manageUserData";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

// Accessibility-friendly a11yProps function
function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}
function AdminPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="User Management"
        >
          <Tab label="Edit User" {...a11yProps(0)} />
          <Tab label="See User Data" {...a11yProps(1)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <EditUser />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ManageUserData />
        </TabPanel>
      </Box>
    </Container>
  );
}

export default AdminPage;
