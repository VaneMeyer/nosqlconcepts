import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";

const OptTimer = ({ run, taskNumber, title, username, onDataFromChild }) => {
  //################# Style Settings ######################################################

  // Styles for mui components
  let muiButtonStyle = {
    backgroundColor:  "#d993df",
    color: "black",
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


/* import React, { useState, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../theme";
import TimerIcon from "@mui/icons-material/Timer";
import axios from "axios";

const OptTimer = ({
  run,
  taskNumber,
  title,
  username,
  onDataFromChild,
  taskarea,
}) => {
  //################# Style Settings ######################################################
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Styles for mui components
  let muiButtonStyle = {
    backgroundColor: colors.custom01[600] ,
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
  const getDataFromDB = (tasknumber) => {
    let modifiedUser = username.replace(/"/g, "");
    axios
      .post("/getTimeDataFromDB", { taskarea, modifiedUser, tasknumber })
      .then((response) => {
        const formDataObj =
          response.data.length !== 0 ? response.data[0].processing_time : 0;
        setTime(parseInt(formDataObj));
        
        
      })
      .catch((error) => {
        console.error("Failed to get data from db");
      });
  };

  const sendDataToDb = async () => {
    let queryText =
      `${localStorage.getItem(
        `${title.toLowerCase()}query_${username}_${taskNumber}`
      )}` || "";
    const dataToSend = {
      username: username.replace(/"/g, ""), //get rid of "" of the string
      statementId: taskNumber,
      taskAreaId: taskarea,
      queryText: queryText.replace(/'/g, "''"), // get from child component
      isExecutable:
        localStorage.getItem(
          `${title.toLowerCase()}isExecutable_${username}_${taskNumber}`
        ) || "No", // get from child component
      resultSize:
        localStorage.getItem(
          `${title.toLowerCase()}resultSize_${username}_${taskNumber}`
        ) || 0, // get from child component
      isCorrect:
        localStorage.getItem(
          `${title.toLowerCase()}isCorrect_${username}_${taskNumber}`
        ) || "0",
      partialSolution:
        localStorage.getItem(
          `${title.toLowerCase()}partialSolution_${username}_${taskNumber}`
        ) || "",
      difficultyLevel:
        localStorage.getItem(
          `${title.toLowerCase()}difficulty_${username}_${taskNumber}`
        ) || "0",
      processingTime: parseInt(
        localStorage.getItem(
          `${title.toLowerCase()}time_${username}_${taskNumber}`
        ) || 0
      ), // receivedTime
    };

    try {
      const response = await axios.post("/api/store-data", dataToSend);
      if (response.data.success) {
        console.log("Data stored successfully!");
      } else {
        console.error("Error occurred:", response.data.error);
      }
    } catch (error) {
      console.error("Server error:", error);
    }
  };

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
    sendDataToDb();
  };

  const continueTimer = () => {
    getDataFromDB(taskNumber);
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
    getDataFromDB(taskNumber);
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, taskNumber]); // dependency on isRunning and taskNumber

  //################# Frontend ######################################################
  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
        {<p>Timer: {formatTime(time)}</p>}

        {isRunning ? (
          <Button sx={muiButtonStyle} onClick={stopTimer}>
            Stop timer
            <TimerIcon />
          </Button>
        ) : (
          <Button sx={muiButtonStyle} onClick={continueTimer}>
            Continue timer
            <TimerIcon />
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default OptTimer;
 */