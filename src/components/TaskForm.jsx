import React, { useState, useEffect } from "react"
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

const TaskForm = ({ title, taskdescr }) => {
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
  const [taskAllData, setTaskAllData] = useState({})
  const [task, setTask] = useState("")
  const [solution, setSolution] = useState("")
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [taskNumber, setTaskNumber] = useState(0)
  const [isExecutable, setIsExecutable] = useState(false)
  //const [isCorrect, setIsCorrect] = useState("")
  const [difficulty, setDifficulty] = useState(0)
  const [resultSize, setResultSize] = useState(0)
  const [comment, setComment] = useState("")
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

  const localData = JSON.parse(localStorage.getItem("taskData"))
  const handleSubmit = (e) => {
    e.preventDefault()

    // TODO send data to database
    /* console.log({
      task: task,
      solution: solution,
      difficulty: difficulty,
      time: time,
      isExecutable: isExecutable,
      isCorrect: isCorrect,
      resultSize: resultSize,
      comment: comment,
    });
    alert("Submitted!");*/
  }

  // Function to handle navigation to the next task
  const handleNextTask = () => {
    // TODO fetch the next task from a database
    // and set it to the state variable "task"
    if (taskNumber === tasksArray.length + 1) {
      // This is the last task
      alert("This is the last task")
    } else {
      let newTask = taskNumber
      setTask(tasksArray[newTask])
      setTaskNumber(taskNumber + 1)
      setSolution("")
      setDifficulty(0)
      setTime(0)
      setIsExecutable(false)
      //setIsCorrect(false)
      setResultSize(0)
      setComment("")
      setIsRunning(false)
      setHasStarted(false)
    }
  }

  useEffect(() => {
    // TODO fetch the task from a database

    if (title === "PostgreSQL") {
      setIsPostgreSQL(true)
      setTask(pgTasks[0])
      setTasksArray(pgTasks.slice(1))
    }
    if (title === "Cassandra") {
      setIsCassandra(true)
      setTask(cassandraTasks[0])
      setTasksArray(cassandraTasks.slice(1))
    }
    if (title === "Neo4J") {
      setIsNeo4J(true)
      setTask(neo4jTasks[0])
      setTasksArray(neo4jTasks.slice(1))
    }
    if (title === "MongoDB") {
      setIsMongoDB(true)
      setTask(mongodbTasks[0])
      setTasksArray(mongodbTasks.slice(1))
    }
  }, [])

  const handleChnage = (e) => {
    localStorage.removeItem("taskData")
    /* if (e.target.name == "comment") {
      const items = JSON.parse(localStorage.getItem("taskData"))
      Object.entries(items)
      for (let i = 0; i < items.length; i++) {
        items.slice(i, i)
        localStorage.setItem("taskData", JSON.stringify(taskAllData))
      }
    } else if (e.target.name == "isCorrect") {
      const items = JSON.parse(localStorage.getItem("taskData"))
      Object.entries(items)
      for (let i = 0; i < items.length; i++) {
        items.slice(i, i)
        localStorage.setItem("taskData", JSON.stringify(taskAllData))
      }
    }
    if (e.target.name == "difficulty") {
      const items = JSON.parse(localStorage.getItem("taskData"))
      Object.entries(items)
      for (let i = 0; i < items.length; i++) {
        items.slice(i, i)
        localStorage.setItem("taskData", JSON.stringify(taskAllData))
      }
    } */

    setTaskAllData({
      ...taskAllData,
      [e.target.name]: e.target.value.trim(),
    })
  }

  const handlePrevTask = () => {
    localStorage.setItem("taskData", JSON.stringify(taskAllData))
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
  }

  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
        {/* <Box flex="0 0 50%"> */}
        {/* <h1>Task {taskNumber}</h1> */}
        <p>{task}</p>
        {hasStarted ? (
          <form>
            <Timer run={isRunning} />
            {isPostgreSQL ? <SQLQuery /> : <p></p>}
            {isMongoDB ? <MQLQuery /> : <p></p>}
            {isNeo4J ? <CypherQuery /> : <p></p>}
            {isCassandra ? <CQLQuery /> : <p></p>}
            <InputLabel id="partial-solution-label">
              Your partial solution:
            </InputLabel>
            <TextField
              id="partial-solution-label"
              name="comment"
              fullWidth
              value={
                JSON.parse(localStorage.getItem("taskData"))
                  ? localData.comment
                  : taskAllData.comment
              }
              onChange={handleChnage}
            />
            <InputLabel id="isCorrect-radiogroup">
              Does the query return correct results?
            </InputLabel>
            <RadioGroup row id="isCorrect-radiogroup" onChange={handleChnage}>
              <FormControlLabel
                value={
                  JSON.parse(localStorage.getItem("taskData"))
                    ? localData.isCorrect
                    : "I Don't Know"
                }
                control={<Radio sx={muiRadioStyle} />}
                label="I don't Know"
                name="isCorrect"
                checked={
                  JSON.parse(localStorage.getItem("taskData"))
                    ? localData.isCorrect == "I Don't Know"
                    : taskAllData.isCorrect == "I Don't Know"
                }
              />
              <FormControlLabel
                value={
                  JSON.parse(localStorage.getItem("taskData"))
                    ? localData.isCorrect
                    : "Yes"
                }
                control={<Radio sx={muiRadioStyle} />}
                label="Yes"
                name="isCorrect"
                checked={
                  JSON.parse(localStorage.getItem("taskData"))
                    ? localData.isCorrect == "Yes"
                    : taskAllData.isCorrect == "Yes"
                }
              />
              <FormControlLabel
                value={
                  JSON.parse(localStorage.getItem("taskData"))
                    ? localData.isCorrect
                    : "No"
                }
                control={<Radio sx={muiRadioStyle} />}
                label="No"
                name="isCorrect"
                checked={
                  JSON.parse(localStorage.getItem("taskData"))
                    ? localData.isCorrect == "No"
                    : taskAllData.isCorrect == "No"
                }
              />
            </RadioGroup>
            <InputLabel id="difficulty-level-radiogroup">
              Difficulty level:
            </InputLabel>
            <RadioGroup
              row
              id="difficulty-level-radiogroup"
              onChange={handleChnage}
            >
              <FormControlLabel
                value={
                  JSON.parse(localStorage.getItem("taskData"))
                    ? localData.difficulty
                    : "None"
                }
                control={<Radio sx={muiRadioStyle} />}
                label="None"
                name="difficulty"
                checked={
                  JSON.parse(localStorage.getItem("taskData"))
                    ? localData.difficulty == "None"
                    : taskAllData.difficulty == "None"
                }
              />
              <FormControlLabel
                value={
                  JSON.parse(localStorage.getItem("taskData"))
                    ? localData.difficulty
                    : "Very easy"
                }
                control={<Radio sx={muiRadioStyle} />}
                label="Very easy"
                name="difficulty"
                checked={
                  JSON.parse(localStorage.getItem("taskData"))
                    ? localData.difficulty == "Very easy"
                    : taskAllData.difficulty == "Very easy"
                }
              />
              <FormControlLabel
                value={
                  JSON.parse(localStorage.getItem("taskData"))
                    ? localData.difficulty
                    : "Easy"
                }
                control={<Radio sx={muiRadioStyle} />}
                label="Easy"
                name="difficulty"
                checked={
                  JSON.parse(localStorage.getItem("taskData"))
                    ? localData.difficulty == "Easy"
                    : taskAllData.difficulty == "Easy"
                }
              />
              <FormControlLabel
                value={
                  JSON.parse(localStorage.getItem("taskData"))
                    ? localData.difficulty
                    : "Normal"
                }
                control={<Radio sx={muiRadioStyle} />}
                label="Normal"
                name="difficulty"
                checked={
                  JSON.parse(localStorage.getItem("taskData"))
                    ? localData.difficulty == "Normal"
                    : taskAllData.difficulty == "Normal"
                }
              />
              <FormControlLabel
                value={
                  JSON.parse(localStorage.getItem("taskData"))
                    ? localData.difficulty
                    : "Difficult"
                }
                control={<Radio sx={muiRadioStyle} />}
                label="Difficult"
                name="difficulty"
                checked={
                  JSON.parse(localStorage.getItem("taskData"))
                    ? localData.difficulty == "Difficult"
                    : taskAllData.difficulty == "Difficult"
                }
              />
              <FormControlLabel
                value={
                  JSON.parse(localStorage.getItem("taskData"))
                    ? localData.difficulty
                    : "Very difficult"
                }
                control={<Radio sx={muiRadioStyle} />}
                label="Very difficult"
                name="difficulty"
                checked={
                  JSON.parse(localStorage.getItem("taskData"))
                    ? localData.difficulty == "Very difficult"
                    : taskAllData.difficulty == "Very difficult"
                }
              />
            </RadioGroup>
            <br />
            <br />
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
