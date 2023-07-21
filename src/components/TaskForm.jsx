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
  //const [taskDescription, setTaskDescription] = useState('');
  const [task, setTask] = useState("")
  const [solution, setSolution] = useState("")
  const [difficulty, setDifficulty] = useState(0)
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [taskNumber, setTaskNumber] = useState(0)
  const [isExecutable, setIsExecutable] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [resultSize, setResultSize] = useState(0)
  const [comment, setComment] = useState("")
  const [tasksArray, setTasksArray] = useState([])
  const [isPostgreSQL, setIsPostgreSQL] = useState(false)
  const [isMongoDB, setIsMongoDB] = useState(false)
  const [isCassandra, setIsCassandra] = useState(false)
  const [isNeo4J, setIsNeo4J] = useState(false)

  const startTimer = () => {
    setIsRunning(true)
    setHasStarted(true)
  }

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
      setIsCorrect(false)
      setResultSize(0)
      setComment("")
      setIsRunning(false)
      setHasStarted(false)
    }
  }

  const navigation = useNavigate()
  const handlePrevTask = () => {
    setTaskNumber((prev) => Number(prev - 1))
    setTask(pgTasks[taskNumber - 1])
    setTasksArray(pgTasks[taskNumber - 1])
    if (!taskNumber) {
      navigation(-1)
    }
  }
  useEffect(() => {
    // TODO fetch the task from a database

    if (title === "PostgreSQL") {
      setIsPostgreSQL(true)
      setTask(pgTasks[0])
      setTasksArray(pgTasks.slice(1))
    }
    /* if (title === "Cassandra") {
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
    } */
    //this is the first task

    //setTask(taskdescr);
    //setTaskDescription('');
  }, [])
  // console.log(taskNumber)
  //setTask(tasksArray[newTask])
  //console.log(taskNumber)

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
              fullWidth
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <InputLabel id="isCorrect-radiogroup">
              Does the query return correct results?
            </InputLabel>
            <RadioGroup
              row
              id="isCorrect-radiogroup"
              defaultValue={0}
              value={isCorrect}
              onChange={(e) => setIsCorrect(e.target.value)}
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
