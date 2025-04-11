import React from "react";

import Box from "@mui/material/Box";

import Container from "@mui/material/Container";


import { Typography } from "@mui/material";
import StatisticsC from "../components/statisticsComponents/statisticsC";

export default function NewStatistics() {
  return (
    <Container sx={{p:2}}>
      <Typography variant="h4">Course Statistics </Typography>
      <Box sx={{ flexGrow: 1, p:2 }}>
        <StatisticsC />
      </Box>
    </Container>
  );
}


