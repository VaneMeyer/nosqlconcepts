import React, { useEffect, useState, useRef } from "react";
import { postTimerData, getTimerData } from "../../api/mainApi"; 
import Button from "@mui/material/Button";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { IconButton } from "@mui/material";


const OptTimer = ({ taskNumber, area_id, username, onTimeUpdate, run }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(run);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const savedTime = await getTimerData(username, area_id, taskNumber);
        if (savedTime) {
          setTime(savedTime[0].processing_time);
          
        }
      } catch (error) {
        console.error("Error fetching saved time:", error);
      }
    };

    fetchTime();  

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [taskNumber, area_id, username]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleSave = async () => {
    try {
      await postTimerData(username, area_id, taskNumber, time);
      alert("Time saved successfully");
    } catch (error) {
      console.error("Error saving time:", error);
      alert("Failed to save time");
    }
  };

  useEffect(() => {
    onTimeUpdate(time);
  }, [time, onTimeUpdate]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div>
      <h3>Timer: {formatTime(time)}</h3>
      <IconButton onClick={handleStartStop}>
        {isRunning ? <PauseIcon color="secondary"/> : <PlayArrowIcon color="secondary"/>}
      </IconButton>
     {/*  <Button onClick={handleSave}>
        Save Time 
      </Button> */}
    </div>
  );
};

export default OptTimer;
