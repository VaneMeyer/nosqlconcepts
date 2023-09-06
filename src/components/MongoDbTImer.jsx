import React, { useState, useEffect, useRef } from "react"
import { Box, Button, useTheme } from "@mui/material"

import { tokens } from "../theme"

const Timer = ({
  run,
  mongodbTime,
  mongodbTimeData,
  setmongodbTime,
  setmongodbTimeData,
}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  /* Styles for mui components */
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
    if (mongodbTimeData > mongodbTime) {
      interval = setInterval(() => {
        setmongodbTimeData((time) => time + 1)
      }, 1000)
    } else if (mongodbTime >= mongodbTimeData) {
      interval = setInterval(() => {
        setmongodbTime((time) => time + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    if (mongodbTime > 7200 || mongodbTimeData > 7200) {
      // Maximum time of 2 hours has been crossed
      alert("Maximum time limit of 2 hours has been reached")
      setIsRunning(false)
      setmongodbTime(0)
      setmongodbTimeData(0)
    }
    return () => clearInterval(interval)
  }, [isRunning, mongodbTime, mongodbTimeData]) // dependency on isRunning and time
  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
        <p>
          Time:{" "}
          {mongodbTimeData
            ? formatTime(mongodbTimeData)
            : formatTime(mongodbTime)}
        </p>
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

export default Timer
