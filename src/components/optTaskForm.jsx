import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import pgDataModel from "../images/datamodel1-transp.png"
import mongoDataModel from "../images/datamodel4-transp.png"
import neoDataModel from "../images/datamodel3-transp.png"
import cassandraDataModel from "../images/datamodel2-transp.png"
import { pgTasks } from "../data/tasksData"
import { cassandraTasks } from "../data/tasksData"
import { neo4jTasks } from "../data/tasksData"
import { mongodbTasks } from "../data/tasksData"
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
} from "@mui/material"
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty"
import SaveIcon from "@mui/icons-material/Save"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import { tokens } from "../theme"
import OptQuery from "./optQuery"
import OptTimer from "./optTimer"
//import Example from "./example"
import DbStructureTable from "./DbStructureTable"
import DbStructureTablePostgres from "../scenes/db_structures/postgres_structure"
import DbStructureTableNeo4j from "../scenes/db_structures/neo4j_structure"
//import DbStructureTableGen from "./DbStructureTableGeneral"
const OptTaskForm = ({ title }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()

  // Styles for mui components
  let muiButtonStyle = {
    backgroundColor: colors.blueAccent[100],
    color: colors.grey[900],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
    margin: "10px",
  }
  let muiRadioStyle = {
    "&.Mui-checked": {
      color: colors.primary[100],
    },
  }
  let labelStyle = {
    color: colors.grey[100],
    fontSize: "16px",
  }

  const [task, setTask] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  //const [receivedTime, setReceivedTime] = useState(null);
  const [taskNumber, setTaskNumber] = useState(1)
  const [tasksArray, setTasksArray] = useState([])
  const [taskAreaId, setTaskAreaId] = useState(0)
  const [dataModel, setDataModel] = useState("")
  const [username, setUsername] = useState(localStorage.getItem("token"))
  const [formData, setFormData] = useState({
    partialSolution:
      localStorage.getItem(
        `${title.toLowerCase()}partialSolution_${username}_${taskNumber}`
      ) || "",
    isCorrect:
      localStorage.getItem(
        `${title.toLowerCase()}isCorrect_${username}_${taskNumber}`
      ) || "0",
    difficulty:
      localStorage.getItem(
        `${title.toLowerCase()}difficulty_${username}_${taskNumber}`
      ) || "0",
  })
  const [endPoint, setEndPoint] = useState("")
  const [dbTable, setDbTable] = useState(null)

  const saveAnswersToLocalStorage = () => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(
        `${title.toLowerCase()}partialSolution_${username}_${taskNumber}`,
        formData.partialSolution
      )
      localStorage.setItem(
        `${title.toLowerCase()}isCorrect_${username}_${taskNumber}`,
        formData.isCorrect
      )
      localStorage.setItem(
        `${title.toLowerCase()}difficulty_${username}_${taskNumber}`,
        formData.difficulty
      )
      //sendDataToDb();
    }
  }

  const sendDataToDb = async () => {
    let queryText =
      `${localStorage.getItem(
        `${title.toLowerCase()}query_${username}_${taskNumber}`
      )}` || ""
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
    }

    try {
      const response = await axios.post("/api/store-data", dataToSend)
      if (response.data.success) {
        console.log("Data stored successfully!")
      } else {
        console.error("Error occurred:", response.data.error)
      }
    } catch (error) {
      console.error("Server error:", error)
    }
  }

  useEffect(() => {
    let taskarray = []
    let datamodel = ""
    let taskAreaId = 0
    let endpoint = ""
    if (title === "PostgreSQL") {
      taskarray = pgTasks
      datamodel = pgDataModel
      taskAreaId = 1
      endpoint = "/getPostgreSQLStructure"
    }
    if (title === "Cassandra") {
      taskarray = cassandraTasks
      datamodel = cassandraDataModel
      taskAreaId = 2
      endpoint = "/getCassandraStructure"
    }
    if (title === "Neo4J") {
      taskarray = neo4jTasks
      datamodel = neoDataModel
      taskAreaId = 3
      endpoint = "/getNeo4JStructure"
    }
    if (title === "MongoDB") {
      taskarray = mongodbTasks
      datamodel = mongoDataModel
      taskAreaId = 4
      endpoint = "/getMongoStructure"
    }
    setTask(taskarray[taskNumber - 1])
    setTasksArray(taskarray)
    setTaskAreaId(taskAreaId)
    setDataModel(datamodel)
    setFormData({
      partialSolution:
        localStorage.getItem(
          `${title.toLowerCase()}partialSolution_${username}_${taskNumber}`
        ) || "",
      isCorrect:
        localStorage.getItem(
          `${title.toLowerCase()}isCorrect_${username}_${taskNumber}`
        ) || "0",
      difficulty:
        localStorage.getItem(
          `${title.toLowerCase()}difficulty_${username}_${taskNumber}`
        ) || "0",
    })
    setEndPoint(endpoint)
    fetchData()
  }, [title, taskNumber])

  const fetchData = async () => {
    let response = await axios.get(endPoint)
    response = response.data
    switch (taskAreaId) {
      case 1:
        setDbTable(
          DbStructureTablePostgres(response["tables"], response["columns"])
        )
        break
      case 3:
        setDbTable(
          DbStructureTableNeo4j(
            response["nodes"],
            response["relationships"],
            response["node_props"],
            response["rel_props"]
          )
        )
        break
      default:
        setDbTable(DbStructureTable(response["tables"], response["columns"]))
        break
    }
  }

  const startTimer = () => {
    setIsRunning(true)
    setHasStarted(true)

    localStorage.setItem(`${title.toLowerCase()}Status`, "STARTED")
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({ ...prev, [name]: value }))

    saveAnswersToLocalStorage()
  }

  // Function to handle navigation to the next task

  const updateTaskAndFormData = (newTaskNumber) => {
    let newTaskIndex = newTaskNumber - 1
    setTask(tasksArray[newTaskIndex])
    setTaskNumber(newTaskNumber)

    setFormData({
      partialSolution:
        localStorage.getItem(
          `${title.toLowerCase()}partialSolution_${username}_${newTaskNumber}`
        ) || "",
      isCorrect:
        localStorage.getItem(
          `${title.toLowerCase()}isCorrect_${username}_${newTaskNumber}`
        ) || "0",
      difficulty:
        localStorage.getItem(
          `${title.toLowerCase()}difficulty_${username}_${newTaskNumber}`
        ) || "0",
    })

    setIsRunning(false)
    setHasStarted(false)
    saveAnswersToLocalStorage()
    sendDataToDb()
  }

  const handleNextTask = () => {
    if (taskNumber === tasksArray.length) {
      alert("This is the last task")
    } else {
      updateTaskAndFormData(taskNumber + 1)
    }
  }

  const handlePrevTask = () => {
    if (taskNumber > 1) {
      updateTaskAndFormData(taskNumber - 1)
    }
  }

  const handleTaskChange = (event) => {
    const { value } = event.target

    updateTaskAndFormData(value)
  }

  const handleFinish = () => {
    saveAnswersToLocalStorage()
    sendDataToDb()

    localStorage.setItem(`${title.toLowerCase()}Status`, "FINISHED")
    const dataToSend = { title: title }
    navigate(`/download?title=${dataToSend.title}`)
  }
  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
        <Box>
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
          <p style={{ maxWidth: "1500px", fontSize: "26px" }}>{task}</p>
        </Box>
        <Box p={7}>
          {hasStarted ? (
            <form>
              <OptQuery taskNumber={taskNumber} title={title} />
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
                    username={username}
                    /* onDataFromChild={handleTimeFromChild} */
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
                  />
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
                and continue the timer if needed. Also make sure to save your
                data at the end of the page to update your statistics.
              </p>
            </div>
          )}
        </Box>
      </Box>
      {/*   <Box>
        <img
          src={dataModel}
          alt="Data model of enron database"
          width="100%"
          height="auto"
        />
      </Box>  */}
      &nbsp; &nbsp; &nbsp; &nbsp;
      <Box>
        <Button sx={muiButtonStyle} onClick={fetchData}>
          Update Structure
        </Button>
        <Grid container spacing={2}>
          {dbTable}
        </Grid>{" "}
        <Box>
          <img
            src={dataModel}
            alt="Data model of enron database"
            width="100%"
            height="auto"
          />
        </Box>
      </Box>
    </Box>
  )
}

