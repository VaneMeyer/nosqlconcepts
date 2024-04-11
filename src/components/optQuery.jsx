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
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";

const OptQuery = ({ taskNumber, title, taskarea }) => {
  //################# Style Settings ######################################################
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Styles for mui components
  let muiButtonStyle = {
    backgroundColor: colors.custom01[100],
    color: colors.grey[900],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
  };

  let labelStyle = {
    color: colors.grey[100],
    fontSize: "16px",
  };
  //################# State Variables ######################################################
  const [queryResult, setQueryResult] = useState("");
  const [numNodes, setNumNodes] = useState(0);
  const [numEdges, setNumEdges] = useState(0);
  const [solutionResult, setSolutionResult] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("error");
  const [error, setError] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("token"));
  const [taskAreaId, setTaskAreaId] = useState(0);
  const [queryFormData, setQueryFormData] = useState({
    query: "",
    resultSize:0,
    isExecutable: "No",
  });

  //################# handle Functions ######################################################
  const handleEditorChange = (newContent) => {
    setQueryFormData({ ...queryFormData, query: newContent });
    saveToLocalStorage();
  };
  const handleGetNodeAndEdgeCount = (nodes, edges) => {
    setNumNodes(nodes);
    setNumEdges(edges);
  };
  //################# Functions ######################################################
  const getDataFromDB = (tasknumber) => {
    let modifiedUser = username.replace(/"/g, "");
    axios
      .post("/getQueryDataFromDB", { taskarea, modifiedUser, tasknumber })
      .then((response) => {
        let formDataObj = {};
        if (response.data.length !== 0) {
            formDataObj = {
            query: response.data[0].query_text || "",
            resultSize: response.data[0].result_size || "0",
            isExecutable: response.data[0].is_executable || "0",
          }}
          else {
            formDataObj = {
              query: "",
              resultSize: 0,
              isExecutable:  "No",
            }
          }
          setQueryFormData(formDataObj);
          console.log(formDataObj);
         
        
        
       
      })
      .catch((error) => {
        console.error("Failed to get data from db");
      });
  };

  const saveToLocalStorage = () => {
    localStorage.setItem(
      `${title.toLowerCase()}query_${username}_${taskNumber}`,
      queryFormData.query
    );
    localStorage.setItem(
      `${title.toLowerCase()}resultSize_${username}_${taskNumber}`,
      queryFormData.resultSize
    );
    localStorage.setItem(
      `${title.toLowerCase()}isExecutable_${username}_${taskNumber}`,
      queryFormData.isExecutable
    );
  };

  const sendDataToDb = async () => {
    let queryText =
      `${localStorage.getItem(
        `${title.toLowerCase()}query_${username}_${taskNumber}`
      )}` || "";
    const dataToSend = {
      username: username.replace(/"/g, ""), // get rid of "" of the string
      statementId: taskNumber,
      taskAreaId: taskAreaId,
      queryText: queryText.replace(/'/g, "''"), // get from child component
      isExecutable:
        localStorage.getItem(
          `${title.toLowerCase()}isExecutable_${username}_${taskNumber}`
        ) || "No", // get from child component
      resultSize:
        localStorage.getItem(
          `${title.toLowerCase()}resultSize_${username}_${taskNumber}`
        ) || 0, // get from child component
      isCorrect:
        localStorage.getItem(
          `${title.toLowerCase()}isCorrect_${username}_${taskNumber}`
        ) || "0",
    };

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
  };

  const executeQuery = () => {
  
    sendDataToDb();

    setQueryResult("");
    const execQuery = queryFormData.query;
    let apiRoute = "";
    if (title === "PostgreSQL" || title === "Lab Assignment 1") {
      apiRoute = "/api/execute-sql";
    }
    if (title === "Cassandra") {
      apiRoute = "/api/execute-cql";
    }
    if (title === "Neo4J" || title === "Lab Assignment 2") {
      apiRoute = "/api/execute-cypher";
    }
    if (title === "MongoDB") {
      apiRoute = "/api/execute-mql";
    }

    axios
      .post(apiRoute, { execQuery, taskNumber, taskAreaId })
      .then((response) => {
        setQueryResult(response.data.userQueryResult);
        setSolutionResult(response.data.expectedResult);
        //console.log(response.data.userQueryResult);
        setQueryFormData(
          (prev) =>
            (prev = {
              query: execQuery,
              resultSize: response.data.userQueryResult.length,
              isExecutable: "Yes",
            })
        );

        if (
          JSON.stringify(response.data.userQueryResult) ===
          JSON.stringify(response.data.expectedResult)
        ) {
          setFeedback(
            "Correct! Your query output is equal to the expected output."
          );
          
          setFeedbackType("success");
        } else {
          /* else if(response.data.expectedResult === "no solution"){
          setFeedback("no solution to compare to")
          setFeedbackType("info");
        } */
          setFeedback(
            "Your output does not match the expected output (if there is an expected output). Please try again, if you think that this task is solvable with a query. You can also write a comment in the partial solution textfield, explaining why your solution is correct. In some cases this message occurs because there is no expected output."
          );
        
          setFeedbackType("error");
        }
        setError("");
        saveToLocalStorage();
      })
      .catch((error) => {
        setError(
          `Error: ${error.response.data.error}. Note: Please try again, if you think that this task is solvable with a query. You can also write a comment in the partial solution textfield, explaining why your solution is correct. In some cases this message occurs because there is no solution query (use the textfield for your solution then).`
        );
        setQueryResult("");
        setQueryFormData(
          (prev) =>
            (prev = { query: execQuery, resultSize: 0, isExecutable: "No" })
        );
        saveToLocalStorage();
      });
  };
  saveToLocalStorage();
  //################# useEffect Function ######################################################
  useEffect(() => {
    setTaskAreaId(taskarea);
    getDataFromDB(taskNumber);
  }, [taskNumber]);
  //################# Frontend ######################################################
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%" }}>
        <Box>
          <InputLabel id="query-input-label" style={labelStyle}>
            Type and run your query if you think this task is solvable with a
            query. Otherwise use the partial solution textfield below.
          </InputLabel>
          <p>{""}</p>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="sql"
            onChange={handleEditorChange}
            value={queryFormData.query}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "200px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <p>{""}</p>
          <Button sx={muiButtonStyle} onClick={executeQuery}>
            Run query
            <PlayCircleFilledWhiteIcon></PlayCircleFilledWhiteIcon>
          </Button>
          <p>{""}</p>
          {queryResult && (
            <ImportantMsg
              message="Query was executed successfully!"
              type="success"
            />
          )}
          {queryResult && (
            <ImportantMsg message={feedback} type={feedbackType} />
          )}
          {(title === "Neo4J" || title === "Lab Assignment 2") &&
            queryResult && (
              <ResultGraph
                queryResult={queryResult}
                onGetNodeAndEdgeCount={handleGetNodeAndEdgeCount}
              />
            )}
          {numNodes === 0 && numEdges === 0 && (
            <ResultTable
              queryResult={queryResult}
              resultSize={queryFormData.resultSize}
              title={title}
            />
          )}

          {error && <ImportantMsg message={error} type="error" />}

          <Box sx={{ padding: "10px", borderRadius: "5px", border: "black" }}>
            {<p>Result Size: {queryFormData.resultSize}</p>}
            {<p>Is the query executable?: {queryFormData.isExecutable}</p>}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default OptQuery;
