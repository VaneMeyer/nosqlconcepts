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
import MongoDBQuery from "./MongoDBQuery"
import MQLQuery from "./MQLQuery"
import CypherQuery from "./CypherQuery"
import CQLQuery from "./CQLQuery"
import MongoDbTimer from "./MongoDbTImer"
import { useRef } from "react"

const TaskForm = ({ title, task1, tasksArray1 }) => {
  let localData = JSON.parse(localStorage.getItem(`mongodbtask`))
  let localData1 = JSON.parse(localStorage.getItem(`mongodbradio1`))
  let localData2 = JSON.parse(localStorage.getItem(`mongodbradio2`))
  const mongodbtaskDb = JSON.parse(localStorage.getItem("mongodbquery"))
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
  const localTime = JSON.parse(localStorage.getItem("mongodbtime"))
  const [mongodbTime, setmongodbTime] = useState(0)
  const [mongodbTimeData, setmongodbTimeData] = useState(localTime)
  const [mongodbAllData, setmongodbAllData] = useState(
    (localData?.length && localData) || ""
  )
  const [mongodbRadio, setmongodbRadio] = useState(
    localData1?.length ? localData1 : ""
  )
  const [mongodbRadio2, setmongodbRadio2] = useState(
    localData2?.length ? localData2 : ""
  )

  const [isRunning, setIsRunning] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [isExecutable, setIsExecutable] = useState(false)
  const [mongodbQuery, setmongodbQuery] = useState(
    mongodbtaskDb?.length ? mongodbtaskDb : ""
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
    let newTask = [...mongodbAllData]
    newTask[index] = value
    setmongodbAllData(newTask)
  }

  const handleValueChnage = (index, value) => {
    let newTask = [...mongodbRadio]
    newTask[index] = value
    setmongodbRadio(newTask)
  }

  const handleDificultLevel = (index, value) => {
    let newTask = [...mongodbRadio2]
    newTask[index] = value
    setmongodbRadio2(newTask)
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
      setmongodbTime(0)
      setIsExecutable(false)
      //setIsCorrect(false)
      setResultSize(0)
      //setComment("")
      setIsRunning(false)
      setHasStarted(false)
    }
    localStorage.setItem("mongodbtask", JSON.stringify(mongodbAllData))
    localStorage.setItem("mongodbradio1", JSON.stringify(mongodbRadio))
    localStorage.setItem("mongodbradio2", JSON.stringify(mongodbRadio2))
    localStorage.setItem("mongodbquery", JSON.stringify(mongodbQuery))
    {
      mongodbTimeData
        ? localStorage.setItem("mongodbtime", JSON.stringify(mongodbTimeData))
        : localStorage.setItem("mongodbtime", JSON.stringify(mongodbTime))
    }
  }
  useEffect(() => {
    // TODO fetch the task from a database

    if (title === "MongoDB") {
      setIsMongoDB(true)
      setTask(mongodbTasks[0])
      setTasksArray(mongodbTasks.slice(1))
    }
  }, [])

  const handlePrevTask = (index, value) => {
    setIsRunning(false)
    setTaskNumber((prev) => Number(prev - 1))

    if (isMongoDB) {
      setTask(mongodbTasks[taskNumber - 1])
      setTasksArray(mongodbTasks[taskNumber - 1])
      if (!taskNumber) {
        navigation(-1)
      }
    }
    localStorage.setItem("mongodbtask", JSON.stringify(mongodbAllData))
    localStorage.setItem("mongodbradio1", JSON.stringify(mongodbRadio))
    localStorage.setItem("mongodbradio2", JSON.stringify(mongodbRadio2))
    localStorage.setItem("mongodbquery", JSON.stringify(mongodbQuery))
    /* localStorage.setItem(`${taskNumber}`, JSON.stringify(taskAllData)) */
    //localStorage.setItem("mysqlQuery", JSON.stringify(sqlQuery))
    {
      mongodbTimeData
        ? localStorage.setItem("mongodbtime", JSON.stringify(mongodbTimeData))
        : localStorage.setItem("mongodbtime", JSON.stringify(mongodbTime))
    }
  }

  return (
    <>
      <p>{task}</p>
      <MongoDbTimer
        run={isRunning}
        mongodbTime={mongodbTime}
        mongodbTimeData={mongodbTimeData}
        setmongodbTime={setmongodbTime}
        setmongodbTimeData={setmongodbTimeData}
      />
      <MongoDBQuery
        taskNumber={taskNumber}
        mongodbQuery={mongodbQuery}
        setmongodbQuery={setmongodbQuery}
      />
      <InputLabel id="partial-solution-label">
        Your partial solution:
      </InputLabel>
      <TextField
        type="text"
        key={taskNumber}
        value={mongodbAllData[taskNumber]}
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
          checked={mongodbRadio[taskNumber] == "IDon'tKnow"}
        />
        <FormControlLabel
          value="Yes"
          control={<Radio sx={muiRadioStyle} />}
          label="Yes"
          name="isCorrect"
          checked={mongodbRadio[taskNumber] == "Yes"}
        />
        <FormControlLabel
          value="No"
          control={<Radio sx={muiRadioStyle} />}
          label="No"
          name="isCorrect"
          checked={mongodbRadio[taskNumber] == "No"}
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
          checked={mongodbRadio2[taskNumber] == "None"}
        />
        <FormControlLabel
          value="VeryEasy"
          control={<Radio sx={muiRadioStyle} />}
          label="Very Easy"
          name="isCorrect"
          checked={mongodbRadio2[taskNumber] == "VeryEasy"}
        />
        <FormControlLabel
          value="Easy"
          control={<Radio sx={muiRadioStyle} />}
          label="Easy"
          name="isCorrect"
          checked={mongodbRadio2[taskNumber] == "Easy"}
        />
        <FormControlLabel
          value="Normal"
          control={<Radio sx={muiRadioStyle} />}
          label="Normal"
          name="isCorrect"
          checked={mongodbRadio2[taskNumber] == "Normal"}
        />
        <FormControlLabel
          value="Difficult"
          control={<Radio sx={muiRadioStyle} />}
          label="Difficult"
          name="isCorrect"
          checked={mongodbRadio2[taskNumber] == "Difficult"}
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
