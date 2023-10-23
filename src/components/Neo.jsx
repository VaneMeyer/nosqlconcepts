import React, { useState, useEffect } from "react"
import pgDataModel from "../images/datamodel1-transp.png"
import mongoDataModel from "../images/datamodel4-transp.png"
import neoDataModel from "../images/datamodel3-transp.png"
import cassandraDataModel from "../images/datamodel2-transp.png"
import { pgTasks } from "../data/tasksData"
import { cassandraTasks } from "../data/tasksData"
import { neo4jTasks } from "../data/tasksData"
import { mongodbTasks } from "../data/tasksData"
import NeoTimer from "./NeoTImer"
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
import MongoDBQuery from "./MongoDBQuery"
import MQLQuery from "./MQLQuery"
import CypherQuery from "./CypherQuery"
import CQLQuery from "./CQLQuery"
import MongoDbTimer from "./MongoDbTImer"
import { useRef } from "react"

const TaskForm = ({ title, task1, tasksArray1 }) => {
  let localData = JSON.parse(localStorage.getItem(`neotask`))
  let localData1 = JSON.parse(localStorage.getItem(`neoradio1`))
  let localData2 = JSON.parse(localStorage.getItem(`neoradio2`))
  const neotaskDb = JSON.parse(localStorage.getItem("neoquery"))
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
  const [taskNumber, setTaskNumber] = useState(0)
  const [task, setTask] = useState("")
  const localTime = JSON.parse(localStorage.getItem("neotime"))
  const [neoTime, setneoTime] = useState(0)
  const [neoTimeData, setneoTimeData] = useState(localTime)
  const [neoAllData, setneoAllData] = useState(
    (localData?.length && localData) || ""
  )
  const [neoRadio, setneoRadio] = useState(localData1?.length ? localData1 : "")
  const [neoRadio2, setneoRadio2] = useState(
    localData2?.length ? localData2 : ""
  )

  const [isRunning, setIsRunning] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [isExecutable, setIsExecutable] = useState(false)
  const [neoQuery, setneoQuery] = useState(neotaskDb?.length ? neotaskDb : "")
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
    let newTask = [...neoAllData]
    newTask[index] = value
    setneoAllData(newTask)
  }

  const handleValueChnage = (index, value) => {
    let newTask = [...neoRadio]
    newTask[index] = value
    setneoRadio(newTask)
  }

  const handleDificultLevel = (index, value) => {
    let newTask = [...neoRadio2]
    newTask[index] = value
    setneoRadio2(newTask)
  }

  // Function to handle navigation to the next task
  const handleNextTask = () => {
    if (taskNumber === tasksArray.length + 1) {
      // This is the last task
      alert("This is the last task")
    } else {
      let newTask = taskNumber
      setTask(tasksArray[newTask])
      setTaskNumber(taskNumber + 1)
      setDifficulty(0)
      setneoTime(0)
      setIsExecutable(false)
      //setIsCorrect(false)
      setResultSize(0)
      //setComment("")
      setIsRunning(false)
      setHasStarted(false)
    }
    localStorage.setItem("neotask", JSON.stringify(neoAllData))
    localStorage.setItem("neoradio1", JSON.stringify(neoRadio))
    localStorage.setItem("neoradio2", JSON.stringify(neoRadio2))
    localStorage.setItem("neoquery", JSON.stringify(neoQuery))
    {
      neoTimeData
        ? localStorage.setItem("neotime", JSON.stringify(neoTimeData))
        : localStorage.setItem("neotime", JSON.stringify(neoTime))
    }
  }
  useEffect(() => {
    // TODO fetch the task from a database

    if (title === "Neo4J") {
      setIsNeo4J(true)
      setTask(neo4jTasks[0])
      setTasksArray(neo4jTasks.slice(1))
    }
  }, [])

  const handlePrevTask = (index, value) => {
    setIsRunning(false)
    setTaskNumber((prev) => Number(prev - 1))

    if (isNeo4J) {
      setTask(neo4jTasks[taskNumber - 1])
      setTasksArray(neo4jTasks[taskNumber - 1])
      if (!taskNumber) {
        navigation(-1)
      }
    }
    localStorage.setItem("neotask", JSON.stringify(neoAllData))
    localStorage.setItem("neoradio1", JSON.stringify(neoRadio))
    localStorage.setItem("neoradio2", JSON.stringify(neoRadio2))
    localStorage.setItem("neoquery", JSON.stringify(neoQuery))
    {
      neoTimeData
        ? localStorage.setItem("neotime", JSON.stringify(neoTimeData))
        : localStorage.setItem("neotime", JSON.stringify(neoTime))
    }
  }

  return (
    <>
      <p>{task}</p>
      <NeoTimer
        run={isRunning}
        neoTime={neoTime}
        neoTimeData={neoTimeData}
        setneoTime={setneoTime}
        setneoTimeData={setneoTimeData}
      />
      {/*  <MongoDBQuery
        taskNumber={taskNumber}
        neoQuery={neoQuery}
        setneoQuery={setneoQuery}
      /> */}
      <InputLabel id="partial-solution-label">
        Your partial solution:
      </InputLabel>
      <TextField
        type="text"
        key={taskNumber}
        value={neoAllData[taskNumber]}
        onChange={(e) => handleChange(taskNumber, e.target.value)}
      />
      <InputLabel id="isCorrect-radiogroup">
        Does the query return correct results?
      </InputLabel>
      <RadioGroup
        row
        id="isCorrect-radiogroup"
        onChange={(e) => handleValueChnage(taskNumber, e.target.value)}
      >
        <FormControlLabel
          value="IDon'tKnow"
          control={<Radio sx={muiRadioStyle} />}
          label="I Don't Know"
          name="isCorrect"
          checked={neoRadio[taskNumber] == "IDon'tKnow"}
        />
        <FormControlLabel
          value="Yes"
          control={<Radio sx={muiRadioStyle} />}
          label="Yes"
          name="isCorrect"
          checked={neoRadio[taskNumber] == "Yes"}
        />
        <FormControlLabel
          value="No"
          control={<Radio sx={muiRadioStyle} />}
          label="No"
          name="isCorrect"
          checked={neoRadio[taskNumber] == "No"}
        />
      </RadioGroup>
      <InputLabel id="difficulty-level-radiogroup">
        Difficulty level:
      </InputLabel>
      <RadioGroup
        row
        id="isCorrect-radiogroup"
        onChange={(e) => handleDificultLevel(taskNumber, e.target.value)}
      >
        <FormControlLabel
          value="None"
          control={<Radio sx={muiRadioStyle} />}
          label="None"
          name="isCorrect"
          checked={neoRadio2[taskNumber] == "None"}
        />
        <FormControlLabel
          value="VeryEasy"
          control={<Radio sx={muiRadioStyle} />}
          label="Very Easy"
          name="isCorrect"
          checked={neoRadio2[taskNumber] == "VeryEasy"}
        />
        <FormControlLabel
          value="Easy"
          control={<Radio sx={muiRadioStyle} />}
          label="Easy"
          name="isCorrect"
          checked={neoRadio2[taskNumber] == "Easy"}
        />
        <FormControlLabel
          value="Normal"
          control={<Radio sx={muiRadioStyle} />}
          label="Normal"
          name="isCorrect"
          checked={neoRadio2[taskNumber] == "Normal"}
        />
        <FormControlLabel
          value="Difficult"
          control={<Radio sx={muiRadioStyle} />}
          label="Difficult"
          name="isCorrect"
          checked={neoRadio2[taskNumber] == "Difficult"}
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
  )
}

export default TaskForm
