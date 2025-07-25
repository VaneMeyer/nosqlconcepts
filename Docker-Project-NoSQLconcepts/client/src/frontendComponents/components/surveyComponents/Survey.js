// Integration in the NoSQLConceptsTool:
// This script can be added to the tool.
// The user authentication might be changed.


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid2, Button, Box, Typography, Grid } from '@mui/material';
import { useAuth } from '../../App.js';
import { checkAuth, fetchActiveSurveys } from '../../api/surveyApi.js'

const Survey = () => {
  const { user_name } = useAuth(); // Get the username of the user who is logged in
  const [authStatus, setAuthStatus] = useState({ username: null, isAdmin: false });
  const [surveys, setSurveys] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => { 
    const initialize = async () => { 
      const response = await checkAuth(user_name); // API call to get the user information
      setAuthStatus({ username: response[0].user_name, isAdmin: response[0].role === "admin" });
    }; 
    initialize(); 
  }, []);

  useEffect(() => { 
    if (authStatus.username){
      getSurveys();
    }
  }, [authStatus]);

  const getSurveys = async () => {
    try {
      const response = await fetchActiveSurveys(authStatus.username); // API call to get all active surveys a specific user did not finished
      setSurveys(response);
    } catch (err) {
      console.error(err);
    }
  };

  
  return (
    <Grid container spacing={0} direction="column" alignItems="center" justify="center" sx={{my:2}}>
      <Typography sx={{mb:2}} variant="h4">Open surveys</Typography>
      {surveys.map((survey, index) => (
        <Box sx={{minWidth:1/4, flexGrow:1, mb:2, p:2, border: '1px solid grey', borderRadius:2}} className="survey-box" key={index}>
          <Typography sx={{mb:1}} variant="h5">{survey.title}</Typography>
          <Typography sx={{mb:1}} variant="body1">Started at: {new Date(survey.started_at).toLocaleString()}</Typography>
          <Button variant='outlined' onClick={() => navigate('/fill-out-survey', {state:{surveyTitle:survey.title, surveyId:survey.survey_id}})}>Start Survey</Button>
        </Box>
      ))}
    </Grid>
  );
};

export default Survey;
