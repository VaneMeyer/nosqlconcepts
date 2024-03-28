import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ResultTable from "./ResultTable";

const AdminC = () => {
  
  //recommendation if user passes or fails (e.g. 50% user inputs? -> pass, else fail)
  const [user, setUser] = useState("");
  const [userArray, setUserArray] = useState([]);
  const [userdata, setUserdata] = useState("");

  const handleChange = (event) => {
    setUser(event.target.value);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    fetch("/getUsers")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserArray(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const getUserData = () => {
    axios
    .post("/get-userdata-admin", { user })
    .then((response) => {
    setUserdata(response.data);
    console.log(response.data);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "70%" }}>
      <h1>Admin</h1>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select user</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user}
            label="Select user"
            onChange={handleChange}
          >
            {userArray.map((item) => (
               <MenuItem key={item.username} value={item.username}>{item.username}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={getUserData}>Get user data</Button>
        {userdata &&   <ResultTable
            queryResult={userdata}
            resultSize={userdata.length}
          />}
      </Box>
    </div>
    </div>
  );
};

export default AdminC;
