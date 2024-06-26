import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Paper, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import PersonIcon from "@mui/icons-material/Person";

function TotalUsers() {
  //################# State Variables ######################################################
  const [data, setData] = useState(0);

  //################# Style Settings ######################################################
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const userStyle = {
    margin: "20px",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: colors.custom01[700],
    color: "black",
    textAlign: "center",
  };

  //################# Functions ######################################################
  const getStoredData = () => {
    const storedData = localStorage.getItem("totalUsersData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  };
  //################# useEffect Function ######################################################
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/total-users");
        setData(response.data[0].total_users);
        localStorage.setItem(
          "totalUsersData",
          JSON.stringify(response.data[0].total_users)
        );
      } catch (error) {
        console.error("Error with receiving data:", error);
        getStoredData();
      }
    };

    fetchData();
  }, []);
  //################# Frontend ######################################################
  return (
    <div>
      <Box sx={userStyle}>
        <Typography>
          <PersonIcon />
          Total Users: {data}
        </Typography>
      </Box>
    </div>
  );
}

export default TotalUsers;
