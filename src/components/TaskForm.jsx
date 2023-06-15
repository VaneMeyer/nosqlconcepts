import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  useTheme,
} from "@mui/material";

import { tokens } from "../theme";

const TaskForm = ({ title, taskdescr }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  /* Styles for mui components */
  let muiButtonStyle = {
    backgroundColor: colors.blueAccent[700],
    color: colors.grey[100],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
  };
  let muiRadioStyle = {
    
        "&.Mui-checked": {
          color: colors.primary[100],
        },
      
  }
  //const [taskDescription, setTaskDescription] = useState('');
  const [task, setTask] = useState("");
  const [solution, setSolution] = useState("");
  const [difficulty, setDifficulty] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [taskNumber, setTaskNumber] = useState(1);
  const [isExecutable, setIsExecutable] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [resultSize, setResultSize] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    // TODO fetch the task from a database

    //this is the first task

    setTask(taskdescr);
    //setTaskDescription('');
  }, []);

  const startTimer = () => {
    setIsRunning(true);
    setHasStarted(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO send data to database
    console.log({
      task: task,
      solution: solution,
      difficulty: difficulty,
      time: time,
      isExecutable: isExecutable,
      isCorrect: isCorrect,
      resultSize: resultSize,
      comment: comment,
    });
    alert("Submitted!");
  };

  // Function to handle navigation to the next task
  const handleNextTask = () => {
    // TODO fetch the next task from a database
    // and set it to the state variable "task"
    if (taskNumber === 4) {
      // This is the last task
      alert("This is the last task");
    } else {
      setTask(`Solve this math problem: ${taskNumber} + ${taskNumber} = ?`);
      setTaskNumber(taskNumber + 1);
      setSolution("");
      setDifficulty(0);
      setTime(0);
      setIsExecutable(false);
      setIsCorrect(false);
      setResultSize(0);
      setComment("");
      setIsRunning(false);
      setHasStarted(false);
    }
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
      setHasStarted(false);
      setIsRunning(false);
      setTime(0);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]); // dependency on isRunning and time

  return (
    <Box m="20px">
      <h1>Task {taskNumber}</h1>
      <p>{task}</p>
      {hasStarted ? (
        <form>
          <p>Time: {formatTime(time)}</p>
          <InputLabel id="query-input-label">Your query:</InputLabel>
          <TextField
            id="query-input-label"
            fullWidth
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
          />
          <InputLabel id="partial-solution-label">
            Your partial solution:
          </InputLabel>
          <TextField
            id="partial-solution-label"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <InputLabel id="isexecuteable-select-label">
            Is the query executable?
          </InputLabel>
          <Select
            fullWidth
            id="isexecuteable-select-label"
            value={isExecutable}
            onChange={(e) => setIsExecutable(e.target.value)}
          >
            <MenuItem value={0}>No</MenuItem>
            <MenuItem value={1}>Yes</MenuItem>
          </Select>
          <InputLabel id="iscorrect-select-label">
            Does the query return correct results?
          </InputLabel>
          <Select
            id="iscorrect-select-label"
            fullWidth
            value={isCorrect}
            onChange={(e) => setIsCorrect(e.target.value)}
          >
            <MenuItem value={0}>No</MenuItem>
            <MenuItem value={1}>Yes</MenuItem>
          </Select>
          <InputLabel id="resultsize-label">Result size:</InputLabel>
          <TextField
            id="resultsize-label"
            fullWidth
            type="number"
            value={resultSize}
            onChange={(e) => setResultSize(e.target.value)}
          ></TextField>
          <InputLabel id="difficulty-level-radiogroup">
            Difficulty level:
          </InputLabel>
          <RadioGroup
            row
            id="difficulty-level-radiogroup"
            defaultValue={0}
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <FormControlLabel
              value={0}
              control={
                <Radio
                  sx={muiRadioStyle}
                />
              }
              label="None"
            />
            <FormControlLabel
              value={1}
              control={
                <Radio
                  sx={muiRadioStyle}
                />
              }
              label="Very easy"
            />
            <FormControlLabel
              value={2}
              control={
                <Radio
                  sx={muiRadioStyle}
                />
              }
              label="Easy"
            />
            <FormControlLabel
              value={3}
              control={
                <Radio
                  sx={muiRadioStyle}
                />
              }
              label="Normal"
            />
            <FormControlLabel
              value={4}
              control={
                <Radio
                  sx={muiRadioStyle}
                />
              }
              label="Difficult"
            />
            <FormControlLabel
              value={5}
              control={
                <Radio
                  sx={muiRadioStyle}
                />
              }
              label="Very difficult"
            />
          </RadioGroup>
          <br />
          <br />
          {taskNumber === 4 ? (
            <Button
              sx={muiButtonStyle}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          ) : (
            <Button
              sx={muiButtonStyle}
              onClick={handleNextTask}
            >
              Next Task
            </Button>
          )}{" "}
          <Button
            sx={muiButtonStyle}
            onClick={stopTimer}
          >
            Stop time
          </Button>
        </form>
      ) : (
        <Button sx={muiButtonStyle} onClick={startTimer}>
          Start task
        </Button>
      )}
    </Box>
  );
};

export default TaskForm;
