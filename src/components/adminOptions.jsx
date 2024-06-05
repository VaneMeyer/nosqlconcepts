import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";


import ListItemText from "@mui/material/ListItemText";

import { Link } from "react-router-dom";

const AdminOptions = () => {
    const options = [{name: "Inspect user data", link: "/adminoptions/admin"}, {name: "Manage Exercises", link: "/adminoptions/updatetasks"}];

    //################# Frontend  ######################################################
  return (
    
       <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "70%" }}>
      <h1>What do you want to do?</h1>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <List component="nav" aria-label="secondary mailbox folder">
          {options.map((option) => (
            <Link to={option.link}>
              <ListItemButton>
                <ListItemText primary={option.name} />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Box>
    </div>
    </div>
  );
};

export default AdminOptions;