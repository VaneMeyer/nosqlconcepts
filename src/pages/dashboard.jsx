import React, { memo } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MediaCard from "../components/card";
import BarChartC from "../components/barChart";
import LineChartC from "../components/lineChart";
import SurveyLink from "../components/surveyLink";
import RankingC from "../components/ranking";
import GreetingHeader from "../components/greetingHeader";
import { useAuth } from '../App';

// Memoized Item component
const Item = memo(styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  overflow: "auto",
})));

function Dashboard() {
  const { username } = useAuth(); // Get username from AuthContext

  return (
    <Container>
      <GreetingHeader username={username} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <GridItem xs={12} md={12} title="Assignments">
            <MediaCard />
          </GridItem>
          <GridItem xs={12} md={6} title="Average Time to Solve a Task (in Minutes)">
            <BarChartC isUser={true} isTimeChart={true} />
          </GridItem>
          <GridItem xs={12} md={6} title="Task Overview">
            <BarChartC isUser={true} isTimeChart={false} />
          </GridItem>
          <GridItem xs={12} md={8} title="Query Execution Timeline">
            <LineChartC />
          </GridItem>
          <GridItem xs={12} md={4} title="Course Summary">
            <RankingC />
          </GridItem>
          <GridItem xs={12} md={4} title="Evaluation Survey">
            <SurveyLink />
          </GridItem>
        </Grid>
      </Box>
    </Container>
  );
}

// Memoized GridItem component
const GridItem = memo(({ xs, md, title, children }) => (
  <Grid item xs={xs} md={md}>
    <Item>
      {title}
      {children}
    </Item>
  </Grid>
));

export default Dashboard;

/* import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MediaCard from "../components/card";
import BarChartC from "../components/barChart";
import LineChartC from "../components/lineChart";
import SurveyLink from "../components/surveyLink";
import RankingC from "../components/ranking";
import GreetingHeader from "../components/greetingHeader";
import { checkAuth } from "../api/loginApi.js";

const Item = styled(Paper)(({ theme }) => ({
  backgroundCoor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  overflow: "auto",
}));
function Dashboard() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      const user = await checkAuth();
      if (user) {
        setUsername(user.username);
      }
    };

    fetchUser();
  }, []);
  return (
    <Container>
      <GreetingHeader username={username} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Item>
              Assignments <MediaCard />{" "}
            </Item>
          </Grid>
          <Grid item xs={12} md={6}>
            <Item>
              Average Time to Solve a Task (in Minutes){" "}
              <BarChartC isUser={true} isTimeChart={true} />
            </Item>
          </Grid>
          <Grid item xs={12} md={6}>
            <Item>
              Task Overview <BarChartC isUser={true} isTimeChart={false} />
            </Item>
          </Grid>
          <Grid item xs={12} md={8}>
            <Item>
              Query Execution Timeline <LineChartC />
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              Course Summary <RankingC />
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              Evaluation Survey <SurveyLink />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Dashboard;
 */