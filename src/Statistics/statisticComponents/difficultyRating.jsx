import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Paper, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import PersonIcon from "@mui/icons-material/Person";
import MoodIcon from "@mui/icons-material/Mood";
import MoodBadIcon from "@mui/icons-material/MoodBad";

function DifficultyRating() {
  const [easyTask, setEasyTask] = useState(0);
  const [difficultTask, setDifficultTask] = useState(0);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const userStyle = {
    margin: "20px",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: colors.blueAccent[400],
    color: "white",
    textAlign: "center",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/difficulty-rating-easy");
        setEasyTask(response.data[0]);
      } catch (error) {
        console.error("Error with receiving data:", error);
      }
      try {
        const response2 = await axios.get("/difficulty-rating-difficult");
        setDifficultTask(response2.data[0]);
      } catch (error) {
        console.error("Error with receiving data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Box sx={userStyle}>
        <Typography>
          <MoodIcon />
          Most easy rated task: {`Task ${easyTask.easiest_task} (${easyTask.task_area})`}
        </Typography>
        <Typography>
          <MoodBadIcon />
          Most difficult rated task: {`Task ${difficultTask.most_difficult_task} (${difficultTask.task_area})`}
        </Typography>
      </Box>
    </div>
  );
}

export default DifficultyRating;
