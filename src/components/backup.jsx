import React, { useState } from "react";
import axios from "axios";
import { Button, useTheme} from "@mui/material";
import { tokens } from "../theme";
import DownloadIcon from "@mui/icons-material/Download";
import ImportantMsg from "./importantMsg";
import ResultTable from "./ResultTable";
const BackupC = () => {
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
    margin: "10px",
  };
  //################# State Variables ######################################################
  const [username, setUsername] = useState(
    localStorage.getItem("token").replace(/"/g, "")
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userdata, setUserdata] = useState("");
  //################# Functions ######################################################
  const getDataFromDB = () => {
    axios
      .post("/get-backup-data", { username })
      .then((response) => {
        setError("");
        setSuccess("Fetching data successful");
        setUserdata(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setError(`Fetching data failed`);
        setSuccess("");
      });
  };

  const fillSheets = () => {
    if (!userdata) return;

    userdata.forEach((element) => {
      let title = "";

      switch (element.taskareaid) {
        case 1:
          title = "PostgreSQL";
          break;
        case 2:
          title = "Cassandra";
          break;
        case 3:
          title = "Neo4J";
          break;
        case 4:
          title = "MongoDB";
          break;
        case 5:
          title = "Lab Assignment 1";
          break;
        case 6:
          title = "Lab Assignment 2";
          break;
        default:
          break;
      }
      localStorage.setItem(
        `${title.toLowerCase()}query_${username}_${element.tasknumber}`,
        element.querytext
      );
      localStorage.setItem(
        `${title.toLowerCase()}resultSize_${username}_${element.tasknumber}`,
        element.resultsize
      );
      localStorage.setItem(
        `${title.toLowerCase()}isExecutable_${username}_${
          element.tasknumber
        }`,
        element.isexecutable
      );
      localStorage.setItem(
        `${title.toLowerCase()}partialSolution_${username}_${
          element.tasknumber
        }`,
        element.partialsolution
      );
      localStorage.setItem(
        `${title.toLowerCase()}isCorrect_${username}_${element.tasknumber}`,
        element.iscorrect
      );
      localStorage.setItem(
        `${title.toLowerCase()}difficulty_${username}_${element.tasknumber}`,
        element.difficulty
      );
      localStorage.setItem(
        `${title.toLowerCase()}time_${username}_${element.tasknumber}`,
        element.time
      );
      console.log(localStorage.getItem(
        `${title.toLowerCase()}query_${username}_${element.tasknumber}`))
      console.log(localStorage.getItem(
        `${"PostgreSQL".toLowerCase()}query_${username}_${1}`))
      /* const localStorageKeys = [
        "query",
        "resultSize",
        "isExecutable",
        "partialSolution",
        "isCorrect",
        "difficulty",
        "time",
      ];

      localStorageKeys.forEach((key) => {
        const localStorageKey = `${title.toLowerCase()}${key}_${username}_${
          element.tasknumber
        }`;
        let elementValue = element[key.toLowerCase()];

        if (key === "time" || key === "resultSize") {
          elementValue = Number(elementValue);
        }

        localStorage.setItem(localStorageKey, elementValue);
        console.log(localStorage.getItem(localStorageKey))
      }); */
    });

    alert("filled");
  };

  //################# Frontend ######################################################
  return (
    <div
      style={{
        margin: "50px",
      }}
    >
      <p style={{ fontSize: "16px" }}>
        Have your entries been lost? This can happen if the localStorage is
        cleared. But don't worry, we've saved your entries in the database.
        Click the button below to retrieve your data, which was last saved in
        the database. 
      </p>

      <Button sx={muiButtonStyle} onClick={getDataFromDB}>
        Get your data <DownloadIcon></DownloadIcon>
      </Button>
      {error && <ImportantMsg message={error} type="error" />}
      {success && (
        <div>
         {/*  <Button sx={muiButtonStyle} onClick={fillSheets}>
            Fill task sheets with the data
          </Button> */}
          <ImportantMsg message={success} type="success" />
          <p>taskareaIds: 1 = PostgreSQL, 2 = Cassandra, 3 = Neo4J, 4 = MongoDB, 5 = Lab Assignment 1, 6 = Lab Assignment 2; time is shown in seconds</p>
          <ResultTable
            queryResult={userdata}
            resultSize={userdata.length}
            title={""}
          />
        </div>
      )}
    </div>
  );
};

export default BackupC;
