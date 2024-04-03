import React, { useState } from "react";
import * as xlsx from "xlsx";
import { Button, useTheme, Box, Typography } from "@mui/material";
import { neo4jTasksOnSite, pgTasks, pgTasksOnSite } from "../data/tasks";
import { cassandraTasks } from "../data/tasks";
import { neo4jTasks } from "../data/tasks";
import { mongodbTasks } from "../data/tasks";
import { useLocation, Link } from "react-router-dom";
import { tokens } from "../theme";
import DownloadIcon from '@mui/icons-material/Download';

const OptDownload = () => {
  //################# General ######################################################
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get("title");
  //################# Style Settings ######################################################
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // Styles for mui components
  let muiButtonStyle = {
    backgroundColor: colors.blueAccent[100],
    color: colors.grey[900],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
    margin: "10px",
  };
  //################# State Variables ######################################################
  const [username, setUsername] = useState(localStorage.getItem("token"));
  
//################# Handle Functions ######################################################
  const handleDownload = () => {
    const header = [
      "taskNumber",
      "query",
      "resultSize",
      "isExecutable",
      "partialSolution",
      "isCorrect",
      "difficulty",
      "time",
    ];
    const ws = xlsx.utils.aoa_to_sheet([header]);

    // 5 tasks for on site session
    let taskarray = "";
    if (title === "PostgreSQL") {
      taskarray = pgTasks;
    }
    if (title === "Cassandra") {
      taskarray = cassandraTasks;
    }
    if (title === "Neo4J") {
      taskarray = neo4jTasks;
    }
    if (title === "MongoDB") {
      taskarray = mongodbTasks;
    }
    if (title === "Lab Assignment 1") {
      taskarray = pgTasksOnSite;
    }
    if (title === "Lab Assignment 2") {
      taskarray = neo4jTasksOnSite;
    }
   
    for (let i = 1; i <= taskarray.length; i++) {
      const answer1 = localStorage.getItem(`${title.toLowerCase()}query_${username}_${i}`) || "";
      const answer2 = localStorage.getItem(`${title.toLowerCase()}resultSize_${username}_${i}`) || "0";
      const answer3 = localStorage.getItem(`${title.toLowerCase()}isExecutable_${username}_${i}`) || "";
      const answer4 = localStorage.getItem(`${title.toLowerCase()}partialSolution_${username}_${i}`) || "";
      const answer5 = localStorage.getItem(`${title.toLowerCase()}isCorrect_${username}_${i}`) || "0";
      const answer6 = localStorage.getItem(`${title.toLowerCase()}difficulty_${username}_${i}`) || "0";
      const answer7 = localStorage.getItem(`${title.toLowerCase()}time_${username}_${i}`) || "0";
    
      xlsx.utils.sheet_add_aoa(
        ws,
        [
          [
            i,
            answer1,
            answer2,
            answer3,
            answer4,
            answer5,
            answer6,
            formatTime(answer7),
          ],
        ],
        { origin: -1 }
      );
    }
    

    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "fileData");
    xlsx.writeFile(wb, `DBMS-${title}-NAME.xlsx`);
  };

  //################# Functions ######################################################
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
    const seconds = timeInSeconds - hours * 3600 - minutes * 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
//################# Frontend ######################################################
  return (
    <div style={{
      margin:"50px"
    }}>
      <p style={{fontSize:"16px"}}>
        Please download your results as an excel file. Also make sure that the
        downloaded excel file is filled as expected and please add your name to
        the file.{" "}
      </p>
      <p>
        Before submitting your excel file, rename it by replacing NAME with your
        name.
      </p>
      <Button sx={muiButtonStyle} onClick={handleDownload}>
        Download Excel <DownloadIcon></DownloadIcon>
      </Button>
      <Box p={7}>
            <Typography variant="p" sx={{ padding: "30px 30px 0 30px", fontSize: '20px' }}>
              Please fill the questionnaire on the following link before leaving: {" "}
              <Link to="https://survey.studiumdigitale.uni-frankfurt.de/nosqlconcepts" target="_blank" rel="noopener noreferrer">SoSci Survey Link</Link>
          
            </Typography>
          </Box>
    </div>
  );
};
export default OptDownload;
