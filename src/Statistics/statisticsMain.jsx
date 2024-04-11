import React from "react";
import AvgProcessingTimeChart from "./statisticComponents/avgProcessingTimeBar";
import DifficultyLevelChart from "./statisticComponents/difficultyLevelChart";
import SolvedTasksBar from "./statisticComponents/solvedTasksBar";
import { Typography, Paper, Grid } from "@mui/material";

const StatisticsMain = () => {
  //################# Frontend ######################################################
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "70%" }}>
   {/*    <Typography variant="h5" gutterBottom>
                Average processing time for one task of each area
              </Typography>
              <AvgProcessingTimeChart isUser={false} />
              <Typography variant="h5" gutterBottom>
                Average number of started, executable and correct tasks
              </Typography>
              <SolvedTasksBar />
              <Typography variant="h5" gutterBottom>
                Difficulty Level Distribution: Number of tasks (on average) that
                were rated with respective difficulty levels
              </Typography>
              <DifficultyLevelChart /> */}
        <Grid /* container spacing={3} */>
          
          <Grid item xs={12} md={6}>
           {/*  <Paper style={{ padding: "20px" }}> */}
              <Typography variant="h5" gutterBottom>
                Average processing time for a task of each area
              </Typography>
              <AvgProcessingTimeChart isUser={false} />
           {/*  </Paper> */}
          </Grid>

         
          <Grid item xs={12} md={6}>
            {/* <Paper style={{ padding: "20px" }}> */}
              <Typography variant="h5" gutterBottom>
                Average number of started, executable and correct tasks
              </Typography>
              <SolvedTasksBar />
            {/* </Paper> */}
          </Grid>

          
          <Grid item xs={12} md={12}>
            {" "}
           {/*  <Paper style={{ padding: "10px" }}> */}
              <Typography variant="h5" gutterBottom>
                Difficulty Level Distribution: Number of tasks (on average) that
                were rated with respective difficulty levels
              </Typography>
              <DifficultyLevelChart />
            {/* </Paper> */}
          </Grid>
        </Grid> 
      </div>
    </div>
  );
};

export default StatisticsMain;
