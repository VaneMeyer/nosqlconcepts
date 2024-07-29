import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { fetchDownloadData, fetchTasksData } from "../api/mainApi";
import { checkAuth } from "../api/loginApi";

export default function GaugeChartC({ areaId }) {
  const [username, setUsername] = useState("");
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

  let progress = "0";
  let progressCounter = 0;

  for (let i = 0; i < data.length; i++) {
    const answer1 = data[i].query_text || "";
    const answer4 = data[i].partial_solution || "";

    if (answer1 !== "") {
      progressCounter += 1;
    }
    if (answer4 !== "") {
      progressCounter += 1;
    }
  }

  let numberOfInputs = 2 * tasksArray.length;
  if (numberOfInputs !== 0) {
    progress = progressCounter / numberOfInputs;
  }

  const percentValue = (progress * 100).toFixed(0); // Nur eine Nachkommastelle

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
      const user = await checkAuth();
      if (user) {
        setUsername(user.username);
        getDataFromDB(user.username);
      }
    };

    fetchUser();
  }, []);

  return (
    <Box position="relative" display="inline-flex">
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={100}
          thickness={4}
          sx={{
            color: (theme) =>
              theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
          }}
        />
        <CircularProgress
          variant="determinate"
          value={progress * 100}
          size={100}
          thickness={4}
          sx={{
            position: "absolute",
            left: 0,
          }}
        />
      </Box>
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
          aria-live="polite"
        >
          {`${percentValue}%`}
        </Typography>
      </Box>
    </Box>
  );
}