export default OptTaskForm
//only store in DB version
/* import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [taskAreaId, setTaskAreaId] = useState(0);
  const [dataModel, setDataModel] = useState("");
  const [receivedQueryData, setReceivedQueryData] = useState({});
  const [receivedTime, setReceivedTime] = useState(0);

  const [formData, setFormData] = useState({
    partialSolution: "",
    isCorrect: "0",
    difficulty: "0",
  });
  const [username, setUsername] = useState(
    localStorage.getItem("token").replace(/"/g, "")
  );

  const sendDataToDb = async () => {
    const dataToSend = {
      username: username.replace(/"/g, ""), //get rid of "" of the string
      statementId: taskNumber,
      taskAreaId: taskAreaId,
      queryText: receivedQueryData.queryText.replace(/'/g, "''"), // get from child component
      isExecutable: receivedQueryData.isExecutable, // get from child component
      resultSize: receivedQueryData.resultSize, // get from child component
      isCorrect: formData.isCorrect || "0",
      partialSolution: formData.partialSolution || "",
      difficultyLevel: formData.difficulty,
      processingTime: parseInt(receivedTime), // get from child component timer
    };
    try {
      const response = await axios.post("/api/store-data", dataToSend);
      if (response.data.success) {
        console.log("Data stored successfully!");
      } else {
        console.error("Error occured:", response.data.error);
      }
    } catch (error) {
      console.error("Error server:", error);
    }
  };

  //get data from db
  const fetchData = async () => {
    try {
      const response = await axios.post("/getTaskFormData", {
        username,
        taskNumber,
        taskAreaId,
      });

      const firstData = response.data ? response.data[0] : {};

      const isCorrect = firstData.is_correct === true ? "Yes" : "No";
      const partialSolution = firstData.partial_solution || " ";
      const difficulty = firstData.difficulty_level || "No answer";

      setFormData({
        isCorrect,
        partialSolution,
        difficulty,
      });

      setReceivedQueryData((prev) => prev = {
        queryText: firstData.query_text || " ",
        isExecutable: firstData.is_executable || false,
        resultSize: firstData.result_size || 0,
      });
      setReceivedTime((prev) => prev = firstData.processing_time || 0);
    } catch (error) {
      console.error("Error with receiving data:", error);
    }
  };

  useEffect(() => {
    let taskarray = [];
    let datamodel = "";
    let taskAreaId = 0;
    if (title === "PostgreSQL") {
      taskarray = pgTasks;
      datamodel = pgDataModel;
      taskAreaId = 1;
    }
    if (title === "Cassandra") {
      taskarray = cassandraTasks;
      datamodel = cassandraDataModel;
      taskAreaId = 2;
    }
    if (title === "Neo4J") {
      taskarray = neo4jTasks;
      datamodel = neoDataModel;
      taskAreaId = 3;
    }
    if (title === "MongoDB") {
      taskarray = mongodbTasks;
      datamodel = mongoDataModel;
      taskAreaId = 4;
    }
    setTask(taskarray[taskNumber - 1]);
    setTasksArray(taskarray);
    setTaskAreaId(taskAreaId);
    setDataModel(datamodel);
    
    fetchData();
  }, [title, taskNumber]);

  const startTimer = () => {
    setIsRunning(true);
    setHasStarted(true);
    fetchData();

    localStorage.setItem(`${title.toLowerCase()}Status`, "STARTED");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle navigation to the next task

  const updateTaskAndFormData = (newTaskNumber) => {
    sendDataToDb();
    let newTaskIndex = newTaskNumber - 1;
    setTask(tasksArray[newTaskIndex]);
    setTaskNumber(newTaskNumber);

    setIsRunning(false);
    setHasStarted(false);
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
  };

  const handleFinish = () => {
    sendDataToDb();

    localStorage.setItem(`${title.toLowerCase()}Status`, "FINISHED");
    const dataToSend = { title: title };
    navigate(`/download?title=${dataToSend.title}`);
  };

  const handleReceivedData = (data) => {
    setReceivedQueryData(data);
    sendDataToDb();
  };

  const handleReceivedTime = (data) => {
    setReceivedTime((prev) => (prev = data.timeToParent));
    sendDataToDb();
  };

  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
        <Box>
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
          <p style={{ maxWidth: "1500px", fontSize: "26px" }}>{task}</p>
        </Box>
        <Box p={7}>
          {hasStarted ? (
            <form>
              <OptQuery
                taskNumber={taskNumber}
                title={title}
                queryText={receivedQueryData.queryText}
                isExecutable={receivedQueryData.isExecutable}
                resultSize={receivedQueryData.resultSize}
                isCorrect={formData.isCorrect}
                onGetData={(data) => handleReceivedData(data)}
              />
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
                value={formData.isCorrect}
                onChange={handleChange}
              >
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
                    taskAreaId={taskAreaId}
                    username={username}
                    title={title}
                    timeToParent={receivedTime}
                    onGetData={(data) => handleReceivedTime(data)}
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
                    taskAreaId={taskAreaId}
                    username={username}
                    title={title}
                    timeToParent={receivedTime}
                    onGetData={(data) => handleReceivedTime(data)}
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
 */
