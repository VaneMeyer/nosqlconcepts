import React, { useState, useEffect } from "react";
import pgDataModel from "../images/datamodel1-transp.png";
import mongoDataModel from "../images/datamodel4-transp.png";
import neoDataModel from "../images/datamodel3-transp.png";
import cassandraDataModel from "../images/datamodel2-transp.png";
import { pgTasks } from "../data/tasksData";
import { cassandraTasks } from "../data/tasksData";
import { neo4jTasks } from "../data/tasksData";
import { mongodbTasks } from "../data/tasksData";
import * as xlsx from "xlsx";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  useTheme,
} from "@mui/material";

import { tokens } from "../theme";
import SQLQuery from "./SQLQuery";
import MQLQuery from "./MQLQuery";
import CypherQuery from "./CypherQuery";
import CQLQuery from "./CQLQuery";
import Timer from "./Timer";

const TaskForm = ({ title, taskdescr }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Styles for mui components
  let muiButtonStyle = {
    backgroundColor: colors.blueAccent[700],
    color: colors.grey[100],
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

  const [task, setTask] = useState("");

  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [taskNumber, setTaskNumber] = useState(1);
  const [isExecutable, setIsExecutable] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [resultSize, setResultSize] = useState(0);
  const [comment, setComment] = useState("");
  const [tasksArray, setTasksArray] = useState([]);
  const [isPostgreSQL, setIsPostgreSQL] = useState(false);
  const [isMongoDB, setIsMongoDB] = useState(false);
  const [isCassandra, setIsCassandra] = useState(false);
  const [isNeo4J, setIsNeo4J] = useState(false);
  const [fileData, setFileData] = useState({
    taskNumber: "",
    query: "",
    resultSize: "",
    isExecutable: "",
    partialSolution: "",
    isCorrect: "",
    difficulty: "",
    time: "",
  });

  const [profile, setProfile] = useState("");
  const { name, role } = profile;
  // to save user entries
  const [pgFormData, setPgFormData] = useState({
    partialSolution: localStorage.getItem(`partialSolution${taskNumber}`) || "",
    isCorrect: localStorage.getItem(`isCorrect${taskNumber}`) || "0",
    difficulty: localStorage.getItem(`difficulty${taskNumber}`) || "0",
  });
  const [casFormData, setCasFormData] = useState([]);
  const [neoFormData, setNeoFormData] = useState([]);
  const [mongoFormData, setMongoFormData] = useState([]);

  const saveAnswersToLocalStorage = () => {
    localStorage.setItem(
      `partialSolution${taskNumber}`,
      pgFormData.partialSolution
    );
    localStorage.setItem(`isCorrect${taskNumber}`, pgFormData.isCorrect);
    localStorage.setItem(`difficulty${taskNumber}`, pgFormData.difficulty);
  };

  useEffect(() => {
    // TODO fetch the task from a database

    if (title === "PostgreSQL") {
      //setPgFormData(localStorage.getItem(`answer${taskNumber}`) || '');
      setIsPostgreSQL(true);
      setTask(pgTasks[0]);
      //setTasksArray(pgTasks.slice(1));
      setTasksArray(pgTasks);
      /* const storedPgData = JSON.parse(localStorage.getItem('pgFormData'));
      if (storedPgData) {
        setPgFormData(storedPgData);
      } */
    }
    if (title === "Cassandra") {
      setIsCassandra(true);
      setTask(cassandraTasks[0]);
      //setTasksArray(cassandraTasks.slice(1));
      setTasksArray(cassandraTasks);
    }
    if (title === "Neo4J") {
      setIsNeo4J(true);
      setTask(neo4jTasks[0]);
      //setTasksArray(neo4jTasks.slice(1));
      setTasksArray(neo4jTasks);
    }
    if (title === "MongoDB") {
      setIsMongoDB(true);
      setTask(mongodbTasks[0]);
      //setTasksArray(mongodbTasks.slice(1));
      setTasksArray(mongodbTasks);
    }
    //this is the first task

    //setTask(taskdescr);
    //setTaskDescription('');

    //fetch user profile
    fetch("/api/getme")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        //console.log(result);
        setProfile(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const startTimer = () => {
    setIsRunning(true);
    setHasStarted(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (isPostgreSQL) {
      saveAnswersToLocalStorage();
      //localStorage.setItem(`answer${taskNumber}`, JSON.stringify({ ...pgFormData, [name]: value }));
      //localStorage.setItem('pgFormData', JSON.stringify({ ...pgFormData, [name]: value }));
      setPgFormData({ ...pgFormData, [name]: value });
      console.log(pgFormData);

      //localStorage.setItem('pgFormData', JSON.stringify(pgFormData));
      /* const pgData = JSON.parse(localStorage.getItem("pgFormData"));
      console.log("test local storage: ", pgData); */
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FormData from local storage TaskForm: ", pgFormData);
    console.log("FormData from local storage SQLquery: ", query);

    // TODO send data to database
  };

  // Function to handle navigation to the next task
  const handleNextTask = () => {
    console.log(query);
    saveAnswersToLocalStorage();
    // TODO fetch the next task from a database
    // and set it to the state variable "task"
    if (taskNumber === tasksArray.length) {
      // This is the last task
      alert("This is the last task");
    } else {
      let newTask = taskNumber; //- 1;

      setTask(tasksArray[newTask]);
      setTaskNumber(taskNumber + 1);
      setPgFormData({
        partialSolution:
          localStorage.getItem(`partialSolution${taskNumber + 1}`) || "",
        isCorrect: localStorage.getItem(`isCorrect${taskNumber + 1}`) || "0",
        difficulty: localStorage.getItem(`difficulty${taskNumber + 1}`) || "0",
      });
      //TODO:
      //setQuery("");
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
  // Function to handle navigation to the next task

  const handlePrevTask = () => {
    saveAnswersToLocalStorage();
    setTaskNumber(() => taskNumber - 1);
    let newTask = taskNumber - 1; // Den Index des vorherigen Zustands berechnen

    setTask(() => tasksArray[newTask - 1]);
    setPgFormData({
      partialSolution:
        localStorage.getItem(`partialSolution${taskNumber - 1}`) || "",
      isCorrect: localStorage.getItem(`isCorrect${taskNumber - 1}`) || "0",
      difficulty: localStorage.getItem(`difficulty${taskNumber - 1}`) || "0",
    });
    //TODO:
    //setQuery("");
    setDifficulty(0);
    setTime(0);
    setIsExecutable(false);
    setIsCorrect(false);
    setResultSize(0);
    setComment("");
    setIsRunning(false);
    setHasStarted(false);

    // Hier können Sie den vorherigen Zustand wiederherstellen, z.B. aus dem Local Storage
    // setSolution(prevState.solution);
    // setDifficulty(prevState.difficulty);
    // setTime(prevState.time);
    // setIsExecutable(prevState.isExecutable);
    // setIsCorrect(prevState.isCorrect);
    // setResultSize(prevState.resultSize);
    // setComment(prevState.comment);
    // setIsRunning(prevState.isRunning);
    // setHasStarted(prevState.hasStarted);
  };
  const handleDownload = () => {
    const header = [
      "taskNumber",
      "query",
      "resultSize",
      "isExecutable",
      "partialSolution",
      "isCorrect",
      "difficulty",
      "time",
    ];
    const dataArray = [
      header,
      [
        taskNumber,
        query,
        resultSize,
        isExecutable,
        pgFormData.partialSolution,
        pgFormData.isCorrect,
        pgFormData.difficulty,
        time,
      ],
    ];
    const ws = xlsx.utils.aoa_to_sheet(dataArray);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "fileData");
    xlsx.writeFile(wb, "submission_file.xlsx");
  };

  useEffect(() => {
    setPgFormData({
      partialSolution:
        localStorage.getItem(`partialSolution${taskNumber}`) || "",
      isCorrect: localStorage.getItem(`isCorrect${taskNumber}`) || "0",
      difficulty: localStorage.getItem(`difficulty${taskNumber}`) || "0",
    });
  }, [taskNumber]);

  // data from child components
  // Diese Funktion wird an die Kindkomponente übergeben
  const handleQueryData = (queryFromChild) => {
    // Hier kannst du die Daten aus der Kindkomponente verwenden
    setQuery(queryFromChild.sqlQuery);
    setIsExecutable(queryFromChild.isExecutable);
    setResultSize(queryFromChild.resultSize);
    console.log(query);
  };
  const handleTimer = (timerFromChild) => {
    setTime(() => timerFromChild);
    
  }
  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
        <p>{task}</p>
        {hasStarted ? (
          <form>
            <Timer run={isRunning} onTimerFromChild={handleTimer} />
            {isPostgreSQL ? (
              <SQLQuery
                taskNumber={taskNumber}
                onDataFromChild={handleQueryData}
              />
            ) : (
              <p></p>
            )}
            {isMongoDB ? <MQLQuery /> : <p></p>}
            {isNeo4J ? <CypherQuery /> : <p></p>}
            {isCassandra ? <CQLQuery /> : <p></p>}
            <InputLabel id="partial-solution-label">
              Your partial solution:
            </InputLabel>
            <TextField
              name="partialSolution"
              id="partial-solution-label"
              fullWidth
              value={pgFormData.partialSolution}
              /*  value={comment} */
              /* onChange={(e) => setComment(e.target.value)} */
              onChange={handleChange}
            />
            <InputLabel id="isCorrect-radiogroup">
              Does your query return correct results?
            </InputLabel>
            <RadioGroup
              name="isCorrect"
              row
              id="isCorrect-radiogroup"
              defaultValue={0}
              value={pgFormData.isCorrect}
              onChange={handleChange}
              /* value={isCorrect}
              onChange={(e) => setIsCorrect(e.target.value)} */
            >
              <FormControlLabel
                value={0}
                control={<Radio sx={muiRadioStyle} />}
                label="I don't know"
              />
              <FormControlLabel
                value={1}
                control={<Radio sx={muiRadioStyle} />}
                label="Yes"
              />
              <FormControlLabel
                value={2}
                control={<Radio sx={muiRadioStyle} />}
                label="No"
              />
            </RadioGroup>
            <InputLabel id="difficulty-level-radiogroup">
              How difficult was this task for you?
            </InputLabel>
            <RadioGroup
              name="difficulty"
              row
              id="difficulty-level-radiogroup"
              defaultValue={0}
              value={pgFormData.difficulty}
              onChange={handleChange}
              /* value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)} */
            >
              <FormControlLabel
                value={0}
                control={<Radio sx={muiRadioStyle} />}
                label="None"
              />
              <FormControlLabel
                value={1}
                control={<Radio sx={muiRadioStyle} />}
                label="Very easy"
              />
              <FormControlLabel
                value={2}
                control={<Radio sx={muiRadioStyle} />}
                label="Easy"
              />
              <FormControlLabel
                value={3}
                control={<Radio sx={muiRadioStyle} />}
                label="Normal"
              />
              <FormControlLabel
                value={4}
                control={<Radio sx={muiRadioStyle} />}
                label="Difficult"
              />
              <FormControlLabel
                value={5}
                control={<Radio sx={muiRadioStyle} />}
                label="Very difficult"
              />
            </RadioGroup>
            <br />
            <br />
            {taskNumber === tasksArray.length ? (
              <div>
                {taskNumber !== 1 && (
                  <Button sx={muiButtonStyle} onClick={handlePrevTask}>
                    Previous Task
                  </Button>
                )}{" "}
                <Button sx={muiButtonStyle} onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            ) : (
              <div>
                {taskNumber !== 1 && (
                  <Button sx={muiButtonStyle} onClick={handlePrevTask}>
                    Previous Task
                  </Button>
                )}
                <Button sx={muiButtonStyle} onClick={handleNextTask}>
                  Next Task
                </Button>
                <Button sx={muiButtonStyle} onClick={handleDownload}>
                  Download Excel
                </Button>
              </div>
            )}{" "}
          </form>
        ) : (
          <Button sx={muiButtonStyle} onClick={startTimer}>
            Start task
          </Button>
        )}
      </Box>

      <Box display=" 0 0 flex">
        {isPostgreSQL && (
          <img
            src={pgDataModel}
            alt="Data model of PostgreSQL enron database"
            width="600vw"
            height="auto"
          />
        )}
        {isMongoDB && (
          <img
            src={mongoDataModel}
            alt="Data model of MongoDB enron database"
            width="600vw"
            height="auto"
          />
        )}
        {isNeo4J && (
          <img
            src={neoDataModel}
            alt="Data model of Neo4J enron database"
            width="600vw"
            height="auto"
          />
        )}
        {isCassandra && (
          <img
            src={cassandraDataModel}
            alt="Data model of Cassandra enron database"
            width="600vw"
            height="auto"
          />
        )}
      </Box>
    </Box>
  );
};

export default TaskForm;

/* import React, { useState, useEffect } from "react"
import pgDataModel from "../images/datamodel1-transp.png"
import mongoDataModel from "../images/datamodel4-transp.png"
import neoDataModel from "../images/datamodel3-transp.png"
import cassandraDataModel from "../images/datamodel2-transp.png"
import { pgTasks } from "../data/tasksData"
import { cassandraTasks } from "../data/tasksData"
import { neo4jTasks } from "../data/tasksData"
import { mongodbTasks } from "../data/tasksData"
import MongoDbTask from "./MongoDbTask"
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
} from "@mui/material"

import { useNavigate } from "react-router-dom"
import { tokens } from "../theme"
import SQLQuery from "./SQLQuery"
import MQLQuery from "./MQLQuery"
import CypherQuery from "./CypherQuery"
import CQLQuery from "./CQLQuery"
import Timer from "./Timer"
import { useRef } from "react"

const TaskForm = ({ title, taskdescr }) => {
  let localData = JSON.parse(localStorage.getItem(`task`))
  let localData1 = JSON.parse(localStorage.getItem(`radio1`))
  let localData2 = JSON.parse(localStorage.getItem(`radio2`))
  const sqlDataFromDb = JSON.parse(localStorage.getItem("mysqlQuery"))
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  // Styles for mui components 
  let muiButtonStyle = {
    backgroundColor: colors.blueAccent[700],
    color: colors.grey[100],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
    margin: "0px 2px",
  }
  let muiRadioStyle = {
    "&.Mui-checked": {
      color: colors.primary[100],
    },
  }
  const [taskNumber, setTaskNumber] = useState(0)
  const [task, setTask] = useState("")
  const localTime = JSON.parse(localStorage.getItem("time"))
  const [time, setTime] = useState(0)
  const [timeData, setTimeData] = useState(localTime)
  const [taskAllData, setTaskAllData] = useState(
    (localData?.length && localData) || ""
  )
  const [postgreSQLRadio, setpostgreSQLRadio] = useState(
    localData1?.length ? localData1 : ""
  )
  const [postgreSQLRadio2, setpostgreSQLRadio2] = useState(
    localData2?.length ? localData2 : ""
  )
  const [isRunning, setIsRunning] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [isExecutable, setIsExecutable] = useState(false)
  const [sqlQuery, setSqlQuery] = useState(
    sqlDataFromDb?.length ? sqlDataFromDb : ""
  )
  const [difficulty, setDifficulty] = useState(0)
  const [resultSize, setResultSize] = useState(0)
  const [tasksArray, setTasksArray] = useState([])
  const [isPostgreSQL, setIsPostgreSQL] = useState(false)
  const [isMongoDB, setIsMongoDB] = useState(false)
  const [isCassandra, setIsCassandra] = useState(false)
  const [isNeo4J, setIsNeo4J] = useState(false)
  const navigation = useNavigate()
  const startTimer = () => {
    setIsRunning(true)
    setHasStarted(true)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    let allPostData = [...localData, ...localData1, ...localData2]
    console.log(allPostData)
  }

  const handleChange = (index, value) => {
    let newTask = [...taskAllData]
    newTask[index] = value
    setTaskAllData(newTask)
  }

  const handleValueChnage = (index, value) => {
    let newTask = [...postgreSQLRadio]
    newTask[index] = value
    setpostgreSQLRadio(newTask)
  }

  const handleDificultLevel = (index, value) => {
    let newTask = [...postgreSQLRadio2]
    newTask[index] = value
    setpostgreSQLRadio2(newTask)
  }

  // Function to handle navigation to the next task
  const handleNextTask = (index, value) => {
    if (taskNumber === tasksArray.length + 1) {
      // This is the last task
      alert("This is the last task")
    } else {
      let newTask = taskNumber
      setTask(tasksArray[newTask])
      setTaskNumber(taskNumber + 1)
      setDifficulty(0)
      setTime(0)
      setIsExecutable(false)
      //setIsCorrect(false)
      setResultSize(0)
      //setComment("")
      setIsRunning(false)
      setHasStarted(false)
    }
    localStorage.setItem("task", JSON.stringify(taskAllData))
    localStorage.setItem("radio1", JSON.stringify(postgreSQLRadio))
    localStorage.setItem("radio2", JSON.stringify(postgreSQLRadio2))
    localStorage.setItem("mysqlQuery", JSON.stringify(sqlQuery))
    // localStorage.setItem(`${taskNumber}`, JSON.stringify(taskAllData)) 
    //localStorage.setItem("mysqlQuery", JSON.stringify(sqlQuery))
    {
      timeData
        ? localStorage.setItem("time", JSON.stringify(timeData))
        : localStorage.setItem("time", JSON.stringify(time))
    }
  }
  useEffect(() => {
    // TODO fetch the task from a database
    if (title === "PostgreSQL") {
      setIsPostgreSQL(true)
      setTask(pgTasks[0])
      setTasksArray(pgTasks.slice(1))
    } else if (title === "Cassandra") {
      setIsCassandra(true)
      setTask(cassandraTasks[0])
      setTasksArray(cassandraTasks.slice(1))
    } else if (title === "Neo4J") {
      setIsNeo4J(true)
      setTask(neo4jTasks[0])
      setTasksArray(neo4jTasks.slice(1))
    } else if (title === "MongoDB") {
      setIsMongoDB(true)
      //setTask(mongodbTasks[0])
      //setTasksArray(mongodbTasks.slice(1))
    }
  }, [])

  const handlePrevTask = (index, value) => {
    setIsRunning(false)
    setTaskNumber((prev) => Number(prev - 1))
    if (isPostgreSQL) {
      setTask(pgTasks[taskNumber - 1])
      setTasksArray(pgTasks[taskNumber - 1])
      if (!taskNumber) {
        navigation(-1)
      }
    } else if (isMongoDB) {
      setTask(mongodbTasks[taskNumber - 1])
      setTasksArray(mongodbTasks[taskNumber - 1])
      if (!taskNumber) {
        navigation(-1)
      }
    } else if (isCassandra) {
      setTask(cassandraTasks[taskNumber - 1])
      setTasksArray(cassandraTasks[taskNumber - 1])
      if (!taskNumber) {
        navigation(-1)
      }
    } else if (isNeo4J) {
      setTask(neo4jTasks[taskNumber - 1])
      setTasksArray(neo4jTasks[taskNumber - 1])
      if (!taskNumber) {
        navigation(-1)
      }
    }
    localStorage.setItem("task", JSON.stringify(taskAllData))
    localStorage.setItem("radio1", JSON.stringify(postgreSQLRadio))
    localStorage.setItem("radio2", JSON.stringify(postgreSQLRadio2))
    localStorage.setItem("mysqlQuery", JSON.stringify(sqlQuery))
    {
      timeData
        ? localStorage.setItem("time", JSON.stringify(timeData))
        : localStorage.setItem("time", JSON.stringify(time))
    }
  }

  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
       
        <p>{task}</p>
        {hasStarted ? (
          <form>
            {(isPostgreSQL && (
              <>
                <Timer
                  run={isRunning}
                  time={time}
                  timeData={timeData}
                  setTime={setTime}
                  setTimeData={setTimeData}
                />
                <SQLQuery
                  taskNumber={taskNumber}
                  sqlQuery={sqlQuery}
                  setSqlQuery={setSqlQuery}
                />
                <InputLabel id="partial-solution-label">
                  Your partial solution:
                </InputLabel>
                <TextField
                  type="text"
                  key={taskNumber}
                  value={taskAllData[taskNumber]}
                  onChange={(e) => handleChange(taskNumber, e.target.value)}
                />
                <InputLabel id="isCorrect-radiogroup">
                  Does the query return correct results?
                </InputLabel>
                <RadioGroup
                  row
                  id="isCorrect-radiogroup"
                  onChange={(e) =>
                    handleValueChnage(taskNumber, e.target.value)
                  }
                >
                  <FormControlLabel
                    value="IDon'tKnow"
                    control={<Radio sx={muiRadioStyle} />}
                    label="I Don't Know"
                    name="isCorrect"
                    checked={postgreSQLRadio[taskNumber] == "IDon'tKnow"}
                  />
                  <FormControlLabel
                    value="Yes"
                    control={<Radio sx={muiRadioStyle} />}
                    label="Yes"
                    name="isCorrect"
                    checked={postgreSQLRadio[taskNumber] == "Yes"}
                  />
                  <FormControlLabel
                    value="No"
                    control={<Radio sx={muiRadioStyle} />}
                    label="No"
                    name="isCorrect"
                    checked={postgreSQLRadio[taskNumber] == "No"}
                  />
                </RadioGroup>
                <InputLabel id="difficulty-level-radiogroup">
                  Difficulty level:
                </InputLabel>
                <RadioGroup
                  row
                  id="isCorrect-radiogroup"
                  onChange={(e) =>
                    handleDificultLevel(taskNumber, e.target.value)
                  }
                >
                  <FormControlLabel
                    value="None"
                    control={<Radio sx={muiRadioStyle} />}
                    label="None"
                    name="isCorrect"
                    checked={postgreSQLRadio2[taskNumber] == "None"}
                  />
                  <FormControlLabel
                    value="VeryEasy"
                    control={<Radio sx={muiRadioStyle} />}
                    label="Very Easy"
                    name="isCorrect"
                    checked={postgreSQLRadio2[taskNumber] == "VeryEasy"}
                  />
                  <FormControlLabel
                    value="Easy"
                    control={<Radio sx={muiRadioStyle} />}
                    label="Easy"
                    name="isCorrect"
                    checked={postgreSQLRadio2[taskNumber] == "Easy"}
                  />
                  <FormControlLabel
                    value="Normal"
                    control={<Radio sx={muiRadioStyle} />}
                    label="Normal"
                    name="isCorrect"
                    checked={postgreSQLRadio2[taskNumber] == "Normal"}
                  />
                  <FormControlLabel
                    value="Difficult"
                    control={<Radio sx={muiRadioStyle} />}
                    label="Difficult"
                    name="isCorrect"
                    checked={postgreSQLRadio2[taskNumber] == "Difficult"}
                  />
                </RadioGroup>
                <Button sx={muiButtonStyle} onClick={handlePrevTask}>
                  PrevTask
                </Button>
                {taskNumber === tasksArray?.length ? (
                  <Button sx={muiButtonStyle} onClick={handleSubmit}>
                    Submit
                  </Button>
                ) : (
                  <Button sx={muiButtonStyle} onClick={handleNextTask}>
                    Next Task
                  </Button>
                )}
              </>
            )) ||
              (isMongoDB && (
                <MongoDbTask
                  title={title}
                  task1={task}
                  tasksArray1={tasksArray}
                />
              ))}

           
            <br />
            <br />
          </form>
        ) : (
          <Button sx={muiButtonStyle} onClick={startTimer}>
            Start task
          </Button>
        )}
      </Box>

      <Box display=" 0 0 flex">
        {isPostgreSQL && (
          <img
            src={pgDataModel}
            alt="Data model of PostgreSQL enron database"
            width="600vw"
            height="auto"
          />
        )}
        {isMongoDB && (
          <img
            src={mongoDataModel}
            alt="Data model of MongoDB enron database"
            width="600vw"
            height="auto"
          />
        )}
        {isNeo4J && (
          <img
            src={neoDataModel}
            alt="Data model of Neo4J enron database"
            width="600vw"
            height="auto"
          />
        )}
        {isCassandra && (
          <img
            src={cassandraDataModel}
            alt="Data model of Cassandra enron database"
            width="600vw"
            height="auto"
          />
        )}
      </Box>
    </Box>
  )
}

export default TaskForm          */
