import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, InputLabel, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ResultTable from "./ResultTable";

const MQLQuery = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  /* Styles for mui components */
  let muiButtonStyle = {
    backgroundColor: colors.blueAccent[700],
    color: colors.grey[100],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
  };
  const [mqlQuery, setMqlQuery] = useState("");
  const [queryResult, setQueryResult] = useState("");
  const [resultSize, setResultSize] = useState(0);
  const [error, setError] = useState("");
  const [isExecutable, setIsExecutable] = useState(false);

  const executeQuery = async () => {
    setQueryResult("");
    setResultSize(0);

    try {
      const response = await axios.post("/api/execute-mql", { mqlQuery });
      setQueryResult(response.data);
      setResultSize(response.data.length);
      setIsExecutable(true);
      setError("");
      console.log(response.data);
    } catch (error) {
      console.error("Error executing query:", error);
      setError("Error: Please check your Syntax");
      setQueryResult("");
      setIsExecutable(false);
    }
    /* axios
      .post("/api/execute-mql", { mqlQuery })
      .then((response) => {
        setQueryResult(response.data);
        setResultSize(response.data.length);
        setIsExecutable(true);
        setError("");
        console.log(response.data);
      })
      .catch((error) => {
        setError("Error: Please check your Syntax");
        setQueryResult("");
        setIsExecutable(false);
      }); */
  };

  return (
    <Box>
      <InputLabel id="query-input-label">Your query:</InputLabel>
      <TextField
        id="query-input-label"
        type="text"
        fullWidth
        value={mqlQuery}
        onChange={(event) => setMqlQuery(event.target.value)}
      />
      <Button sx={muiButtonStyle} onClick={executeQuery}>
        Run query
      </Button>
      {/* <pre>{queryResult}</pre> */}
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
  );
};

export default MQLQuery;