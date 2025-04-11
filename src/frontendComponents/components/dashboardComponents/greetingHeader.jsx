import React from 'react';
import { Toolbar, Typography } from '@mui/material';

const GreetingHeader = ({ username }) => {
  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = 'Good morning';
  } else if (currentHour < 18) {
    greeting = 'Hello';
  } else {
    greeting = 'Good evening';
  }

  return (
  
      <Toolbar>
        <Typography variant="h6">
          {`${greeting}, ${username}!`}
        </Typography>
      </Toolbar>
    
  );
};

export default GreetingHeader;