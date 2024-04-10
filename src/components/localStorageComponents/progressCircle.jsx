import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { pgTasks } from "../data/tasks";
import { cassandraTasks } from "../data/tasks";
import { neo4jTasks } from "../data/tasks";
import { mongodbTasks } from "../data/tasks";

const ProgressCircle = ({ title, size = "50" }) => {
  //################# Style Settings ######################################################
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //################# State Variables ######################################################
  const [username, setUsername] = useState(localStorage.getItem("token"));

  //################# Main Functionality ######################################################
  let progress = "0";
  let progressCounter = 0;
  let taskarray = [""];

  if (title === "PostgreSQL") {
    taskarray = pgTasks;
  }
  if (title === "Neo4J") {
    taskarray = neo4jTasks;
  }
  if (title === "Cassandra") {
    taskarray = cassandraTasks;
  }
  if (title === "MongoDB") {
    taskarray = mongodbTasks;
  }
  for (let i = 1; i <= taskarray.length; i++) {
    const answer1 =
      localStorage.getItem(`${title.toLowerCase()}query_${username}_${i}`) ||
      "";
    const answer4 =
      localStorage.getItem(
        `${title.toLowerCase()}partialSolution_${username}_${i}`
      ) || "";
    const answer5 =
      localStorage.getItem(
        `${title.toLowerCase()}isCorrect_${username}_${i}`
      ) || "0";
    const answer6 =
      localStorage.getItem(
        `${title.toLowerCase()}difficulty_${username}_${i}`
      ) || "0";

    if (answer1 !== "") {
      progressCounter += 1;
    }
    if (answer4 !== "") {
      progressCounter += 1;
    }
    if (answer5 !== "0") {
      progressCounter += 1;
    }
    if (answer6 !== "0") {
      progressCounter += 1;
    }

    let numberOfInputs = 4 * taskarray.length;
    if (numberOfInputs !== 0) {
      progress = progressCounter / numberOfInputs;
    }
  }

  const angle = progress * 360;

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
      <Box>
        <Typography textAlign="center">{`${
          progress.toFixed(2) * 100
        }%`}</Typography>
      </Box>
    </Box>
  );
};

export default ProgressCircle;