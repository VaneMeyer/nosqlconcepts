import React, { useState, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../theme";
import TimerIcon from "@mui/icons-material/Timer";

const OptTimer = ({ run, taskNumber, title, username, onDataFromChild }) => {
  //################# Style Settings ######################################################
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Styles for mui components
  let muiButtonStyle = {
    backgroundColor: colors.custom01[600] /* "#d993df" */,
    color: colors.grey[100],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
  };
  //################# State Variables ######################################################
  const [time, setTime] = useState(
    parseInt(
      localStorage.getItem(
        `${title.toLowerCase()}time_${username}_${taskNumber}`
      ) || 0
    )
  );

  const [isRunning, setIsRunning] = useState(run);

  //################# Functions ######################################################
  const saveToLocalStorage = () => {
    localStorage.setItem(
      `${title.toLowerCase()}time_${username}_${taskNumber}`,
      time
    );
  };

  const sendDataToParent = () => {
    onDataFromChild(time);
  };

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

  //################# useEffect Function ######################################################

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    saveToLocalStorage();
    // sendDataToParent();
    return () => clearInterval(interval);
  }, [isRunning, time]); // dependency on isRunning and time

  //################# Frontend ######################################################
  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
        {<p>Timer: {formatTime(time)}</p>}

        {isRunning && (
          <Button sx={muiButtonStyle} onClick={stopTimer}>
            Stop timer
            <TimerIcon></TimerIcon>
          </Button>
        )}
        {!isRunning && (
          <Button sx={muiButtonStyle} onClick={continueTimer}>
            Continue timer
            <TimerIcon></TimerIcon>
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default OptTimer;
