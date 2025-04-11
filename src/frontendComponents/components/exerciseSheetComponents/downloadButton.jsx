import React, { useState, useEffect } from "react";
import * as xlsx from "xlsx";
import Box from "@mui/material/Box";
import {
  fetchDownloadData,
  fetchTasksData,
  postTaskFormData,
} from "../../api/mainApi";
import { Button, Container } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useLocation, Link } from "react-router-dom";
import ImportantMsg from "../otherComponents/importantMsg";
import { useAuth } from "../../App";

export default function DownloadButton() {
  const { username } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get("title");
  const areaId = queryParams.get("areaId");
  //const [username, setUsername] = useState("");
  const [tasksArray, setTasksArray] = useState([]);
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

  //################# Functions  ######################################################
  const getDataFromDB = async (username) => {
    
    try {
      const data = await fetchDownloadData(areaId, username);
      setData(data);
      const data2 = await fetchTasksData(areaId);
      setTasksArray(data2);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 
  //#################  useEffect Function ######################################################
  useEffect(() => {
     const fetchUser = async () => {
      
      if (username) {
        
        getDataFromDB(username);
      }
    };

    fetchUser(); 
    
  }, []);

  const handleDownload = () => {
  getDataFromDB();
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

    for (let i = 0; i < data.length; i++) {
      const answer0 = data[i].statement_id || 0;
      const answer1 = data[i].query_text || "";
      const answer2 = data[i].result_size || 0;

      const answer3 = data[i].is_executable || "No";

      const answer4 = data[i].partial_solution || "";

      const answer5 = data[i].is_correct || "No";

      const answer6 = data[i].difficulty_level || "No answer";

      const answer7 = data[i].processing_time || 0;

      xlsx.utils.sheet_add_aoa(
        ws,
        [
          [
            answer0,
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
    xlsx.writeFile(wb, `DBMS-${title}-${username}.xlsx`);
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
  return (
    <Container>
        <ImportantMsg type="info" message="Please download your results as an excel file. Also make sure that the
        downloaded excel file is filled as expected. Before submitting your excel file, rename it by replacing NAME with your
        name. Upload your excel file to Moodle before the assignment deadline ends."/>
      <Button onClick={handleDownload}>
        Download Excel <DownloadIcon></DownloadIcon>
      </Button>
    </Container>
  );
}
