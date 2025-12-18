import { Box, Typography } from "@mui/material";
import CardContainer from "../components/dashboardComponents/cardContainer";
import GreetingHeader from "../components/dashboardComponents/greetingHeader";
import BarChartC from "../components/dashboardComponents/barChart";
import LineChartC from "../components/dashboardComponents/lineChart";
import RankingList from "../components/dashboardComponents/rankingList";
import Grid from "@mui/material/Grid";
import { useAuth } from "../App";


const NewDashboard = () => {
  const { username } = useAuth();
  return (
    // color palette: https://hookagency.com/blog/website-color-schemes-2020/
    <Box>
      <GreetingHeader username={username} /> 
      <CardContainer />
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={6}
            title="Average Time to Solve a Task (in Minutes)"
          >
            <Typography>
              Your average needed time to solve one task for each assignment
            </Typography>
            <BarChartC isUser={true} isTimeChart={true} />
          </Grid>
          <Grid item xs={12} md={6} title="Task Overview">
            <Typography>
              Number of your started, executable and correct tasks
            </Typography>
            <BarChartC isUser={true} isTimeChart={false} />
          </Grid>
          <Grid item xs={12} md={8} title="Query Execution Timeline">
            <LineChartC />
          </Grid>
          <Grid item xs={12} md={4} title="Course Summary">
            <RankingList />
          </Grid>
          {/*   <Grid item xs={12} md={4} title="Evaluation Survey">
            <SurveyLink />
          </Grid>  */}
        </Grid>
      </Box>
    </Box>
  );
};

export default NewDashboard;
