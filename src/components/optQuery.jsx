import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, InputLabel, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ResultTable from "./ResultTable";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-sql"; // SQL-Syntax-Highlighting
import ResultGraph from "./ResultGraph";
import ImportantMsg from "./importantMsg";

const OptQuery = ({ taskNumber, title }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Styles for mui components
  let muiButtonStyle = {
    backgroundColor: colors.blueAccent[100],
    color: colors.grey[900],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
  };

  let labelStyle = {
    color: colors.grey[100],
    fontSize: "16px"
  }

  const [queryResult, setQueryResult] = useState("");
  const [error, setError] = useState("");
  //const [taskNumberQuery, setTaskNumberQuery] = useState(taskNumber);
  const [username, setUsername] = useState(localStorage.getItem("token"));
  const [taskAreaId, setTaskAreaId] = useState(0);
  const [queryFormData, setQueryFormData] = useState({
    query:
      localStorage.getItem(`${title.toLowerCase()}query${taskNumber}`) || "",
    resultSize:
      localStorage.getItem(`${title.toLowerCase()}resultSize${taskNumber}`) ||
      0,
    isExecutable:
      localStorage.getItem(`${title.toLowerCase()}isExecutable${taskNumber}`) ||
      "No",
  });

  const handleEditorChange = (newContent) => {
    setQueryFormData({ ...queryFormData, query: newContent });
    saveToLocalStorage();
  };

  const saveToLocalStorage = () => {
    localStorage.setItem(
      `${title.toLowerCase()}query${taskNumber}`,
      queryFormData.query
    );
    localStorage.setItem(
      `${title.toLowerCase()}resultSize${taskNumber}`,
      queryFormData.resultSize
    );
    localStorage.setItem(
      `${title.toLowerCase()}isExecutable${taskNumber}`,
      queryFormData.isExecutable
    );
  };

  const sendDataToDb = async () => {
    let queryText = `${localStorage.getItem(`${title.toLowerCase()}query${taskNumber}`)}` ||  "";
    const dataToSend = {
      username:username.replace(/"/g, ''), //get rid of "" of the string
      statementId:taskNumber, 
      taskAreaId:taskAreaId,
      queryText:queryText.replace(/'/g, "''"), // get from child component
      isExecutable:localStorage.getItem(`${title.toLowerCase()}isExecutable${taskNumber}`) ||
      "No", // get from child component
      resultSize:localStorage.getItem(`${title.toLowerCase()}resultSize${taskNumber}`) ||
      0, // get from child component
      isCorrect: localStorage.getItem(`${title.toLowerCase()}isCorrect${taskNumber}`) ||
      "0", 
      
      
    }
     try {
      const response = await axios.post("/api/store-history-data", dataToSend);
      if (response.data.success) {
        console.log("Data stored successfully!");
      } else {
        console.error("Error occured:", response.data.error);
      }
    } catch (error) {
      console.error("Error server:", error);
    } 
  }

  const executeQuery = () => {
    sendDataToDb();
    console.log(taskNumber);
    setQueryResult("");
    const execQuery = queryFormData.query;
    let apiRoute = "";
    if (title === "PostgreSQL") {
      apiRoute = "/api/execute-sql";
    }
    if (title === "Cassandra") {
      apiRoute = "/api/execute-cql";
    }
    if (title === "Neo4J") {
      apiRoute = "/api/execute-cypher";
    }
    if (title === "MongoDB") {
      apiRoute = "/api/execute-mql";
    }
    axios
      .post(apiRoute, { execQuery })
      .then((response) => {
        setQueryResult(response.data);
        setQueryFormData(
          (prev) =>
            (prev = {
              query: execQuery,
              resultSize: response.data.length,
              isExecutable: "Yes",
            })
        );

        setError("");
        saveToLocalStorage();
      })
      .catch((error) => {
        setError(`Error: ${error.response.data.error}`);
        setQueryResult("");
        setQueryFormData(
          (prev) =>
            (prev = { query: execQuery, resultSize: 0, isExecutable: "No" })
        );
        saveToLocalStorage();
        
      });
  };
  saveToLocalStorage();

  useEffect(() => {
   
    let taskAreaId = 0;
    if (title === "PostgreSQL") {
      
      taskAreaId = 1;
    }
    if (title === "Cassandra") {
    
      taskAreaId = 2;
    }
    if (title === "Neo4J") {
      
      taskAreaId = 3;
    }
    if (title === "MongoDB") {
      
      taskAreaId = 4; 
    }
   
    setTaskAreaId(taskAreaId);
    setQueryFormData({
      query:
        localStorage.getItem(`${title.toLowerCase()}query${taskNumber}`) || "",
      resultSize:
        localStorage.getItem(`${title.toLowerCase()}resultSize${taskNumber}`) ||
        0,
      isExecutable:
        localStorage.getItem(
          `${title.toLowerCase()}isExecutable${taskNumber}`
        ) || "No",
    });
  }, [taskNumber]);
  return (
    <Box>
      <InputLabel id="query-input-label" style={labelStyle}>Type and run your query:</InputLabel>
      <p>{""}</p>
      <AceEditor
        id="query-input-label"
        name="query"
        mode="sql"
        onChange={handleEditorChange}
        value={queryFormData.query}
        editorProps={{ $blockScrolling: true }}
        style={{ width:"70%", height: "200px", fontSize: "large" }}
      />
      <p>{""}</p>
      <Button sx={muiButtonStyle} onClick={executeQuery}>
        Run query
      </Button>
      <p>{""}</p>
      {queryResult && <ImportantMsg message="Query was executed successfully!" type="success"/>}
       {title === "Neo4J" && queryResult && (
        <ResultGraph queryResult={queryResult} />
      )}
      <ResultTable
        queryResult={queryResult}
        resultSize={queryFormData.resultSize}
      />
      {error && <ImportantMsg message={error} type="error"/> }
      
      <Box sx={{padding: "10px", borderRadius:"5px", border: "black"}}>
        {<p>Result Size: {queryFormData.resultSize}</p>}
      {<p>Is the query executable?: {queryFormData.isExecutable}</p>}
      </Box>
      
    </Box>
  );
};

export default OptQuery;
