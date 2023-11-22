import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, useTheme} from '@mui/material';
import { tokens } from "../theme";


  

const ChristmasCountdown = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const xmasStyle = {padding:"10px", borderRadius:"5px", backgroundColor:colors.redAccent[400], color:"white", textAlign:'center'}

  // Funktion, um die verbleibenden Tage bis Weihnachten zu berechnen
  const calculateDaysUntilChristmas = () => {
    const today = new Date();
    const christmasDay = new Date(today.getFullYear(), 11, 25); // Monat ist 0-basiert (11 = Dezember)
    const differenceInMilliseconds = christmasDay - today;
    return Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  };

  const [daysUntilChristmas, setDaysUntilChristmas] = useState(calculateDaysUntilChristmas());

  useEffect(() => {
    // Aktualisiere die verbleibenden Tage alle 24 Stunden
    const intervalId = setInterval(() => {
      setDaysUntilChristmas(calculateDaysUntilChristmas());
    }, 86400000); // 24 Stunden in Millisekunden

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={2}>
      <Paper style={xmasStyle} elevation={3}>
        <Typography variant="h4">Countdown until Christmas</Typography>
        <Typography variant="h1">{daysUntilChristmas}</Typography>
        <Typography variant="h5">{daysUntilChristmas === 1 ? 'day' : 'days'} left</Typography>
      </Paper>
    </Box>
  );
};

export default ChristmasCountdown;
