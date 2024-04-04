import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Paper, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import MoodIcon from "@mui/icons-material/Mood";
import MoodBadIcon from "@mui/icons-material/MoodBad";

function DifficultyRating() {
  //################# State Variables ######################################################
  const [easyTask, setEasyTask] = useState(0);
  const [difficultTask, setDifficultTask] = useState(0);
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
    const storedData = localStorage.getItem("easyTaskData");
    const storedData2 = localStorage.getItem("difficultTaskData");
    if (storedData) {
      setEasyTask(JSON.parse(storedData));
    }
    if (storedData2) {
      setDifficultTask(JSON.parse(storedData2));
    }
  };
  //################# useEffect Function ######################################################
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/difficulty-rating-easy");
        setEasyTask(response.data[0]);
        localStorage.setItem("easyTaskData", JSON.stringify(response.data[0]));
      } catch (error) {
        console.error("Error with receiving data:", error);
      }
      try {
        const response2 = await axios.get("/difficulty-rating-difficult");
        setDifficultTask(response2.data[0]);
        localStorage.setItem(
          "difficultTaskData",
          JSON.stringify(response2.data[0])
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
          <MoodIcon />
          Most easy rated task:{" "}
          {`Task ${easyTask.task_id} (${easyTask.task_area})`}
        </Typography>
        <Typography>
          <MoodBadIcon />
          Most difficult rated task:{" "}
          {`Task ${difficultTask.task_id} (${difficultTask.task_area})`}
        </Typography>
      </Box>
    </div>
  );
}

export default DifficultyRating;
