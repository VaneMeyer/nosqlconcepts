import React from "react";
import AvgProcessingTimeChart from "./statisticComponents/avgProcessingTimeBar";
import DifficultyLevelChart from "./statisticComponents/difficultyLevelChart";
import SolvedTasksBar from "./statisticComponents/solvedTasksBar";
import { Typography, Paper, Grid } from "@mui/material";

const StatisticsMain = () => {
  //################# Frontend ######################################################
  return (
    <Grid container spacing={3}>
      {/* First column */}
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Average processing time for one task of each area
          </Typography>
          <AvgProcessingTimeChart isUser={false} />
        </Paper>
      </Grid>

      {/* Second column */}
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Average number of solved, executable and correct tasks
          </Typography>
          <SolvedTasksBar />
        </Paper>
      </Grid>

      {/* Third column */}
      <Grid item xs={12} md={12}>
        {" "}
        <Paper style={{ padding: "10px" }}>
          <Typography variant="h5" gutterBottom>
            Difficulty Level Distribution: Number of tasks (on average) that were rated with respective difficulty levels
          </Typography>
          <DifficultyLevelChart />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default StatisticsMain;
