/* import React from 'react';
import SolvedTasksBar from './statisticComponents/solvedTasksBar';
import AvgProcessingTimeChart from './statisticComponents/avgProcessingTimeBar';
import DifficultyLevelChart from './statisticComponents/difficultyLevelChart';

function StatisticsMain() {
    return ( <div>
        <h1>Statistics</h1>
        <h2>Average number of solved/correct solved/executable tasks</h2>
        <SolvedTasksBar />
        <h2>Average processing time for tasks</h2>
        <AvgProcessingTimeChart />
        <h2>On average, tasks are rated with the following difficulty level</h2>
        <DifficultyLevelChart />
    </div> );
}

export default StatisticsMain; */
import React from "react";
import AvgProcessingTimeChart from "./statisticComponents/avgProcessingTimeBar";
import DifficultyLevelChart from "./statisticComponents/difficultyLevelChart";
import SolvedTasksBar from "./statisticComponents/solvedTasksBar";
import { Box, Typography, Paper, useTheme, Grid } from "@mui/material";

const StatisticsMain = () => {
  return (
    <Grid container spacing={3}>
      {/* Erste Spalte */}
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Average Processing Time
          </Typography>
          <AvgProcessingTimeChart />
        </Paper>
      </Grid>

      {/* Zweite Spalte */}
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Solved Tasks
          </Typography>
          <SolvedTasksBar />
        </Paper>
      </Grid>

      {/* Dritte Spalte */}
      <Grid item xs={12} md={12}>
        {" "}
        <Paper style={{ padding: "10px" }}>
          <Typography variant="h5" gutterBottom>
            Difficulty Level Distribution
          </Typography>
          <DifficultyLevelChart />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default StatisticsMain;
