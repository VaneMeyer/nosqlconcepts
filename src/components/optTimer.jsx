import React, { useState, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../theme";
import TimerIcon from '@mui/icons-material/Timer';

const OptTimer = ({ run, taskNumber, title, username, onDataFromChild }) => {
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
      localStorage.getItem(`${title.toLowerCase()}time_${username}_${taskNumber}`) || 0
    )
  );
  
  const [isRunning, setIsRunning] = useState(run);
  
  const saveToLocalStorage = () => {
    localStorage.setItem(`${title.toLowerCase()}time_${username}_${taskNumber}`, time);
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
//only store in DB version
/* import React, { useState, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../theme";
import axios from "axios";

const OptTimer = ({
  run,
  taskNumber,
  taskAreaId,
  username,
  title,
  timeToParent,
  onGetData,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const muiButtonStyle = {
    backgroundColor: "#d993df",
    color: colors.grey[100],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
  };

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(run);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
    const seconds = timeInSeconds - hours * 3600 - minutes * 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const fetchData = async () => {
    try {
      const response = await axios.post("/getTaskFormData", {
        username,
        taskNumber,
        taskAreaId,
      });
      if (
        response.data &&
        response.data[0] &&
        response.data[0].processing_time
      ) {
        setTime(response.data[0].processing_time);
      }
      //sendDataBackToParent();
    } catch (error) {
      console.error("Error with receiving data:", error);
    }
  };

  const sendDataBackToParent = () => {
    onGetData({ timeToParent: time });
  };

  const stopTimer = () => {
    setIsRunning(false);
    sendDataBackToParent(); //send to db
    //console.log(`time from timerc: ${time}`)
  };
  const continueTimer = () => {
    setIsRunning(true);
    sendDataBackToParent();
  };

  useEffect(() => {
    fetchData();
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
    } else {
      clearInterval(interval);
      sendDataBackToParent();
    }
    //sendDataBackToParent();

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
        <p>Timer: {formatTime(time)}</p>
        {isRunning ? (
          <Button sx={muiButtonStyle} onClick={stopTimer}>
            Stop timer
          </Button>
        ) : (
          <Button sx={muiButtonStyle} onClick={continueTimer}>
            Continue timer
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default OptTimer;
 */