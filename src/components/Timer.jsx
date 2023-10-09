import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  useTheme,
} from "@mui/material";

import { tokens } from "../theme";


const Timer = ({ run, onTimerFromChild }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  // Styles for mui components 
  let muiButtonStyle = {
    backgroundColor: colors.blueAccent[700],
    color: colors.grey[100],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
  };
 
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(run);
  
 
 
  const stopTimer = () => {
    setIsRunning(false);
    console.log("time from timer component: ", time);
    sendDataToParent();
  };

  const continueTimer = () => {
    setIsRunning(true);
  }

  const sendDataToParent = () => {
    // Hier senden wir Daten an die Elternkomponente
    onTimerFromChild(time);
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
    if (time > 7200) {
      // Maximum time of 2 hours has been crossed
      alert("Maximum time limit of 2 hours has been reached");
      
      setIsRunning(false);
      setTime(0);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, time]); // dependency on isRunning and time
 
  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
      
       
        
            <p>Time: {formatTime(time)}</p>
            {isRunning && (<Button sx={muiButtonStyle} onClick={stopTimer}>
              Stop time
            </Button>)}
            {!isRunning &&(<Button sx={muiButtonStyle} onClick={continueTimer}>
              Continue 
            </Button>)}
            
            
          
        
        
      </Box>
      
    </Box>
  );
};

export default Timer;
 

/* import React, { useState, useEffect, useRef } from "react"
import { Box, Button, useTheme } from "@mui/material"

import { tokens } from "../theme"

const Timer = ({ run, time, timeData, setTime, setTimeData }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  // Styles for mui components 
  let muiButtonStyle = {
    backgroundColor: colors.blueAccent[700],
    color: colors.grey[100],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
  }
  const [isRunning, setIsRunning] = useState(run)
  const stopTimer = () => {
    setIsRunning(false)
  }
  const continueTimer = () => {
    setIsRunning(true)
  }
  // Function to format time in HH:MM:SS format
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600)
    const minutes = Math.floor((timeInSeconds - hours * 3600) / 60)
    const seconds = timeInSeconds - hours * 3600 - minutes * 60
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }
  // time count in seconds
  useEffect(() => {
    let interval
    if (timeData > time) {
      interval = setInterval(() => {
        setTimeData((time) => time + 1)
      }, 1000)
    } else if (time >= timeData) {
      interval = setInterval(() => {
        setTime((time) => time + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    if (time > 7200 || timeData > 7200) {
      // Maximum time of 2 hours has been crossed
      alert("Maximum time limit of 2 hours has been reached")
      setIsRunning(false)
      setTime(0)
      setTimeData(0)
    }
    return () => clearInterval(interval)
  }, [isRunning, time, timeData]) // dependency on isRunning and time
  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
        <p>Time: {timeData ? formatTime(timeData) : formatTime(time)}</p>
        {isRunning && (
          <Button sx={muiButtonStyle} onClick={stopTimer}>
            Stop time
          </Button>
        )}
        {!isRunning && (
          <Button sx={muiButtonStyle} onClick={continueTimer}>
            Continue
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default Timer */