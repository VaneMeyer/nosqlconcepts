import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pgDataModel from "../images/datamodel1-transp.png";
import mongoDataModel from "../images/datamodel4-transp.png";
import neoDataModel from "../images/datamodel3-transp.png";
import cassandraDataModel from "../images/datamodel2-transp.png";
import { pgTasks } from "../data/tasksData";
import { cassandraTasks } from "../data/tasksData";
import { neo4jTasks } from "../data/tasksData";
import { mongodbTasks } from "../data/tasksData";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  useTheme,
} from "@mui/material";

import { tokens } from "../theme";
import OptQuery from "./optQuery";
import OptTimer from "./optTimer";

const OptTaskForm = ({ title }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  // Styles for mui components
  let muiButtonStyle = {
    backgroundColor: colors.blueAccent[100],
    color: colors.grey[900],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
    margin: "10px",
  };
  let muiRadioStyle = {
    "&.Mui-checked": {
      color: colors.primary[100],
    },
  };
  let labelStyle = {
    color: colors.grey[100],
    fontSize: "16px",
  };

  const [task, setTask] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [taskNumber, setTaskNumber] = useState(1);
  const [tasksArray, setTasksArray] = useState([]);
  const [dataModel, setDataModel] = useState("");
  const [formData, setFormData] = useState({
    partialSolution:
      localStorage.getItem(
        `${title.toLowerCase()}partialSolution${taskNumber}`
      ) || "",
    isCorrect:
      localStorage.getItem(`${title.toLowerCase()}isCorrect${taskNumber}`) ||
      "0",
    difficulty:
      localStorage.getItem(`${title.toLowerCase()}difficulty${taskNumber}`) ||
      "0",
  });

  const saveAnswersToLocalStorage = () => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(
        `${title.toLowerCase()}partialSolution${taskNumber}`,
        formData.partialSolution
      );
      localStorage.setItem(
        `${title.toLowerCase()}isCorrect${taskNumber}`,
        formData.isCorrect
      );
      localStorage.setItem(
        `${title.toLowerCase()}difficulty${taskNumber}`,
        formData.difficulty
      );
    }
  };

  useEffect(() => {
    let taskarray = [];
    let datamodel = "";
    if (title === "PostgreSQL") {
      taskarray = pgTasks;
      datamodel = pgDataModel;
    }
    if (title === "Cassandra") {
      taskarray = cassandraTasks;
      datamodel = cassandraDataModel;
    }
    if (title === "Neo4J") {
      taskarray = neo4jTasks;
      datamodel = neoDataModel;
    }
    if (title === "MongoDB") {
      taskarray = mongodbTasks;
      datamodel = mongoDataModel;
    }
    setTask(taskarray[taskNumber - 1]);
    setTasksArray(taskarray);
    setDataModel(datamodel);
    setFormData({
      partialSolution:
        localStorage.getItem(
          `${title.toLowerCase()}partialSolution${taskNumber}`
        ) || "",
      isCorrect:
        localStorage.getItem(`${title.toLowerCase()}isCorrect${taskNumber}`) ||
        "0",
      difficulty:
        localStorage.getItem(`${title.toLowerCase()}difficulty${taskNumber}`) ||
        "0",
    });
  }, [title, taskNumber]);

  const startTimer = () => {
    setIsRunning(true);
    setHasStarted(true);

    localStorage.setItem(`${title.toLowerCase()}Status`, "STARTED");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    saveAnswersToLocalStorage();
  };

  // Function to handle navigation to the next task

  const updateTaskAndFormData = (newTaskNumber) => {
    let newTaskIndex = newTaskNumber - 1;
    setTask(tasksArray[newTaskIndex]);
    setTaskNumber(newTaskNumber);

    setFormData({
      partialSolution:
        localStorage.getItem(
          `${title.toLowerCase()}partialSolution${newTaskNumber}`
        ) || "",
      isCorrect:
        localStorage.getItem(
          `${title.toLowerCase()}isCorrect${newTaskNumber}`
        ) || "0",
      difficulty:
        localStorage.getItem(
          `${title.toLowerCase()}difficulty${newTaskNumber}`
        ) || "0",
    });

    setIsRunning(false);
    setHasStarted(false);
    saveAnswersToLocalStorage();
  };

  const handleNextTask = () => {
    if (taskNumber === tasksArray.length) {
      alert("This is the last task");
    } else {
      updateTaskAndFormData(taskNumber + 1);
    }
  };

  const handlePrevTask = () => {
    if (taskNumber > 1) {
      updateTaskAndFormData(taskNumber - 1);
    }
  };

  const handleTaskChange = (event) => {
    const { value } = event.target;
    updateTaskAndFormData(value);
  }

  const handleFinish = () => {
    saveAnswersToLocalStorage();

    localStorage.setItem(`${title.toLowerCase()}Status`, "FINISHED");
    const dataToSend = { title: title };
    navigate(`/download?title=${dataToSend.title}`);
  };
  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
      <Box>
          {/* Füge die Dropdown-Liste für die Aufgaben hinzu */}
          <InputLabel id="task-number-label" style={labelStyle}>
            Jump to task:
          </InputLabel>
          <TextField
            select
            name="taskNumber"
            id="task-number-label"
            fullWidth
            value={taskNumber}
            onChange={handleTaskChange}
          >
            {tasksArray.map((task, index) => (
              <MenuItem key={index} value={index + 1}>
                Task {index + 1}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box>
          <p style={{ maxWidth:"1500px", fontSize: "26px" }}>{task}</p>
        </Box>
        <Box p={7}>
          {hasStarted ? (
            <form>
              <OptQuery taskNumber={taskNumber} title={title} />
              <hr></hr>
              <InputLabel id="partial-solution-label" style={labelStyle}>
                Your partial solution:
              </InputLabel>
              <TextField
                name="partialSolution"
                id="partial-solution-label"
                fullWidth
                value={formData.partialSolution}
                onChange={handleChange}
              />
              <hr></hr>
              <InputLabel id="isCorrect-radiogroup" style={labelStyle}>
                Does your query return correct results?
              </InputLabel>
              <RadioGroup
                name="isCorrect"
                row
                id="isCorrect-radiogroup"
                /* defaultValue={"I don't know"} */
                value={formData.isCorrect}
                onChange={handleChange}
              >
                <FormControlLabel
                  value={"I don't know"}
                  control={<Radio sx={muiRadioStyle} />}
                  label="I don't know"
                />
                <FormControlLabel
                  value={"Yes"}
                  control={<Radio sx={muiRadioStyle} />}
                  label="Yes"
                />
                <FormControlLabel
                  value={"No"}
                  control={<Radio sx={muiRadioStyle} />}
                  label="No"
                />
              </RadioGroup>
              <hr></hr>
              <InputLabel id="difficulty-level-radiogroup" style={labelStyle}>
                How difficult was this task for you?
              </InputLabel>
              <RadioGroup
                name="difficulty"
                row
                id="difficulty-level-radiogroup"
                defaultValue={"No answer"}
                value={formData.difficulty}
                onChange={handleChange}
              >
                <FormControlLabel
                  value={"No answer"}
                  control={<Radio sx={muiRadioStyle} />}
                  label="No answer"
                />
                <FormControlLabel
                  value={"Very easy"}
                  control={<Radio sx={muiRadioStyle} />}
                  label="Very easy"
                />
                <FormControlLabel
                  value={"Easy"}
                  control={<Radio sx={muiRadioStyle} />}
                  label="Easy"
                />
                <FormControlLabel
                  value={"Normal"}
                  control={<Radio sx={muiRadioStyle} />}
                  label="Normal"
                />
                <FormControlLabel
                  value={"Difficult"}
                  control={<Radio sx={muiRadioStyle} />}
                  label="Difficult"
                />
                <FormControlLabel
                  value={"Very difficult"}
                  control={<Radio sx={muiRadioStyle} />}
                  label="Very difficult"
                />
              </RadioGroup>
              <br />
              <br />
              {taskNumber === tasksArray.length ? (
                <div>
                  {" "}
                  <OptTimer
                    run={isRunning}
                    taskNumber={taskNumber}
                    title={title}
                  />
                  {taskNumber !== 1 && (
                    <Button sx={muiButtonStyle} onClick={handlePrevTask}>
                      Previous Task
                    </Button>
                  )}{" "}
                  <Button sx={muiButtonStyle} onClick={handleFinish}>
                    finish
                  </Button>
                </div>
              ) : (
                <div>
                  <OptTimer
                    run={isRunning}
                    taskNumber={taskNumber}
                    title={title}
                  />
                  {taskNumber !== 1 && (
                    <Button sx={muiButtonStyle} onClick={handlePrevTask}>
                      Previous Task
                    </Button>
                  )}

                  <Button sx={muiButtonStyle} onClick={handleNextTask}>
                    Next Task
                  </Button>
                </div>
              )}{" "}
            </form>
          ) : (
            <div>
              <Button sx={muiButtonStyle} onClick={startTimer}>
                Start task
              </Button>
              <p>{""}</p>
              <p
                style={{
                  fontWeight: "bold",
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: `${colors.redAccent[700]}`,
                  color: `${colors.primary[100]}`,
                }}
              >
                Note: A timer will start, when you start the task. You can stop
                and continue the timer if needed.
              </p>
            </div>
          )}
        </Box>
      </Box>

      <Box>
        <img
          src={dataModel}
          alt="Data model of enron database"
          width="100%"
          height="auto"
        />
      </Box>
    </Box>
  );
};

export default OptTaskForm;
