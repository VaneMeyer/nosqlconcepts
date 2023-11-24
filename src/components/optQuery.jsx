import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, InputLabel, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ResultTable from "./ResultTable";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-sql"; // SQL-Syntax-Highlighting
import ResultGraph from "./ResultGraph";

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

  const executeQuery = () => {
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
      {/* {title === "Neo4J" && queryResult && (
        <ResultGraph queryResult={queryResult} />
      )} */}
       {title === "Neo4J" && queryResult && (
        <ResultGraph queryResult={queryResult} />
      )}
      <ResultTable
        queryResult={queryResult}
        resultSize={queryFormData.resultSize}
      />
      {error && <p style={{ fontWeight: "bold", padding: "10px", borderRadius:"5px", backgroundColor:`${colors.redAccent[700]}` }}>{error}</p>}
      <Box sx={{padding: "10px", borderRadius:"5px", border: "black"}}>
        {<p>Result Size: {queryFormData.resultSize}</p>}
      {<p>Is the query executable?: {queryFormData.isExecutable}</p>}
      </Box>
      
    </Box>
  );
};

export default OptQuery;
