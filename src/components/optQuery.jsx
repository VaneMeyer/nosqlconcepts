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
    fontSize: "16px",
  };

  const [queryResult, setQueryResult] = useState("");
  const [solutionResult, setSolutionResult] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("error");
  const [error, setError] = useState("");
  //const [taskNumberQuery, setTaskNumberQuery] = useState(taskNumber);
  const [username, setUsername] = useState(localStorage.getItem("token"));
  const [taskAreaId, setTaskAreaId] = useState(0);
  const [queryFormData, setQueryFormData] = useState({
    query:
      localStorage.getItem(
        `${title.toLowerCase()}query_${username}_${taskNumber}`
      ) || "",
    resultSize:
      localStorage.getItem(
        `${title.toLowerCase()}resultSize_${username}_${taskNumber}`
      ) || 0,
    isExecutable:
      localStorage.getItem(
        `${title.toLowerCase()}isExecutable_${username}_${taskNumber}`
      ) || "No",
  });

  const handleEditorChange = (newContent) => {
    setQueryFormData({ ...queryFormData, query: newContent });
    saveToLocalStorage();
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
    //console.log(taskNumber);
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
      .post(apiRoute, { execQuery, taskNumber, taskAreaId })
      .then((response) => {
        setQueryResult(response.data.userQueryResult);
        setSolutionResult(response.data.expectedResult);
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
          console.log("correct");
          setFeedbackType("success");
        } else {
        /* else if(response.data.expectedResult === "no solution"){
          setFeedback("no solution to compare to")
          setFeedbackType("info");
        } */
          setFeedback(
            "Not correct (does not match the expected output)! Please try again, if you think that this task is solvable with a query. You can also write a comment in the partial solution textfield, explaining why your solution is correct. In some cases this message occurs because there is no (or no clear) solution query  (use the textfield for your solution then)."
          );
          console.log("not correct");
          setFeedbackType("error");
        }
        setError("");
        saveToLocalStorage();
        //console.log(response.data.userQueryResult);
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

  useEffect(() => {
    setTaskAreaId(taskarea);
    setQueryFormData({
      query:
        localStorage.getItem(
          `${title.toLowerCase()}query_${username}_${taskNumber}`
        ) || "",
      resultSize:
        localStorage.getItem(
          `${title.toLowerCase()}resultSize_${username}_${taskNumber}`
        ) || 0,
      isExecutable:
        localStorage.getItem(
          `${title.toLowerCase()}isExecutable_${username}_${taskNumber}`
        ) || "No",
    });
  }, [taskNumber]);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%" }}>
        <Box>
          <InputLabel id="query-input-label" style={labelStyle}>
            Type and run your query:
          </InputLabel>
          <p>{""}</p>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="sql"
            onChange={handleEditorChange}
            value={queryFormData.query}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "200px" /* , fontSize: "large" */ }}
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
          {title === "Neo4J" && queryResult && (
            <ResultGraph queryResult={queryResult} />
          )}
          <ResultTable
            queryResult={queryResult}
            resultSize={queryFormData.resultSize}
          />
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
//only store in DB version
/* import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, InputLabel, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ResultTable from "./ResultTable";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-sql"; // SQL-Syntax-Highlighting
import ResultGraph from "./ResultGraph";
import ImportantMsg from "./importantMsg";
import Feedback from "./feedback";

const OptQuery = ({
  taskNumber,
  title,
  queryText,
  isExecutable,
  resultSize,
  isCorrect,
  onGetData,
}) => {
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
    fontSize: "16px",
  };

  const [queryResult, setQueryResult] = useState("");
  const [error, setError] = useState("");
  //const [taskNumberQuery, setTaskNumberQuery] = useState(taskNumber);
  const [username, setUsername] = useState(localStorage.getItem("token"));
  const [taskAreaId, setTaskAreaId] = useState(0);
  const [queryFormData, setQueryFormData] = useState({
    query: "",
    resultSize: 0,
    isExecutable: false,
  });

  const handleEditorChange = (newContent) => {
    setQueryFormData({ ...queryFormData, query: newContent });
    //saveToLocalStorage();
  };

 

  const sendDataToDb = async () => {
    //let queryText = `${localStorage.getItem(`${title.toLowerCase()}query${taskNumber}`)}` ||  "";
    const dataToSend = {
      username: username.replace(/"/g, ""), //get rid of "" of the string
      statementId: taskNumber,
      taskAreaId: taskAreaId,
      queryText: queryFormData.query.replace(/'/g, "''"), // get from child component
      isExecutable: queryFormData.isExecutable,
      resultSize: queryFormData.resultSize,
      isCorrect: isCorrect,
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

  const sendDataBackToParent = () => {
    onGetData({
      queryText: queryFormData.query,
      isExecutable: queryFormData.isExecutable,
      resultSize: queryFormData.resultSize,
    });
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
              isExecutable: true,
            })
        );

        setError("");
      })
      .catch((error) => {
        setError(`Error: ${error.response.data.error}`);
        setQueryResult("");
        setQueryFormData(
          (prev) =>
            (prev = { query: execQuery, resultSize: 0, isExecutable: false })
        );
      });
    sendDataToDb();
    sendDataBackToParent();
  };
 

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
    //fetchData();
    setTaskAreaId(taskAreaId);
    setQueryFormData({
      query: queryText || "",
      resultSize: resultSize || 0,
      isExecutable: isExecutable || false,
    });
  }, [taskNumber]);

  return (
    <Box>
      <InputLabel id="query-input-label" style={labelStyle}>
        Type and run your query:
      </InputLabel>
      <p>{""}</p>
      <AceEditor
        id="query-input-label"
        name="query"
        mode="sql"
        onChange={handleEditorChange}
        value={queryFormData.query}
        editorProps={{ $blockScrolling: true }}
        style={{ width: "70%", height: "200px", fontSize: "large" }}
      />
      <p>{""}</p>
      <Button sx={muiButtonStyle} onClick={executeQuery}>
        Run query
      </Button>
      <p>{""}</p>
      {queryResult && (
        <ImportantMsg
          message="Query was executed successfully!"
          type="success"
        />
      )}

      {title === "Neo4J" && queryResult && (
        <ResultGraph queryResult={queryResult} />
      )}
      <ResultTable
        queryResult={queryResult}
        resultSize={queryFormData.resultSize}
      />
      {error && <ImportantMsg message={error} type="error" />}
      <Feedback queryResult={queryResult} />
      <Box sx={{ padding: "10px", borderRadius: "5px", border: "black" }}>
        {<p>Result Size: {queryFormData.resultSize}</p>}
        {
          <p>
            Is the query executable?:{" "}
            {queryFormData.isExecutable ? "Yes" : "No"}
          </p>
        }
      </Box>
    </Box>
  );
};

export default OptQuery;
 */
