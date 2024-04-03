import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ChristmasCountdown = () => {
  //################# Style Settings ######################################################
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const xmasStyle = {
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: colors.redAccent[400],
    color: "white",
    textAlign: "center",
  };

  //################# Functions ######################################################
  const calculateDaysUntilChristmas = () => {
    const today = new Date();
    const christmasDay = new Date(today.getFullYear(), 11, 25); //  0-based counted (11 = Dezember)
    const differenceInMilliseconds = christmasDay - today;
    return Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  };
  //################# State Variables ######################################################
  const [daysUntilChristmas, setDaysUntilChristmas] = useState(
    calculateDaysUntilChristmas()
  );
  //################# useEffect Function ######################################################
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDaysUntilChristmas(calculateDaysUntilChristmas());
    }, 86400000); // 24 h in ms

    return () => clearInterval(intervalId);
  }, []);
  //################# Frontend ######################################################
  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={2}>
      <Paper style={xmasStyle} elevation={3}>
        <Typography variant="h4">Countdown until Christmas</Typography>
        <Typography variant="h1">{daysUntilChristmas}</Typography>
        <Typography variant="h5">
          {daysUntilChristmas === 1 ? "day" : "days"} left
        </Typography>
      </Paper>
    </Box>
  );
};

export default ChristmasCountdown;
