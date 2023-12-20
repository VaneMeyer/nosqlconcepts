import React, { useState, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../theme";

const OptTimer = ({ run, taskNumber, title, onDataFromChild }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Styles for mui components
  let muiButtonStyle = {
    backgroundColor: "#d993df",
    color: colors.grey[100],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
  };

  const [time, setTime] = useState(
    parseInt(
      localStorage.getItem(`${title.toLowerCase()}time${taskNumber}`) || 0
    )
  );

  const [isRunning, setIsRunning] = useState(run);

  const saveToLocalStorage = () => {
    localStorage.setItem(`${title.toLowerCase()}time${taskNumber}`, time);
  };

  const sendDataToParent = () => {
  
    onDataFromChild(time);
  }

  const stopTimer = () => {
    setIsRunning(false);

    saveToLocalStorage();
   // sendDataToParent();
  };

  const continueTimer = () => {
    setIsRunning(true);
  };

  // Function to format time in HH:MM:SS format
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
    const seconds = timeInSeconds - hours * 3600 - minutes * 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // time count in seconds
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    /* if (time > 7200) {
      // Maximum time of 2 hours has been crossed
      alert("Maximum time limit of 2 hours has been reached");

      setIsRunning(false);
      setTime(0);
    } */
    saveToLocalStorage();
   // sendDataToParent();
    return () => clearInterval(interval);
  }, [isRunning, time]); // dependency on isRunning and time

  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
        {<p>Timer: {formatTime(time)}</p>}

        {isRunning && (
          <Button sx={muiButtonStyle} onClick={stopTimer}>
            Stop timer
          </Button>
        )}
        {!isRunning && (
          <Button sx={muiButtonStyle} onClick={continueTimer}>
            Continue timer
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default OptTimer;
