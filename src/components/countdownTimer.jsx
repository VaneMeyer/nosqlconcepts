import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import { tokens } from "../theme";

const CountdownTimer = ({ deadline }) => {

  //################# Style Settings ######################################################
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const countdownStyle = {
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: colors.redAccent[400],
    color: "white",
    textAlign: 'center',
  };

  //################# Functions ######################################################
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = new Date(deadline) - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  };

  //################# State Variables ######################################################
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  //################# useEffect Function ######################################################
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  //################# Frontend ######################################################
  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={2}>
      <Paper style={countdownStyle} elevation={3}>
        <Typography variant="h4">Countdown until submission deadline</Typography>
        <Typography variant="h1">{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</Typography>
      </Paper>
    </Box>
  );
};

export default CountdownTimer;
