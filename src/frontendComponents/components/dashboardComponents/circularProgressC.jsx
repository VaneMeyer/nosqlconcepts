import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { fetchDownloadData, fetchTasksData } from "../../api/mainApi";
//import { checkAuth } from "../api/loginApi";
import { useAuth } from "../../App";

export default function CircularProgressC({ areaId }) {
  const { username } = useAuth();
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
    is_finished: false
  });

  let progress = "0";
  let progressCounter = 0;

  for (let i = 0; i < data.length; i++) {
    const isFinished = data[i].is_finished || false;
   

    if (isFinished) {
      progressCounter += 1;
    }
   
  }

  
  if (tasksArray.length !== 0) {
    progress = progressCounter / tasksArray.length;
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
      //const user = await checkAuth();
      if (username) {
        //setUsername(user.username);
        getDataFromDB(username);
      }
    };

    fetchUser();
  }, []);

  return (
    <Box
    sx={{
      position: 'absolute',
      top: 12,
      right: 12,
      zIndex: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: '#fff',
    }}
  >
    <CircularProgress
      variant="determinate"
      value={progress*100}
      size={48}
      thickness={5}
      sx={{
        color: 'rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(42, 165, 242, 0.1)',
        borderRadius: '50%',
        p: 0.5,
        
      }}
    />
    <Typography
      variant="caption"
      component="div"
      color="black"
      sx={{ mt: 0.5, fontWeight: 'bold' }}
    >
      {`${percentValue}%`}
    </Typography>
  </Box>
  );
}
