import React, { useState, useEffect } from "react"
import pgDataModel from "../images/datamodel1-transp.png"
import mongoDataModel from "../images/datamodel4-transp.png"
import neoDataModel from "../images/datamodel3-transp.png"
import cassandraDataModel from "../images/datamodel2-transp.png"
import { pgTasks } from "../data/tasksData"
import { cassandraTasks } from "../data/tasksData"
import { neo4jTasks } from "../data/tasksData"
import { mongodbTasks } from "../data/tasksData"
import MongoDbTask from "./MongoDbTask"
import Cassandra from "./Cassandra"
import Neo from "./Neo"
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

  /* Styles for mui components */
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
  const [status, setStatus] = useState("notstarted")
  const [status2, setStatus2] = useState("finished")
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
  const [statusBar, setStatusBar] = useState(false)
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

  const handleSubmit = (e, str) => {
    e.preventDefault()
    localStorage.setItem("status2", JSON.stringify(status2))
    let allPostData = [...localData, ...localData1, ...localData2]
    navigation("/")
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
      setStatus("finished")
      setStatusBar(true)
      if (statusBar) {
        localStorage.setItem("status", JSON.stringify(status))
      }
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
      setStatus("In Progress")
      setStatusBar(true)
      if (statusBar) {
        localStorage.setItem("status", JSON.stringify(status))
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
  useEffect(() => {
    // TODO fetch the task from a database
    if (title === "PostgreSQL") {
      setIsPostgreSQL(true)
      setTask(pgTasks[0])
      setTasksArray(pgTasks.slice(1))
      setStatus("In Progress")
      setStatusBar(true)
      if (statusBar) {
        localStorage.setItem("status", JSON.stringify(status))
      }
    } else if (title === "Cassandra") {
      setIsCassandra(true)
      /* setTask(cassandraTasks[0])
      setTasksArray(cassandraTasks.slice(1)) */
    } else if (title === "Neo4J") {
      setIsNeo4J(true)
      /*      setTask(neo4jTasks[0])
      setTasksArray(neo4jTasks.slice(1)) */
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
        {/* <Box flex="0 0 50%"> */}
        {/* <h1>Task {taskNumber}</h1> */}
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
                  <Button
                    sx={muiButtonStyle}
                    onClick={(e) => handleSubmit(e, "Finished")}
                  >
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
              )) ||
              (isCassandra && (
                <Cassandra
                  title={title}
                  task1={task}
                  tasksArray1={tasksArray}
                />
              )) ||
              (isNeo4J && (
                <Neo title={title} task1={task} tasksArray1={tasksArray} />
              ))}

            {/*  {isPostgreSQL && (
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
                {taskNumber === tasksArray?.length + 1 ? (
                  <Button sx={muiButtonStyle} onClick={handleSubmit}>
                    Submit
                  </Button>
                ) : (
                  <Button sx={muiButtonStyle} onClick={handleNextTask}>
                    Next Task
                  </Button>
                )}{" "}
              </>
            )} */}

            {/*    {isMongoDB && <MongoDbTask />} */}
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

export default TaskForm
