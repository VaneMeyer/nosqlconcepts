import React, { useState, useEffect, useMemo } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
} from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import DownloadIcon from "@mui/icons-material/Download";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-sql"; // SQL-Syntax-Highlighting
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import ImportantMsg from "../old_components/importantMsg";
/* import OptTimer from "../old_components/optTimer"; */
import OptTimer from "../components/timer";
import ResultGraph from "../old_components/ResultGraph";
import ResultTable from "../old_components/ResultTable";
import {
  fetchTaskFormData,
  fetchTasksData,
  postHistoryData,
  postTaskFormData,
} from "../api/mainApi";
import DbAccordion from "../components/dbAccordion";
import { sendToExecute } from "../api/queryApi";
import DownloadButton from "../components/downloadButton";
import { checkAuth } from "../api/loginApi";
import { CheckBox } from "@mui/icons-material";
import PgDatabaseSchema from "../components/pgSchema";
import CasDataModelTable from "../components/cassandraSchema";
import NeoGraphC from "../components/graph";
import MongoSchema from "../components/mongoSchema";
import forExport from "neo4j-driver";
const Item = styled(Paper)(({ theme }) => ({
  backgroundCoor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  overflow: "auto",
}));

function ExerciseSheet({ area_id, area_name, endpoint }) {
  const navigate = useNavigate();
  //########## received variables ################
  const [receivedTime, setReceivedTime] = useState(null); // receive from timer
  const [taskNumber, setTaskNumber] = useState(1); // receive from navigation
  //########## ################# ################
  const [username, setUsername] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [buttonState, setButtonState] = useState("idle");
  const [isSaved, setIsSaved] = useState(false);
  const [task, setTask] = useState("");
  const [tasksArray, setTasksArray] = useState([]);
  const [queryResult, setQueryResult] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    query_text: "",
    isExecutable: "No",
    resultSize: 0,
    partialSolution: "test state variable",
    isCorrect: "0",
    difficulty: "0",
    isFinished: false,
  });

  //###########
  useEffect(() => {
    const fetchUser = async () => {
      const user = await checkAuth();
      if (user) {
        setUsername(user.username);
      }
    };

    fetchUser();
  }, []);
  //#######################################################
  const handleF5 = (event) => {
    if (event.key === "F5") {
      event.preventDefault();
      /* executeQuery(); */
    }
  };

  const getTasks = async (areaId) => {
    try {
      const data = await fetchTasksData(areaId);
      setTasksArray(data);

      setTask(data[taskNumber - 1]);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again later.");
    }
  };

  const getDataFromDB = async (tasknumber, username) => {
    try {
      if (typeof tasknumber === "undefined" || tasknumber === null) {
        throw new Error("Task number is required");
      }

      const response = await fetchTaskFormData(area_id, username, tasknumber);

      let formDataObj = {};

      if (response.length !== 0) {
        formDataObj = {
          query_text: response[0].query_text.replace(/''/g, "'") || "",
          resultSize: response[0].result_size || "0",
          isExecutable: response[0].is_executable || "0",
          partialSolution: response[0].partial_solution || "",
          isCorrect: response[0].is_correct || "0",
          difficulty: response[0].difficulty_level || "0",
          isFinished: response[0].is_finished || false,
        };
      } else {
        formDataObj = {
          query_text: "",
          resultSize: 0,
          isExecutable: "No",
          partialSolution: "",
          isCorrect: "I don't know",
          difficulty: "No answer",
          isFinished: false,
        };
      }

      setFormData(formDataObj);
    } catch (error) {
      console.error("Failed to get data from db", error.message);
      setFormData({
        query_text: "Error occured",
        partialSolution: "Error occured",
      });
    }
  };

  const sendDataToDb = async () => {
    if (hasStarted) {
      const dataToSend = {
        username: username,
        statementId: taskNumber,
        taskAreaId: area_id,
        queryText: formData.query_text.replace(/'/g, "''") || "",
        isExecutable: formData.isExecutable || "No",
        resultSize: formData.resultSize || 0,
        isCorrect: formData.isCorrect || "0",
        partialSolution: formData.partialSolution || "",
        difficultyLevel: formData.difficulty || "0",
        processingTime: receivedTime,
        isFinished: formData.isFinished || false,
      };
      setButtonState("loading");
      try {
        const response = await postTaskFormData(dataToSend);
        if (response.success) {
          setButtonState("success");
        } else {
          console.error("Error occurred:", response.data.error);
          alert("Failed to save data");
          setButtonState("error");
        }
      } catch (error) {
        console.error("Server error:", error);
        alert("Failed to save data");
        setButtonState("error");
      }
    }
  };
  const sendDataToHistory = async () => {
    const dataToSend = {
      username: username,
      statementId: taskNumber,
      taskAreaId: area_id,
      queryText: formData.query_text.replace(/'/g, "''") || "",
      isExecutable: formData.isExecutable || "No",
      resultSize: formData.resultSize || 0,
      isCorrect: formData.isCorrect || "0",
    };

    try {
      const response = await postHistoryData(dataToSend);
      if (response) {
        console.log("Data stored successfully!");
      } else {
        console.error("Error occurred:", response.data.error);
        alert("Failed to save data");
      }
    } catch (error) {
      console.error("Server error:", error);
      alert("Failed to save data");
    }
  };
  const renderIcon = () => {
    if (buttonState === "loading") {
      return <CircularProgress size={24} color="inherit" />;
    }
    if (buttonState === "success") {
      return <CheckIcon />;
    }
    if (buttonState === "error") {
      return <ErrorIcon />;
    }
    return <SaveIcon />;
  };

  //#######################################################

  const handleTimerUpdate = (time) => {
    setReceivedTime(time);
  };

  const handleTaskUpdate = (
    task,
    taskNumber,
    queryResult,
    error,
    isRunning,
    hasStarted,
    buttonState
  ) => {
    setTask(tasksArray[task]);
    setTaskNumber(taskNumber);
    setQueryResult(queryResult);
    setError(error);
    getDataFromDB(taskNumber);
    setIsRunning(isRunning);
    setHasStarted(hasStarted);
    setButtonState(buttonState);
    sendDataToDb();
  };

  const handleAssessmentUpdate = (formData, buttonState) => {
    setFormData(formData);
    setButtonState(buttonState);
  };

  const handleFinish = () => {
    sendDataToDb();
    setIsSaved(false);

    const dataToSend = { title: area_name, areaId: area_id };
    navigate(`/download?title=${dataToSend.title}`);
  };
  const handleDownload = () => {
    sendDataToDb();
    setIsSaved(false);
    const dataToSend = { title: area_name, areaId: area_id };
    navigate(`/download?title=${dataToSend.title}&areaId=${dataToSend.areaId}`);
  };

  return (
    <Container>
      <h1>Exercise Sheet</h1>
      <h2>{area_name}</h2>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Item>
              <InformationText />
            </Item>
          </Grid>
          <Grid item xs={12} md={8}>
            <Item>
              <SaveAndDownload
                buttonState={buttonState}
                sendDataToDb={sendDataToDb}
                renderIcon={renderIcon}
                handleDownload={handleDownload}
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              <TaskNavigation
                tasksArray={tasksArray}
                taskUpdate={handleTaskUpdate}
                handleFinish={handleFinish}
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={8}>
            <Item>
              <TaskDescr task={task} />
              {/* placeholder queryeditor &run query button */}
              {/* &placeholder feedback messages */}
              {/* &placeholder Result incl resultsize*/}
              <hr></hr>
              <Assessment onAssessmentUpdate={handleAssessmentUpdate} />

              <OptTimer
                run={isRunning}
                taskNumber={taskNumber}
                area_id={area_id}
                username={username}
                onTimeUpdate={handleTimerUpdate}
              />
              <hr></hr>
              {/* placeholder save & download */}
              {/*  placeholder navigation */}
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              {" "}
              <DbAccordion endpoint={endpoint} />
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              <Schema endpoint={endpoint} />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default ExerciseSheet;

//##########################################################
const InformationText = () => {
  return (
    <Box>
      Information{" "}
      <ImportantMsg
        type="info"
        message="Please do not work longer than the specified time on a task! If you
          think that you will not be able to finish the task in the given maximum
          time, stop working on it 15 minutes before the end, and provide an
          explanation containing the following information: Whether you think that
          the task is solvable with the current system at all, and why? If you
          think that is solvable with more time: which approach, would you try out
          next?"
      />
    </Box>
  );
};
const Schema = ({ endpoint }) => {
  return (
    <Box
      sx={{
        maxHeight: "800px",
        overflowY: "auto",
      }}
    >
      {endpoint === "PostgreSQL" && <PgDatabaseSchema />}
      {endpoint === "Cassandra" && <CasDataModelTable />}
      {endpoint === "Neo4J" && <NeoGraphC />}
      {endpoint === "MongoDB" && <MongoSchema />}
    </Box>
  );
};

const TaskNavigation = ({ tasksArray, taskUpdate, handleFinish }) => {
  const [task, setTask] = useState("");
  const [taskNumber, setTaskNumber] = useState(1);
  const [queryResult, setQueryResult] = useState("");
  const [error, setError] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [buttonState, setButtonState] = useState("idle");
  useEffect(() => {
    taskUpdate(
      task,
      taskNumber,
      queryResult,
      error,
      isRunning,
      hasStarted,
      buttonState
    );
  }, [
    task,
    taskNumber,
    queryResult,
    error,
    isRunning,
    hasStarted,
    buttonState,
    taskUpdate,
  ]);

  const updateTaskAndFormData = (newTaskNumber) => {
    let newTaskIndex = newTaskNumber - 1;
    setTask(tasksArray[newTaskIndex]);
    setTaskNumber(newTaskNumber);
    setQueryResult("");
    setError("");
    /* getDataFromDB(newTaskNumber); */
    setIsRunning(false);
    setHasStarted(false);
    /* sendDataToDb(); */
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
  const startTimer = () => {
    setIsRunning(true);
    setHasStarted(true);
    /*  setIsSaved(false);*/
    setButtonState("Idle");
  };

  return (
    <Container>
      <Box>
        <InputLabel id="task-number-label">
          Jump to task (your current entries will be saved):
        </InputLabel>

        <TextField
          select
          name="taskNumber"
          id="task-number-label"
          fullWidth
          value={taskNumber}
          onChange={handleTaskChange}
          aria-labelledby="Jump to task"
        >
          {tasksArray.map((task, index) => (
            <MenuItem
              key={index}
              value={index + 1}
              aria-label={task.subtasknumber}
            >
              {task.subtasknumber}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box>
        {taskNumber === tasksArray.length ? (
          <div>
            {taskNumber !== 1 && (
              <Button
                aria-label="Save current entries and navigate to previous task"
                onClick={handlePrevTask}
              >
                Previous Task <NavigateBeforeIcon></NavigateBeforeIcon>
              </Button>
            )}{" "}
            <Button
              aria-label="Save current entries and navigate to download page"
              onClick={handleFinish}
            >
              finish <NavigateNextIcon></NavigateNextIcon>
            </Button>
          </div>
        ) : (
          <div>
            {taskNumber !== 1 && (
              <Button
                aria-label="Save current entries of the task and navigate to previous task"
                onClick={handlePrevTask}
              >
                Previous Task <NavigateBeforeIcon></NavigateBeforeIcon>
              </Button>
            )}

            <Button
              aria-label="Save current entries of this task and navigate to next task"
              onClick={handleNextTask}
            >
              Next Task <NavigateNextIcon></NavigateNextIcon>
            </Button>

            {/*  <DownloadButton formData={formData} taskNumber={taskNumber} areaId={area_id} area_name={area_name}/> */}
          </div>
        )}{" "}
        : (
        <div>
          <Button
            aria-label="Start the task to open all task fields"
            onClick={startTimer}
          >
            Start task
            <HourglassEmptyIcon></HourglassEmptyIcon>
          </Button>
          <p>{""}</p>

          <ImportantMsg
            message="Note: A timer will start, when you start the task. You can stop
                and continue the timer if needed. Also make sure to save your
                data."
            type="info"
          />
        </div>
        )
      </Box>
    </Container>
  );
};

const TaskDescr = ({ task }) => {
  return (
    <Box aria-labelledby="Task topic, description and maximum time to solve the task">
      <h2>{task.topic}</h2>
      <h3>{task.subtasknumber}</h3>
      <h4 style={{ border: "1px solid black", borderRadius: 5 }}>
        {task.maxtime}
      </h4>
      <p style={{ maxWidth: "1500px", fontSize: "26px" }}>{task.description}</p>
      <hr></hr>
      <p>{task.hint}</p>
    </Box>
  );
};

const SaveAndDownload = ({
  buttonState,
  sendDataToDb,
  renderIcon,
  handleDownload,
}) => {
  return (
    <Box>
      {" "}
      <Button
        variant="contained"
        color={
          buttonState === "success"
            ? "success"
            : buttonState === "error"
            ? "error"
            : "primary"
        }
        onClick={sendDataToDb}
        startIcon={renderIcon()}
        disabled={buttonState === "loading"}
      >
        {buttonState === "loading" ? "Saving..." : "Save Entries"}
      </Button>
      <Button
        aria-label="Button to go to download section"
        onClick={handleDownload}
      >
        Go to download section <DownloadIcon></DownloadIcon>
      </Button>{" "}
      {/*  <DownloadButton formData={formData} taskNumber={taskNumber} areaId={area_id} area_name={area_name}/> */}
    </Box>
  );
};

const Assessment = ({ onAssessmentUpdate }) => {
  const [formData, setFormData] = useState({
    query_text: "",
    isExecutable: "No",
    resultSize: 0,
    partialSolution: "test state variable",
    isCorrect: "0",
    difficulty: "0",
    isFinished: false,
  });
  const [buttonState, setButtonState] = useState("idle");

  useEffect(() => {
    onAssessmentUpdate(formData, buttonState);
  }, [formData, buttonState, onAssessmentUpdate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    /* setIsSaved(false); */
    setButtonState("Idle");
    if (name === "is-finished-checkbox") {
      setFormData((prev) => ({ ...prev, isFinished: event.target.checked }));
    }
  };

  const isCorrectOptions = ["I don't know", "Yes", "No"];
  const difficultyOptions = [
    "No answer",
    "Very easy",
    "Easy",
    "Normal",
    "Difficult",
    "Very difficult",
  ];
  return (
    <Box>
      <InputLabel id="partial-solution-label">
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
        aria-labelledby="Textfield for partial solution or comments"
      />
      <hr></hr>
      <InputLabel id="isCorrect-radiogroup">
        Do you think that your answer is correct?
      </InputLabel>
      <RadioGroup
        name="isCorrect"
        row
        id="isCorrect-radiogroup"
        value={formData.isCorrect}
        onChange={handleChange}
        aria-labelledby="Radiogroup to select if the input query returns a correct result"
      >
        {isCorrectOptions.map((item, index) => (
          <FormControlLabel
            key={index}
            value={item}
            control={<Radio />}
            label={item}
            aria-label={item}
          />
        ))}
      </RadioGroup>
      <hr></hr>
      <InputLabel id="difficulty-level-radiogroup">
        How difficult was this task for you?
      </InputLabel>
      <RadioGroup
        name="difficulty"
        row
        id="difficulty-level-radiogroup"
        defaultValue={"No answer"}
        value={formData.difficulty}
        onChange={handleChange}
        aria-labelledby="Radiogroup to select the perceived difficulty of the task"
      >
        {difficultyOptions.map((item, index) => (
          <FormControlLabel
            key={index}
            value={item}
            control={<Radio />}
            label={item}
            aria-label={item}
          />
        ))}
      </RadioGroup>
      <br />
      <hr></hr>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              name="is-finished-checkbox"
              checked={formData.isFinished}
              onChange={handleChange}
            />
          }
          label="Check if you finished this exercise to see your progress on the dashboard assignment card"
        />
      </FormGroup>
    </Box>
  );
};
