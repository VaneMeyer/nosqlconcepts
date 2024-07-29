import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { neo4jTasksOnSite, pgTasks, pgTasksOnSite } from "../data/tasks";
import { cassandraTasks } from "../data/tasks";
import { neo4jTasks } from "../data/tasks";
import { mongodbTasks } from "../data/tasks";
import axios from "axios";

const ProgressCircle = ({ title, size = "50" }) => {
  //################# Style Settings ######################################################
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //################# State Variables ######################################################
  const [username, setUsername] = useState(localStorage.getItem("token"));
  const [data, setData] = useState({
    taskNumber: 0,
    query: "",
    resultSize: 0,
    isExecutable: "No",
    partialSolution: "",
    isCorrect: "No",
    difficulty: "No answer",
    time: 0,
  });


  //################# Main Functionality ######################################################
  let progress = "0";
  let progressCounter = 0;
  let taskarray = [""];
  let taskarea = 0;

  if (title === "PostgreSQL") {
    taskarray = pgTasks;
    taskarea = 1;
  }
  if (title === "Neo4J") {
    taskarray = neo4jTasks;
    taskarea = 3;
  }
  if (title === "Cassandra") {
    taskarray = cassandraTasks;
    taskarea = 2;
  }
  if (title === "MongoDB") {
    taskarray = mongodbTasks;
    taskarea = 4;
  }
  if (title === "Lab Assignment 1") {
    taskarray = pgTasksOnSite;
    taskarea = 5;
  }
  if (title === "Lab Assignment 2") {
    taskarray = neo4jTasksOnSite;
    taskarea = 6;
  }
  for (let i = 0; i < data.length; i++) {
    const answer1 =
     data[i].query_text || "";
    const answer4 =
     data[i].partial_solution || "";
 /*    const answer5 =
      localStorage.getItem(
        `${title.toLowerCase()}isCorrect_${username}_${i}`
      ) || "0";
    const answer6 =
      localStorage.getItem(
        `${title.toLowerCase()}difficulty_${username}_${i}`
      ) || "0"; */

    if (answer1 !== "") {
      progressCounter += 1;
    }
    if (answer4 !== "") {
      progressCounter += 1;
    }
   /*  if (answer5 !== "0") {
      progressCounter += 1;
    }
    if (answer6 !== "0") {
      progressCounter += 1;
    } */

    
  }
let numberOfInputs = 2 * taskarray.length;
    if (numberOfInputs !== 0) {
      progress = progressCounter / numberOfInputs;
    }
  const angle = progress * 360;

    //################# Functions  ######################################################
    const getDataFromDB = () => {
   
      let modifiedUser = username.replace(/"/g, "");
      axios
        .post("/getDownloadDataFromDB", { taskarea, modifiedUser })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Failed to get data from db");
        });
    };
  //#################  useEffect Function ######################################################
  useEffect(() => {
    getDataFromDB();
  }, []);
  //################# Frontend ######################################################
  return (
    <Box>
      <Box
        sx={{
          background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[900]} ${angle}deg 360deg),
            ${colors.blueAccent[100]}`, //blueAccent 500, greenAccent 500
          borderRadius: "50%",
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
      <Box aria-labelledby="Your current progress of this task area">
        <Typography aria-label="Your current progress of this task area" textAlign="center">{`${
          progress.toFixed(2) * 100
        }%`}</Typography>
      </Box>
    </Box>
  );
};

export default ProgressCircle;
