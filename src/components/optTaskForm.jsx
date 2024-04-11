import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  Grid,
} from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { tokens } from "../theme";
import OptQuery from "./optQuery";
import OptTimer from "./optTimer";
import DbStructureTable from "./DbStructureTable";
import DbStructureTablePostgres from "../scenes/db_structures/postgres_structure";
import DbStructureTableNeo4j from "../scenes/db_structures/neo4j_structure";
import ImportantMsg from "./importantMsg";

const OptTaskForm = ({ title, taskarray, taskarea, datamodel, endpoint }) => {
  //################# Style Settings ######################################################
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  // Styles for mui components
  let muiButtonStyle = {
    backgroundColor: colors.custom01[100],
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
  //################# State Variables ######################################################
  const [task, setTask] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [receivedTime, setReceivedTime] = useState(null);
  const [taskNumber, setTaskNumber] = useState(1);
  const [tasksArray, setTasksArray] = useState([]);
  const [taskAreaId, setTaskAreaId] = useState(0);
  const [dataModel, setDataModel] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("token"));
  const [formData, setFormData] = useState({
    partialSolution: "test state variable",
    isCorrect: "0",
    difficulty: "0",
  });

  const [dbTable, setDbTable] = useState(null);
  const [showDbStructure, setShowDbStructure] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  //################# Functions for Data Storage and other ######################################################

  const getDataFromDB = (tasknumber) => {
    let modifiedUser = username.replace(/"/g, "");
    axios
      .post("/getDataFromDB", { taskAreaId, modifiedUser, tasknumber })
      .then((response) => {
        let formDataObj = {};
        if (response.data.length !== 0) {
          formDataObj = {
            partialSolution: response.data[0].partialsolution || "",
            isCorrect: response.data[0].iscorrect || "0",
            difficulty: response.data[0].difficulty || "0",
          };
        } else {
          formDataObj = {
            partialSolution: "",
            isCorrect: "I don't know",
            difficulty: "No answer",
          };
        }
        setFormData(formDataObj);
      })
      .catch((error) => {
        console.error("Failed to get data from db");
      });
  };

  const saveAnswersToLocalStorage = () => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(
        `${title.toLowerCase()}partialSolution_${username}_${taskNumber}`,
        formData.partialSolution
      );
      localStorage.setItem(
        `${title.toLowerCase()}isCorrect_${username}_${taskNumber}`,
        formData.isCorrect
      );
      localStorage.setItem(
        `${title.toLowerCase()}difficulty_${username}_${taskNumber}`,
        formData.difficulty
      );
    }
  };

  const sendDataToDb = async () => {
    if (hasStarted) {
      let queryText =
        `${localStorage.getItem(
          `${title.toLowerCase()}query_${username}_${taskNumber}`
        )}` || "";
      const dataToSend = {
        username: username.replace(/"/g, ""), //get rid of "" of the string
        statementId: taskNumber,
        taskAreaId: taskAreaId,
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
    }
  };
  const fetchData = async () => {
    try {
      let response = await axios.get(endpoint);
      response = response.data;
      let newDbTable;
      switch (taskAreaId) {
        case 1:
        case 5:
          newDbTable = DbStructureTablePostgres(
            response["tables"],
            response["columns"]
          );
          break;
        case 3:
        case 6:
          newDbTable = DbStructureTableNeo4j(
            response["nodes"],
            response["relationships"],
            response["node_props"],
            response["rel_props"]
          );
          break;
        default:
          newDbTable = DbStructureTable(
            response["tables"],
            response["columns"]
          );
          break;
      }
      setDbTable(newDbTable);
      setShowDbStructure((prevShowDbStructure) => !prevShowDbStructure);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const startTimer = () => {
    setIsRunning(true);
    setHasStarted(true);
    setIsSaved(false);
    localStorage.setItem(`${title.toLowerCase()}Status_${username}`, "STARTED");
  };

  //################# useEffect Function ######################################################
  useEffect(() => {
    setTask(taskarray[taskNumber - 1]);
    setTasksArray(taskarray);
    setTaskAreaId(taskarea);
    setDataModel(datamodel);
    getDataFromDB(taskNumber);
  }, [title, taskNumber, datamodel, taskarea, taskarray, username]);

  //################# handle Functions ######################################################
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    saveAnswersToLocalStorage();
    setIsSaved(false);
  };

  // Function to handle navigation to the next task

  const updateTaskAndFormData = (newTaskNumber) => {
    let newTaskIndex = newTaskNumber - 1;
    setTask(tasksArray[newTaskIndex]);
    setTaskNumber(newTaskNumber);

    getDataFromDB(newTaskNumber);
    setIsRunning(false);
    setHasStarted(false);
    saveAnswersToLocalStorage();
    sendDataToDb();
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
    setIsSaved(false);
    updateTaskAndFormData(value);
  };

  const handleFinish = () => {
    saveAnswersToLocalStorage();
    sendDataToDb();
    setIsSaved(false);
    localStorage.setItem(
      `${title.toLowerCase()}Status_${username}`,
      "FINISHED"
    );
    const dataToSend = { title: title };
    navigate(`/download?title=${dataToSend.title}`);
  };
  const handleDownload = () => {
    saveAnswersToLocalStorage();
    sendDataToDb();
    setIsSaved(false);
    const dataToSend = { title: title };
    navigate(`/download?title=${dataToSend.title}`);
  };

  const handleSave = () => {
    saveAnswersToLocalStorage();
    sendDataToDb();
    setIsSaved(true);
  };

  const handleTimeFromChild = (time) => {
    setReceivedTime(time);
  };
  //################# Arrays for select options of radio groups ######################################################
  const isCorrectOptions = ["I don't know", "Yes", "No"];
  const difficultyOptions = [
    "No answer",
    "Very easy",
    "Easy",
    "Normal",
    "Difficult",
    "Very difficult",
  ];
  //################# Frontend ######################################################
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "70%" }}>
        <Button onClick={handleDownload}>Go to download section</Button>
        <div>
          {" "}
          <p>Don't forget to save before leaving</p>
          <Button
            sx={{ backgroundColor: isSaved && `${colors.greenAccent[700]}` }}
            onClick={handleSave}
          >
            Save {isSaved && <CheckIcon style={{ marginLeft: "5px" }} />}{" "}
            <SaveIcon></SaveIcon>
          </Button>
        </div>

        <hr></hr>
        <Box>
          <Box>
            <Box>
              <InputLabel id="task-number-label" style={labelStyle}>
                Jump to task page (your current entries will be saved):
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
                    Page {index + 1}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <hr></hr>
            <Box>
              <Button sx={muiButtonStyle} onClick={fetchData}>
                Inspect Database Structure
              </Button>

              {showDbStructure && (
                <Grid container spacing={2}>
                  {dbTable.map((table, index) => (
                    <div key={index}>{table}</div>
                  ))}
                  <img
                    src={dataModel}
                    alt="Data model of enron database"
                    width="60%"
                    height="auto"
                  />
                </Grid>
              )}
            </Box>
            <hr></hr>
            <Box>
              <h1>{task.tasknumber}</h1>
              <h2>{task.topic}</h2>
              <h3>{task.subtasknumber}</h3>
              <h4 style={{ border: "1px solid black", borderRadius: 5 }}>
                {task.maxtime}
              </h4>
              <p style={{ maxWidth: "1500px", fontSize: "26px" }}>
                {task.description}
              </p>
              <hr></hr>
              <p>{task.hint}</p>
            </Box>
            <Box p={7}>
              {hasStarted ? (
                <form>
                  <OptQuery
                    taskNumber={taskNumber}
                    title={title}
                    taskarea={taskarea}
                  />
                  <hr></hr>
                  <InputLabel id="partial-solution-label" style={labelStyle}>
                    Your partial solution/further comments:
                  </InputLabel>
                  <TextField
                    name="partialSolution"
                    id="partial-solution-label"
                    fullWidth
                    multiline
                    rows={6}
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
                    {isCorrectOptions.map((item, index) => (
                      <FormControlLabel
                        key={index}
                        value={item}
                        control={<Radio sx={muiRadioStyle} />}
                        label={item}
                      />
                    ))}
                  </RadioGroup>
                  <hr></hr>
                  <InputLabel
                    id="difficulty-level-radiogroup"
                    style={labelStyle}
                  >
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
                    {difficultyOptions.map((item, index) => (
                      <FormControlLabel
                        key={index}
                        value={item}
                        control={<Radio sx={muiRadioStyle} />}
                        label={item}
                      />
                    ))}
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
                        username={username}
                        taskarea={taskAreaId}
                        onDataFromChild={handleTimeFromChild}
                      />
                      {taskNumber !== 1 && (
                        <Button sx={muiButtonStyle} onClick={handlePrevTask}>
                          <SaveIcon></SaveIcon> Save & Previous Task{" "}
                          <NavigateBeforeIcon></NavigateBeforeIcon>
                        </Button>
                      )}{" "}
                      <Button sx={muiButtonStyle} onClick={handleFinish}>
                        <SaveIcon></SaveIcon> save & finish{" "}
                        <NavigateNextIcon></NavigateNextIcon>
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <OptTimer
                        run={isRunning}
                        taskNumber={taskNumber}
                        title={title}
                        username={username}
                        taskarea={taskAreaId}
                        onDataFromChild={handleTimeFromChild}
                      />
                         <div>
                        {" "}
                        <p>Don't forget to save before leaving</p>
                        <Button
                          sx={{
                            backgroundColor:
                              isSaved && `${colors.greenAccent[700]}`,
                          }}
                          onClick={handleSave}
                        >
                          Save{" "}
                          {isSaved && (
                            <CheckIcon style={{ marginLeft: "5px" }} />
                          )}{" "}
                          <SaveIcon></SaveIcon>
                        </Button>
                      </div>
                      {taskNumber !== 1 && (
                        <Button sx={muiButtonStyle} onClick={handlePrevTask}>
                          <SaveIcon></SaveIcon> Save & Previous Task{" "}
                          <NavigateBeforeIcon></NavigateBeforeIcon>
                        </Button>
                      )}

                      <Button sx={muiButtonStyle} onClick={handleNextTask}>
                        <SaveIcon></SaveIcon> Save & Next Task{" "}
                        <NavigateNextIcon></NavigateNextIcon>
                      </Button>
                      <Button onClick={handleDownload}>
                        Go to download section
                      </Button>
                   
                    </div>
                  )}{" "}
                </form>
              ) : (
                <div>
                  <Button sx={muiButtonStyle} onClick={startTimer}>
                    Start task
                    <HourglassEmptyIcon></HourglassEmptyIcon>
                  </Button>
                  <p>{""}</p>

                  <ImportantMsg
                    message="Note: A timer will start, when you start the task. You can stop
                and continue the timer if needed. Also make sure to save your
                data at the end of the page to update your statistics."
                    type="info"
                  />
                </div>
              )}
            </Box>
          </Box>
          <Box>
            <p> </p>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default OptTaskForm;
