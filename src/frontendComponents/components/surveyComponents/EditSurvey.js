// Integration in the NoSQLConceptsTool:
// This script can be added to the tool.
// The user authentication might be changed.


import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid2, Button, Box, Typography, TextField, Radio, FormControlLabel, Grid } from '@mui/material';
import { useAuth } from '../../App.js';
import { changeSurveyTitle, checkAuth, fetchAnswers, fetchQuestions, fetchSubquestions, saveQuestionsWithAnswers } from '../../api/surveyApi.js'

const EditSurvey = () => {
  const { user_name } = useAuth(); // Get the username of the user who is logged in
  const [authStatus, setAuthStatus] = useState({ username: null, isAdmin: false });
  const location = useLocation();
  const { surveyTitle, surveyId } = location.state || { surveyTitle: 'Unknown Survey', surveyId: null };
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState(surveyTitle);

  useEffect(() => { 
    const initialize = async () => { 
      const response = await checkAuth(user_name); // API call to get the user information
      setAuthStatus({ username: response[0].user_name, isAdmin: response[0].role === "admin" });
    }; 
    initialize(); 
  }, []);

  useEffect(() => {
    if (authStatus.username && authStatus.isAdmin){
      getQuestions();
    }
    }, [authStatus]);

  const getQuestions = async () => {
    try {
      const questionsWithAnswers = await fetchQuestions(surveyId); // API call to get all questions of a specific survey

      for (const q of questionsWithAnswers){
        if (q.type === 'mc matrix head'){
          const subquestionsResponse = await fetchSubquestions(q.question_id); // API call to get all subquestions of a specific question
          q.subquestions = [];
          for (const s of subquestionsResponse){
             q.subquestions.push({question_text:s.question_text, index:s.question_id});
          }
          q.type = 'mc matrix';
          const answersResponse = await fetchAnswers(q.subquestions[0].index); // API call to get all answers of a specific question
          q.answers = [];
          for (const a of answersResponse){
             q.answers.push({answer_text:a.answer_text, index:a.answer_id});
          }
        }    
        if (q.type === 'multiple choice'){
          const answersResponse = await fetchAnswers(q.question_id); // API call to get all answers of a specific question
          q.answers = [];
          for (const a of answersResponse){
              q.answers.push({answer_text:a.answer_text, index:a.answer_id});
          }
        }
        
      }
      setQuestions(questionsWithAnswers);
    } catch (err) {
      console.error(err);
    }
  };
  
  const addQuestion = async () => {
    try {
      const newQuestion = { survey_id : surveyId, text: null, type: 'yes/no', answers: [] };
      setQuestions([...questions, newQuestion]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteQuestion = async (index) => {
    try {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (index, newValue) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question_text = newValue;
    setQuestions(updatedQuestions);
  };

  const handleTypeChange = (index, newType) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = newType;
    setQuestions(updatedQuestions);
  };

  const addSubquestion = (index) => {
    const updatedQuestions = [...questions];
    if (!updatedQuestions[index].subquestions) {
      updatedQuestions[index].subquestions = [];
    }
    updatedQuestions[index].subquestions.push({ question_text: '', id: Date.now() });
    setQuestions(updatedQuestions);
  };

  const handleSubquestionChange = (questionIndex, subquestionIndex, newValue) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].subquestions[subquestionIndex].question_text = newValue;
    setQuestions(updatedQuestions);
  };

  const deleteSubquestion = (questionIndex, subquestionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].subquestions.splice(subquestionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const addAnswer = (index) => {
    const updatedQuestions = [...questions];
    if (!updatedQuestions[index].answers) {
      updatedQuestions[index].answers = [];
    }
    updatedQuestions[index].answers.push({ answer_text: '', id: Date.now() });
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, newValue) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex].answer_text = newValue;
    setQuestions(updatedQuestions);
  };

  const deleteAnswer = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
    setQuestions(updatedQuestions);
  };

  const saveQuestions = async () => {
    try {

      for (const q of questions){
        if (q.type === "yes/no"){
          q.subquestions = [];
          q.answers = [];
          q.answers.push({answer_text:'yes'});
          q.answers.push({answer_text:'no'});
        } else if (q.type === "multiple choice"){
          q.subquestions = [];
        } else if (q.type === "free text"){
          q.subquestions = [];
          q.answers = [];
          q.answers.push({answer_text:'text'});
        }
      }

      await saveQuestionsWithAnswers(questions, surveyId); // API call to save all questions and answers of a specific survey 

      await changeSurveyTitle(surveyId, title); // API call to change the survey title of a specific survey
  
      alert('Survey and questions saved successfully!');
    } catch (err) {
      console.error('Error saving questions', err);
      alert('Error saving questions.');
    }
  };
  

  if (authStatus.isAdmin) {
    return (
      <Grid container spacing={0} direction="column" alignItems="center" justify="center" sx={{my:2}}>
        <Typography variant="h4">Survey editor</Typography>
        <TextField sx={{mt:2, minWidth:1/4, flexGrow:1}}
          label="Survey title:"
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Survey title"
        />
        <Button sx={{my:2}} variant="outlined" onClick={addQuestion}>Add Question</Button>
        {questions.length > 0 && questions.map((question, index) => (
          <Box sx={{ minWidth:1/3, flexGrow:1, mb:2, p:2, border: '1px solid grey', borderRadius:2}} key={index}>
            <Typography sx={{mb:1}} variant="h5">Question {index + 1}</Typography>
            <TextField sx={{minWidth:1, flexGrow:1}} 
              size="small"
              value={question.question_text}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder="Type question here..."
            />
            <Box sx={{ flexGrow:1, my:1, p:1, border: '1px solid lightgrey', borderRadius:2}}>
              <Typography variant="body1">Question type:</Typography>
              <FormControlLabel
                control={<Radio/>}
                label="Yes/No"
                name={`type-${index}`}
                value="yes/no"
                checked={question.type === 'yes/no'}
                onChange={() => handleTypeChange(index, 'yes/no')}
              />
              <FormControlLabel
                control={<Radio/>}
                label="Multiple choice"
                name={`type-${index}`}
                value="multiple choice"
                checked={question.type === 'multiple choice'}
                onChange={() => handleTypeChange(index, 'multiple choice')}
              />
              <FormControlLabel
                control={<Radio/>}
                label="Multiple choice matrix"
                name={`type-${index}`}
                value="free text"
                checked={question.type === 'mc matrix'}
                onChange={() => handleTypeChange(index, 'mc matrix')}
              />
              <FormControlLabel
                control={<Radio/>}
                label="Free text"
                name={`type-${index}`}
                value="free text"
                checked={question.type === 'free text'}
                onChange={() => handleTypeChange(index, 'free text')}
              />
            </Box>
            {question.type === 'mc matrix' && (
              <Box sx={{ flexGrow:1, my:1, p:1, border: '1px solid lightgrey', borderRadius:2}}>
                  <Typography variant="body1">Multiple choice matrix subquestions:</Typography>
                  {question.subquestions && question.subquestions.map((subquestion, subquestionIndex) => (
                    <Box sx={{mt:1}} key={subquestion.index}>
                        <TextField sx={{width:3/4, mr:1/2}} 
                          size="small"
                          value={subquestion.question_text}
                          onChange={(e) => handleSubquestionChange(index, subquestionIndex, e.target.value)}
                          placeholder="Type subquestion here..."
                        />
                        <Button sx={{p:0.8}} variant="outlined" onClick={() => deleteSubquestion(index, subquestionIndex)}>Delete</Button>
                    </Box>
                  ))}
                  <Button sx={{mt:1}} variant="outlined" onClick={() => addSubquestion(index)}>Add subquestion</Button>
              </Box>
            )}
            {(question.type === 'multiple choice' || question.type === 'mc matrix') && (
              <Box sx={{ flexGrow:1, my:1, p:1, border: '1px solid lightgrey', borderRadius:2}}>
                <Typography variant="body1">Multiple choice answer options:</Typography>
                {question.answers && question.answers.map((answer, answerIndex) => (
                  <Box sx={{mt:1}} key={answer.answer_id}>
                    <TextField sx={{width:3/4, mr:1/2}} 
                      size="small"
                      value={answer.answer_text}
                      onChange={(e) => handleAnswerChange(index, answerIndex, e.target.value)}
                      placeholder="Type answer here..."
                    />
                    <Button sx={{p:0.8}} variant="outlined" onClick={() => deleteAnswer(index, answerIndex)}>Delete</Button>
                  </Box>
                ))}
                <Button sx={{mt:1}} variant="outlined" onClick={() => addAnswer(index)}>Add answer</Button>
              </Box>
            )}
            <Button sx={{mt:1}} variant="outlined" onClick={() => deleteQuestion(index)}>Delete question</Button>
          </Box>
        ))}
        <Button variant="outlined" onClick={saveQuestions}>Save</Button>
      </Grid>
    );
  }
};

export default EditSurvey;
