import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import BarChartC from "../newLayout/components/barChart";
import PieChartC from "../newLayout/components/pieChart";

import AppProject from "../newLayout/student_projects/project4_ss24/App";
const Item = styled(Paper)(({ theme }) => ({
  backgroundCoor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  overflow: "auto",
}));
function Statistics() {
  return (
    <Container>
      <h1>Course Statistics </h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Item>
              Users Average Time to Solve a Task{" "}
              <BarChartC isUser={false} isTimeChart={true} />
            </Item>
          </Grid>
          <Grid item xs={12} md={6}>
            <Item>
              Overview of User Tasks{" "}
              <BarChartC isUser={false} isTimeChart={false} />
            </Item>
          </Grid>

          <Grid item xs={12} md={12}>
            <Item>
              Distribution of Difficulty Levels as Perceived by All Users{" "}
              <PieChartC />
            </Item>
          </Grid>
          <Grid item xs={12} md={12}>
            <Item>
              <AppProject />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Statistics;
