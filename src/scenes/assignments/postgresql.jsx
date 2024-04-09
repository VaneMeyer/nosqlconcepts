import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import OptTaskForm from "../../components/optTaskForm";
/* import { pgTasks } from "../../data/tasks"; */
import pgdataModel from "../../images/datamodel1-transp.png";
import ImportantMsg from "../../components/importantMsg";

const PostgreSQL = () => {
  //################# State Variables ######################################################
  const [pgTasks, setPgTasks] = useState([{
    tasknumber: "",
    topic: "",
    subtasknumber: "",
    maxtime: "",
    description:
      "",
    hint: "",
  },]);
 //################# fetchData Function ######################################################
  const fetchData = (areaId) => {
    axios
      .post("/getTasks", { areaId })
      .then((response) => {
        setPgTasks(response.data);
       
      })
      .catch((error) => {
        console.error("Failed to get tasks from database");
      });
  };
//################# useEffect Function ######################################################
  useEffect(() => {
    fetchData(1);
  }, []);
  //################# Frontend  ######################################################
  return (
    <Box m="20px">
      <Header title="PostgreSQL" subtitle="Assignment No. 1" />
      <ImportantMsg
        message=" Please do not work longer than the specified time on a task! If you
        think that you will not be able to finish the task in the given maximum
        time, stop working on it 15 minutes before the end, and provide an
        explanation containing the following information: Whether you think that
        the task is solvable with the current system at all, and why? If you
        think that is solvable with more time: which approach, would you try out
        next?"
        type="info"
      />
      <ImportantMsg
        message="Note: Please make sure to have a backup of your solutions! You can download your solutions in the Download section."
        type="info"
      />

      <hr></hr>
      <Box height="75vh">
        <OptTaskForm
          title="PostgreSQL"
          taskarray={pgTasks}
          taskarea={1}
          datamodel={pgdataModel}
          endpoint="/getPostgreSQLStructure"
        />
      </Box>
    </Box>
  );
};

export default PostgreSQL;
