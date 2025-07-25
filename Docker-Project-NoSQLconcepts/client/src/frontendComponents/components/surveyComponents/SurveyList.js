// Integration in the NoSQLConceptsTool:
// This script can be added to the tool.
// The user authentication might be changed.

 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Grid } from '@mui/material';
import { useAuth } from '../../App.js';
import { checkAuth, fetchSurveys, addSurvey, activateSurvey, finishSurvey, deleteSurvey, copySurvey } from '../../api/surveyApi.js'

const SurveyList = () => {
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
    if (authStatus.username && authStatus.isAdmin){
      getSurveys();
    }
  }, [authStatus]);

  const getSurveys = async () => {
    try {
      const response = await fetchSurveys(); // API call to get all surveys
      setSurveys(response);
    } catch (err) {
      console.error(err);
    }
  }
  
  const addNewSurvey = async () => {
    try {
      const response = await addSurvey('New survey'); // API call to add a new survey
      setSurveys([response, ...surveys]);
    } catch (err) {
      console.error(err);
    }
  };

  const startSurvey = async (index) => {
    const surveyToStart = surveys[index];
    try { 
      await activateSurvey(surveyToStart.survey_id); // Enpoint to start a specific survey
      getSurveys();
    } catch (err) {
      console.error(err); 
    }
  };

  const stopSurvey = async (index) => {
    const surveyToStart = surveys[index];
    try { 
      await finishSurvey(surveyToStart.survey_id); // Enpoint to stop a specific survey
      getSurveys();
    } catch (err) {
      console.error(err); 
    }
  };

  const delSurvey = async (index) => {
    const surveyToDelete = surveys[index];
    try { 
      await deleteSurvey(surveyToDelete.survey_id); // API call to delete a specific survey
      const newSurveys = surveys.filter((_, i) => i !== index);
      setSurveys(newSurveys); 
    } catch (err) {
      console.error(err); 
    }
  };

  const copyAsNewSurvey = async (index) => { 
    const surveyToCopy = surveys[index]; 
    try { 
      const response = await copySurvey(surveyToCopy.survey_id); // Enpoint to copy a specific survey
      setSurveys([response, ...surveys]); 
    } catch (err) { 
      console.error(err); 
    } 
  };

  if (authStatus.isAdmin) {
    return (
      <Grid container spacing={0} direction="column" alignItems="center" justify="center" sx={{my:2}}>
        <Typography variant="h4">List of all surveys</Typography>
        <Button sx={{my:2}} variant="outlined" onClick={addNewSurvey}>Add Survey</Button>
        {surveys.map((survey, index) => (
          <Box sx={{flexGrow:1, mb:2, p:2, border: '1px solid grey', borderRadius:2}} key={index}>
            <Typography variant="h5">{survey.title}</Typography>
            {survey.status === 'edit' && (
              <Typography sx={{my:1}} variant="body1">Status: edit | Created at: {new Date(survey.created_at).toLocaleString()}</Typography>
            )}
            {survey.status === 'active' && (
              <Typography sx={{my:1}} variant="body1">Status: active | Started at: {new Date(survey.started_at).toLocaleString()}</Typography>
            )}
            {survey.status === 'finished' && (
              <Typography sx={{my:1}} variant="body1">Status: finished | Finished at: {new Date(survey.finished_at).toLocaleString()}</Typography>
            )}
            {survey.status === 'edit' && (
              <Button sx={{mr:1/2}} variant="outlined" onClick={() => navigate('/edit-survey', {state:{surveyTitle:survey.title, surveyId:survey.survey_id}})}>Edit survey</Button>
            )}
            {survey.status === 'edit' && (
              <Button sx={{mr:1/2}} variant="outlined" onClick={() => startSurvey(index)}>Start survey</Button>
            )}
            {survey.status === 'active' && (
              <Button sx={{mr:1/2}} variant="outlined" onClick={() => stopSurvey(index)}>Stop survey</Button>
            )}
            {survey.status === 'finished' && (
              <Button sx={{mr:1/2}} variant="outlined" onClick={() => navigate('/survey-results', {state:{surveyTitle:survey.title, surveyId:survey.survey_id}})}>Show results</Button>
            )}
            <Button sx={{mr:1/2}} variant="outlined" onClick={() => delSurvey(index)}>Delete survey</Button>
            <Button variant="outlined" onClick={() => copyAsNewSurvey(index)}>Copy survey</Button>
          </Box>
        ))}
      </Grid>
    );
  }
};

export default SurveyList;
