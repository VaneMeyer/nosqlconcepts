import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Paper, useTheme} from '@mui/material';
import { tokens } from "../../theme";
import PersonIcon from '@mui/icons-material/Person';

function TotalUsers() {
  //state variables
  const [data, setData] = useState(0);


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const userStyle = {margin:"20px",padding:"10px", borderRadius:"5px", backgroundColor:colors.blueAccent[800], color:"black", textAlign:'center'}
  const getStoredData = () => {
    const storedData = localStorage.getItem("totalUsersData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/total-users");
        setData(response.data[0].total_users);
        localStorage.setItem("totalUsersData", JSON.stringify(response.data[0].total_users));
      } catch (error) {
        console.error("Error with receiving data:", error);
        getStoredData();
      }
    };

    fetchData();
  }, []);

  return <div>
    <Box sx={userStyle}>
        <Typography>
            <PersonIcon />
            Total Users: {data}
        </Typography>
    </Box>
    </div>;
}

export default TotalUsers;
