import React, { useState } from "react"
import axios from "axios"
import { Box, Button, TextField, InputLabel, useTheme } from "@mui/material"
import { tokens } from "../theme"
import ResultTable from "./ResultTable"

const SQLQuery = ({ sqlQuery, setSqlQuery, taskNumber }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  /* Styles for mui components */
  let muiButtonStyle = {
    backgroundColor: colors.blueAccent[700],
    color: colors.grey[100],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
  }

  const [queryResult, setQueryResult] = useState("")
  const [resultSize, setResultSize] = useState(0)
  const [error, setError] = useState("")
  const [isExecutable, setIsExecutable] = useState(false)

  const handleChange = (index, value) => {
    let newTask = [...sqlQuery]
    newTask[index] = value
    setSqlQuery(newTask)
  }
  const sqlDataFromDb = JSON.parse(localStorage.getItem("mysqlQuery"))

  const executeQuery = () => {
    setQueryResult("")
    setResultSize(0)
    axios
      .post("/api/execute-sql", { sqlQuery })
      .then((response) => {
        setQueryResult(response.data)
        setResultSize(response.data.length)
        setIsExecutable(true)
        setError("")
        console.log(response.data)
      })
      .catch((error) => {
        setError("Error: Please check your Syntax")
        setQueryResult("")
        setIsExecutable(false)
      })
  }

  //console.log(sqlDataFromDb.mysql)

  return (
    <Box>
      <InputLabel id="query-input-label">Your query:</InputLabel>
      <TextField
        id="query-input-label"
        type="text"
        name="mysql"
        fullWidth
        value={sqlQuery[taskNumber] || ""}
        onChange={(e) => handleChange(taskNumber, e.target.value)}
      />
      <Button sx={muiButtonStyle} onClick={executeQuery}>
        Run query
      </Button>
      <ResultTable queryResult={queryResult} resultSize={resultSize} />
      {/* {queryResult && (
        <ul>
          {queryResult.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )} */}
      {<p>Result Size: {resultSize}</p>}
      {<p>Is the query executable?: {isExecutable ? "Yes" : "No"}</p>}
      {error && <p>{error}</p>}
    </Box>
  )
}

export default SQLQuery
