import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import OptTaskForm from "../../components/optTaskForm";
import ImportantMsg from "../../components/importantMsg";
/* import { neo4jTasksOnSite, pgTasksOnSite } from "../../data/tasks"; */
import pgdataModel from "../../images/datamodel1-transp.png";
import neoDataModel from "../../images/datamodel3-transp.png";

export const Lab1C = () => {
  //################# State Variables ######################################################
  const [lab1Tasks, setLab1Tasks] = useState([
    {
      tasknumber: "",
      topic: "",
      subtasknumber: "",
      maxtime: "",
      description: "",
      hint: "",
    },
  ]);
  //################# fetchData Function ######################################################
  const fetchData = (areaId) => {
    axios
      .post("/getTasks", { areaId })
      .then((response) => {
        setLab1Tasks(response.data);
      })
      .catch((error) => {
        console.error("Failed to get tasks from database");
      });
  };
  //################# useEffect Function ######################################################
  useEffect(() => {
    fetchData(5);
  }, []);
  //################# Frontend  ######################################################
  return (
    <Box m="20px">
      <Header title="Lab Assignment 1" subtitle="PostgreSQL" />
      <ImportantMsg message="" type="info" />
      <ImportantMsg
        message="Note: Please make sure to have a backup of your solutions! You can download your solutions in the Download section."
        type="info"
      />

      <hr></hr>
      <Box height="75vh">
        <OptTaskForm
          title="Lab Assignment 1"
          taskarray={lab1Tasks}
          taskarea={5}
          datamodel={pgdataModel}
          endpoint="/getPostgreSQLStructure"
        />
      </Box>
    </Box>
  );
};
export const Lab2C = () => {
  //################# State Variables ######################################################
  const [lab2Tasks, setLab2Tasks] = useState([
    {
      tasknumber: "",
      topic: "",
      subtasknumber: "",
      maxtime: "",
      description: "",
      hint: "",
    },
  ]);
  //################# fetchData Function ######################################################
  const fetchData = (areaId) => {
    axios
      .post("/getTasks", { areaId })
      .then((response) => {
        setLab2Tasks(response.data);
      })
      .catch((error) => {
        console.error("Failed to get tasks from database");
      });
  };
  //################# useEffect Function ######################################################
  useEffect(() => {
    fetchData(6);
  }, []);
  //################# Frontend  ######################################################
  return (
    <Box m="20px">
      <Header title="Lab Assignment 2" subtitle="Neo4J" />
      <ImportantMsg message="" type="info" />
      <ImportantMsg
        message="Note: Please make sure to have a backup of your solutions! You can download your solutions in the Download section."
        type="info"
      />

      <hr></hr>
      <Box height="75vh">
        <OptTaskForm
          title="Lab Assignment 2"
          taskarray={lab2Tasks}
          taskarea={6}
          datamodel={neoDataModel}
          endpoint="/getNeo4JStructure"
        />
      </Box>
    </Box>
  );
};
