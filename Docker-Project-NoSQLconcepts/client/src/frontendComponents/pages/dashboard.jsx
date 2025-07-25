import React from "react";
import { Box } from "@mui/material";
import CardContainer from "../components/dashboardComponents/cardContainer";
import GreetingHeader from "../components/dashboardComponents/greetingHeader";
import BarChartC from "../components/dashboardComponents/barChart";
import LineChartC from "../components/dashboardComponents/lineChart";
import RankingList from "../components/dashboardComponents/rankingList";
import Grid from "@mui/material/Grid";
import { useAuth } from '../App';
import SurveyLink from "../components/surveyComponents/surveyLink";


const NewDashboard = () => {
  const { username } = useAuth();
  return (
    <Box>
      <GreetingHeader username={username} />
      <CardContainer />
      <Box sx={{ flexGrow: 1, p:2 }}>
        <Grid container spacing={2}>
         
          <Grid item xs={12} md={6} title="Average Time to Solve a Task (in Minutes)">
            <BarChartC isUser={true} isTimeChart={true} />
          </Grid>
          <Grid item xs={12} md={6} title="Task Overview">
            <BarChartC isUser={true} isTimeChart={false} />
          </Grid>
          <Grid item xs={12} md={8} title="Query Execution Timeline">
            <LineChartC />
          </Grid>
          <Grid item xs={12} md={4} title="Course Summary">
            <RankingList />
          </Grid>
          <Grid item xs={12} md={4} title="Evaluation Survey">
            <SurveyLink />
          </Grid> 
        </Grid>
      </Box>
    </Box>
  );
};



export default NewDashboard;
