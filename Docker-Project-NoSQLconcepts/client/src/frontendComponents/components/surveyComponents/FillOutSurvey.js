// Integration in the NoSQLConceptsTool:
// This script can be added to the tool.
// The user authentication might be changed.


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid2, Button, Box, Typography, TextField, Radio, FormControlLabel, Checkbox,
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody, 
  Grid} from '@mui/material';
import { useAuth } from '../../App.js';
import { changeUserAnswers, checkAuth, deleteUserAnswers, fetchAnswers, fetchQuestions, fetchSubquestions, fetchUsersAnswers, saveUserAnswers, saveUserSurvey } from '../../api/surveyApi.js'

const FillOutSurvey = () => {
  const { user_name } = useAuth(); // Get the username of the user who is logged in
  const [authStatus, setAuthStatus] = useState({ username: null, isAdmin: false });
  const navigate = useNavigate();
  const location = useLocation();
  const { surveyTitle, surveyId } = location.state || { surveyTitle: 'Unknown Survey', surveyId: null };
  const [questions, setQuestions] = useState([]);

  useEffect(() => { 
    const initialize = async () => { 
      const response = await checkAuth(user_name); // API call to get the user information
      setAuthStatus({ username: response[0].user_name, isAdmin: response[0].role === "admin" });
    }; 
    initialize(); 
  }, []);

  useEffect(() => { 
    if (authStatus.username){
      getQuestions();
    }
  }, [authStatus]);

  const getQuestions = async () => {
    try {
      const questionsWithAnswers = await fetchQuestions(surveyId); // API call to get all questions of a specific survey
      for (const q of questionsWithAnswers){
        q.subquestions = q.subquestions || [];
        q.answers = q.answers || [];
        if (q.type === 'mc matrix head'){
          const subquestionsResponse = await fetchSubquestions(q.question_id); // API call to get all subquestions of a specific question
          q.subquestions = [];
          for (const s of subquestionsResponse){         
            const answersResponse = await fetchAnswers(s.question_id); // API call to get all answers of a specific question
            const answers = [];
            for (const a of answersResponse){
              answers.push({text:a.answer_text, index:a.answer_id});
            }
            const userAnswersResponse = await fetchUsersAnswers(authStatus.username, s.question_id); // API call to get an answer given by an user
            const users_answers = [];
            for (const ua of userAnswersResponse){
              users_answers.push({text:ua.text, index:ua.answer_id});
            }
            q.subquestions.push({question_text:s.question_text, index:s.question_id, answers:answers, userAnswers:users_answers});
          }
          q.type = 'mc matrix';
        } else {
          const answersResponse = await fetchAnswers(q.question_id); // API call to get all answers of a specific question
          const userAnswersResponse = await fetchUsersAnswers(authStatus.username, q.question_id); // API call to get an answer given by an user
          q.answers = [];
          q.userAnswers = [];
          for (const a of answersResponse){
            q.answers.push({text:a.answer_text, index:a.answer_id});
          }
          for (const ua of userAnswersResponse){
            q.userAnswers.push({text:ua.text, index:ua.answer_id});
          }
        }
      }
  
      setQuestions(questionsWithAnswers);
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleRadioChange = async (answerId) => {
    try {
      await changeUserAnswers(authStatus.username, answerId, null, false); // API call to change an answer given by an user
      getQuestions();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckboxChange = async (event, answerId) => {
    const isChecked = event.target.checked;
    if (isChecked){
      await saveUserAnswers(authStatus.username, answerId); // API call to save an answer given by an user
    } else {
      await deleteUserAnswers(authStatus.username, answerId); // API call to delete an answer given by an user
    }
    getQuestions()
  };

  const handleTextChange = async (event, answerId) => {
    await changeUserAnswers(authStatus.username, answerId, event.target.value, true);  // API call to change an answer given by an user
    getQuestions();
  };

  const saveAnsweredSurvey = async () => {
    try {
      await saveUserSurvey(authStatus.username, surveyId); // API call to save a finished survey by an user
      navigate('/survey', {replace:true});
      navigate(-1);
    } catch (err) {
      console.error('Error saving answers', err);
      alert('Error saving answers.');
    }
  };

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justify="center" sx={{my:2}}>
      <Typography sx={{mb:2}} variant="h4">Fill out survey: {surveyTitle}</Typography>
      {questions.length > 0 && questions.map((question, index) => (
        <Box sx={{minWidth:1/3, flexGrow:1, mb:2, p:2, border: '1px solid grey', borderRadius:2}} className="question-box" key={index}>
          <Typography sx={{mb:1}} variant="h5">Question {index + 1}</Typography>
          <Typography sx={{mb:1}} variant="body1">{question.question_text || ''}</Typography>
          {question.type === 'yes/no' && ( 
            <Box> 
              {question.answers.map((answer, idx) => (
                  <Box key={idx}>
                    <FormControlLabel 
                      control={<Radio/>}
                      label={answer.text}
                      id={`q${index}a${idx}`} 
                      name={`q${index}`} 
                      value={answer.index} 
                      checked={!!question.userAnswers.find(ua => ua.index === answer.index)}
                      onChange={() => handleRadioChange(answer.index)}
                    />
                  </Box>
              ))} 
            </Box> 
          )}
          {question.type === 'multiple choice' && ( 
            <Box> 
              {question.answers.map((answer, idx) => (
                  <Box key={idx}>
                    <FormControlLabel 
                      control={<Checkbox/>}
                      id={`q${index}a${idx}`} 
                      name={`q${index}`} 
                      value={answer.index}
                      checked={!!question.userAnswers.find(ua => ua.index === answer.index)}
                      onChange={(e) => handleCheckboxChange(e, answer.index)}
                    /> {answer.text}
                  </Box>
              ))} 
            </Box> 
          )}
          {question.type === 'mc matrix' && ( 
            <Box> 
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      {question.subquestions.length > 0 && question.subquestions[0].answers && question.subquestions[0].answers.map((answer, idx) => (
                        <TableCell key={idx}>{answer.text}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {question.subquestions.map((subquestion, sIdx) => (
                      <TableRow key={sIdx}>
                        <TableCell>{subquestion.question_text}</TableCell>
                        {subquestion.answers.map((answer, aIdx) => (
                          <TableCell key={aIdx}>
                            <FormControlLabel 
                              control={<Checkbox/>}
                              id={`sq${sIdx}a${aIdx}`} 
                              name={`sq${sIdx}`} 
                              value={answer.index}
                              checked={!!subquestion.userAnswers.find(ua => ua.index === answer.index)}
                              onChange={(e) => handleCheckboxChange(e, answer.index)}
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {question.type === 'free text' && ( 
            <Box> 
              {question.answers.map((answer, idx) => (
              <Box key={idx}> 
                <TextField sx={{minWidth:1, flexGrow:1}}
                  size="small"
                  defaultValue={(question.userAnswers.find(ua => ua.index === answer.index)?.text) || ''}
                  onBlur={(e) => handleTextChange(e, answer.index)}
                />
              </Box>
              ))}
            </Box>
          )}
        </Box>
      ))}
      <Box>
        <Button sx={{mr:1/2}} variant='outlined' onClick={() => navigate(-1)}>Continue later</Button>
        <Button variant='outlined' onClick={saveAnsweredSurvey}>Finish survey</Button>
      </Box>
    </Grid>
  );
};

export default FillOutSurvey;
