import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, TextField, InputLabel, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ResultTable from "./ResultTable";

const SQLQuery = ({ taskNumber, onDataFromChild }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Styles for mui components
  let muiButtonStyle = {
    backgroundColor: colors.blueAccent[700],
    color: colors.grey[100],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
  };
  const [sqlQuery, setSqlQuery] = useState("");
  const [queryResult, setQueryResult] = useState("");
  const [resultSize, setResultSize] = useState(0);
  const [error, setError] = useState("");
  const [isExecutable, setIsExecutable] = useState(false);

  const [queryFormData, setQueryFormData] = useState({
    sqlQuery: localStorage.getItem(`sqlQuery${taskNumber}`) || "",
    resultSize: localStorage.getItem(`resultSize${taskNumber}`) || 0,
    isExecutable: localStorage.getItem(`isExecutable${taskNumber}`) || false,
  });
  const saveToLocalStorage = () => {
    localStorage.setItem(`sqlQuery${taskNumber}`, queryFormData.sqlQuery);
    localStorage.setItem(`resultSize${taskNumber}`, resultSize);
    localStorage.setItem(`isExecutable${taskNumber}`, isExecutable);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    saveToLocalStorage();
    //localStorage.setItem(`answer${taskNumber}`, JSON.stringify({ ...pgFormData, [name]: value }));
    //localStorage.setItem('pgFormData', JSON.stringify({ ...pgFormData, [name]: value }));
    setQueryFormData({ ...queryFormData, [name]: value });
    setSqlQuery(event.target.value);
  };

  const executeQuery = () => {
    //saveToLocalStorage();
    sendDataToParent();
    setQueryResult("");
    setResultSize(0);
    //setIsExecutable(false);
    axios
      .post("/api/execute-sql", { sqlQuery })
      .then((response) => {
        setQueryResult(response.data);
        setResultSize(response.data.length);
        setIsExecutable(true);
        setError("");
        saveToLocalStorage();
        console.log(response.data);
      })
      .catch((error) => {
        setError("Error: Please check your Syntax");
        setQueryResult("");
        setIsExecutable(false);
      });
  };
  const sendDataToParent = () => {
    // Hier senden wir Daten an die Elternkomponente
    onDataFromChild(sqlQuery);
  };
  useEffect(() => {
    setQueryFormData({
      sqlQuery: localStorage.getItem(`sqlQuery${taskNumber}`) || "",
      resultSize: localStorage.getItem(`resultSize${taskNumber}`) || 0,
      isExecutable: localStorage.getItem(`isExecutable${taskNumber}`) || false,
    });
    setSqlQuery(localStorage.getItem(`sqlQuery${taskNumber}`) || "");
    setResultSize(localStorage.getItem(`resultSize${taskNumber}`) || 0);
    setIsExecutable(localStorage.getItem(`isExecutable${taskNumber}`) || false);
  }, [taskNumber]);
  return (
    <Box>
      <InputLabel id="query-input-label">Your query:</InputLabel>
      <TextField
        name="sqlQuery"
        id="query-input-label"
        type="text"
        fullWidth
        value={queryFormData.sqlQuery}
        onChange={handleChange}
        /* value={sqlQuery}
        onChange={(event) => setSqlQuery(event.target.value)} */
      />
      <Button sx={muiButtonStyle} onClick={executeQuery}>
        Run query
      </Button>
      <ResultTable queryResult={queryResult} resultSize={resultSize} />

      {<p>Result Size: {resultSize}</p>}
      {<p>Is the query executable?: {isExecutable ? "Yes" : "No"}</p>}
      {error && <p>{error}</p>}
    </Box>
  );
};

export default SQLQuery;

/* import React, { useState } from "react"
import axios from "axios"
import { Box, Button, TextField, InputLabel, useTheme } from "@mui/material"
import { tokens } from "../theme"
import ResultTable from "./ResultTable"

const SQLQuery = ({ sqlQuery, setSqlQuery, taskNumber }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  // Styles for mui components 
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
      
      {<p>Result Size: {resultSize}</p>}
      {<p>Is the query executable?: {isExecutable ? "Yes" : "No"}</p>}
      {error && <p>{error}</p>}
    </Box>
  )
}

export default SQLQuery */
