import React, { useState, useEffect } from "react"
import pgDataModel from "../images/datamodel1-transp.png"
import mongoDataModel from "../images/datamodel4-transp.png"
import neoDataModel from "../images/datamodel3-transp.png"
import cassandraDataModel from "../images/datamodel2-transp.png"
import { cassandraTasks } from "../data/tasksData"
import CassandraTimer from "./CassandraTImer"
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
  let localData = JSON.parse(localStorage.getItem(`cassandratask`))
  let localData1 = JSON.parse(localStorage.getItem(`cassandraradio1`))
  let localData2 = JSON.parse(localStorage.getItem(`cassandraradio2`))
  const cassandrataskDb = JSON.parse(localStorage.getItem("cassandrabquery"))
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
  const localTime = JSON.parse(localStorage.getItem("cassandratime"))
  const [cassandraTime, setcassandraTime] = useState(0)
  const [cassandraTimeData, setcassandraTimeData] = useState(localTime)
  const [cassandraAllData, setcassandraAllData] = useState(
    (localData?.length && localData) || ""
  )
  const [cassandraRadio, setcassandraRadio] = useState(
    localData1?.length ? localData1 : ""
  )
  const [cassandraRadio2, setcassandraRadio2] = useState(
    localData2?.length ? localData2 : ""
  )

  const [isRunning, setIsRunning] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [isExecutable, setIsExecutable] = useState(false)
  const [cassandraQuery, setcassandraQuery] = useState(
    cassandrataskDb?.length ? cassandrataskDb : ""
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
    let newTask = [...cassandraAllData]
    newTask[index] = value
    setcassandraAllData(newTask)
  }

  const handleValueChnage = (index, value) => {
    let newTask = [...cassandraRadio]
    newTask[index] = value
    setcassandraRadio(newTask)
  }

  const handleDificultLevel = (index, value) => {
    let newTask = [...cassandraRadio2]
    newTask[index] = value
    setcassandraRadio2(newTask)
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
      setcassandraTime(0)
      setIsExecutable(false)
      //setIsCorrect(false)
      setResultSize(0)
      //setComment("")
      setIsRunning(false)
      setHasStarted(false)
    }
    localStorage.setItem("cassandratask", JSON.stringify(cassandraAllData))
    localStorage.setItem("cassandraradio1", JSON.stringify(cassandraRadio))
    localStorage.setItem("cassandraradio2", JSON.stringify(cassandraRadio2))
    localStorage.setItem("cassandraquery", JSON.stringify(cassandraQuery))
    {
      cassandraTimeData
        ? localStorage.setItem(
            "cassandratime",
            JSON.stringify(cassandraTimeData)
          )
        : localStorage.setItem("cassandratime", JSON.stringify(cassandraTime))
    }
  }
  useEffect(() => {
    // TODO fetch the task from a database

    if (title === "Cassandra") {
      setIsCassandra(true)
      setTask(cassandraTasks[0])
      setTasksArray(cassandraTasks.slice(1))
    }
  }, [])

  const handlePrevTask = (index, value) => {
    setIsRunning(false)
    setTaskNumber((prev) => Number(prev - 1))

    if (isCassandra) {
      setTask(cassandraTasks[taskNumber - 1])
      setTasksArray(cassandraTasks[taskNumber - 1])
      if (!taskNumber) {
        navigation(-1)
      }
    }
    localStorage.setItem("cassandratask", JSON.stringify(cassandraAllData))
    localStorage.setItem("cassandraradio1", JSON.stringify(cassandraRadio))
    localStorage.setItem("cassandraradio2", JSON.stringify(cassandraRadio2))
    localStorage.setItem("cassandraquery", JSON.stringify(cassandraQuery))
    {
      cassandraTimeData
        ? localStorage.setItem(
            "cassandratime",
            JSON.stringify(cassandraTimeData)
          )
        : localStorage.setItem("cassandratime", JSON.stringify(cassandraTime))
    }
  }

  return (
    <>
      <p>{task}</p>
      <CassandraTimer
        run={isRunning}
        cassandraTime={cassandraTime}
        cassandraTimeData={cassandraTimeData}
        setcassandraTime={setcassandraTime}
        setcassandraTimeData={setcassandraTimeData}
      />
      <MongoDBQuery
        taskNumber={taskNumber}
        mongodbQuery={cassandraQuery}
        setmongodbQuery={setcassandraQuery}
      />
      <InputLabel id="partial-solution-label">
        Your partial solution:
      </InputLabel>
      <TextField
        type="text"
        key={taskNumber}
        value={cassandraAllData[taskNumber]}
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
          checked={cassandraRadio[taskNumber] == "IDon'tKnow"}
        />
        <FormControlLabel
          value="Yes"
          control={<Radio sx={muiRadioStyle} />}
          label="Yes"
          name="isCorrect"
          checked={cassandraRadio[taskNumber] == "Yes"}
        />
        <FormControlLabel
          value="No"
          control={<Radio sx={muiRadioStyle} />}
          label="No"
          name="isCorrect"
          checked={cassandraRadio[taskNumber] == "No"}
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
          checked={cassandraRadio2[taskNumber] == "None"}
        />
        <FormControlLabel
          value="VeryEasy"
          control={<Radio sx={muiRadioStyle} />}
          label="Very Easy"
          name="isCorrect"
          checked={cassandraRadio2[taskNumber] == "VeryEasy"}
        />
        <FormControlLabel
          value="Easy"
          control={<Radio sx={muiRadioStyle} />}
          label="Easy"
          name="isCorrect"
          checked={cassandraRadio2[taskNumber] == "Easy"}
        />
        <FormControlLabel
          value="Normal"
          control={<Radio sx={muiRadioStyle} />}
          label="Normal"
          name="isCorrect"
          checked={cassandraRadio2[taskNumber] == "Normal"}
        />
        <FormControlLabel
          value="Difficult"
          control={<Radio sx={muiRadioStyle} />}
          label="Difficult"
          name="isCorrect"
          checked={cassandraRadio2[taskNumber] == "Difficult"}
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
