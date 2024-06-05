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
import ImportantMsg from "./importantMsg";
import WarningIcon from "@mui/icons-material/Warning";

const AdminC = () => {
  
  //recommendation if user passes or fails (e.g. 50% user inputs? -> pass, else fail)

  //################# State Variables ######################################################
  const [user, setUser] = useState("");
  const [userArray, setUserArray] = useState([]);
  const [userdata, setUserdata] = useState("");

  //################# Handle Functions ######################################################

  const handleChange = (event) => {
    setUser(event.target.value);
   
  };

  //################# useEffect Function ######################################################
  useEffect(() => {
    getUsers();
  }, []);

  //################# get/post data from/to DB ######################################################
  const getUsers = () => {
    fetch("/getUsers")
      .then((response) => response.json())
      .then((data) => {
        
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
   
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
  }

  //################# Frontend ######################################################
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "70%" }}>
      <h1>Inspect user data</h1>
      <ImportantMsg
          message={
            <>
             <WarningIcon />
              Work in progress
            </>
          }
          type="info"
        />
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
        {userdata && <div>
          <p>taskareaIds: 1 = PostgreSQL, 2 = Cassandra, 3 = Neo4J, 4 = MongoDB, 5 = Lab Assignment 1, 6 = Lab Assignment 2; time is shown in seconds</p>
          <ResultTable
            queryResult={userdata}
            resultSize={userdata.length}
          />
        </div>  }
      </Box>
    </div>
    </div>
  );
};

export default AdminC;
