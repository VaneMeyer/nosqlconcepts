// Integration in the NoSQLConceptsTool:
// This script can be added to the tool.
// The user authentication might be changed.


import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BarChart, PieChart } from '@mui/x-charts';
import { Button, Box, Typography, List, ListItem, Grid} from '@mui/material';
import * as XLSX from 'xlsx';
import { useAuth } from '../../App.js';
import { checkAuth, fetchAnswers, fetchParticipants, fetchQuestions, fetchSubquestions, fetchResults } from '../../api/surveyApi.js'

const SurveyResults = () => {
  const { user_name } = useAuth(); // Get the username of the user who is logged in
  const [authStatus, setAuthStatus] = useState({ username: null, isAdmin: false });
  const location = useLocation();
  const { surveyTitle, surveyId } = location.state || { surveyTitle: 'Unknown Survey', surveyId: null };
  const [ results, setResults ] = useState([]);
  const [ questions, setQuestions ] = useState([]);
  const [ numParticipants, setNumParticipants ] = useState(0);

  useEffect(() => { 
    const initialize = async () => { 
      const response = await checkAuth(user_name); // API call to get the user information
      setAuthStatus({ username: response[0].user_name, isAdmin: response[0].role === "admin" });
    }; 
    initialize(); 
  }, []);

  useEffect(() => {
    if (authStatus.username && authStatus.isAdmin){
      getResults();
    }
  }, [authStatus]);

  useEffect(() => { 
    if (authStatus.username && authStatus.isAdmin){
      getQuestions();
    }
  }, [authStatus]);


  const getQuestions = async () => {
    try {
      const questionsWithAnswers = await fetchQuestions(surveyId); // API call to get all questions of a specific survey
      for (const q of questionsWithAnswers){
        if (q.type === 'multiple choice'){
          const answersResponse = await fetchAnswers(q.question_id); // API call to get all answers of a specific question
          q.answers = [];
          for (const a of answersResponse){
              q.answers.push({text:a.answer_text, index:a.answer_id});
          }
        } else if (q.type === 'mc matrix head') {
          const subquestionsResponse = await fetchSubquestions(q.question_id); // API call to get all subquestions of a specific question
          q.subquestions = [];
          for (const s of subquestionsResponse) {
            const answersResponse = await fetchAnswers(s.question_id); // API call to get all answers of a specific subquestion
            const answers = [];
            for (const a of answersResponse) {
              answers.push({ text: a.answer_text, index: a.answer_id });
            }
            q.subquestions.push({ question_text: s.question_text, question_id: s.question_id, answers });
          }
          q.type = 'mc matrix';
        }
      }
      setQuestions(questionsWithAnswers);
    } catch (err) {
      console.error(err);
    }
  };
  
  const getResults = async () => {
    try {
      const response = await fetchResults(surveyId); // API call to get the results of a specific survey
      setResults(response);
      const participants = await fetchParticipants(surveyId); // API call to get the number of participants of a specific survey
      setNumParticipants(participants.num);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadCSV = async () => { 
    try { 
      const headers = Object.keys(results[0]).join(",");
      const csvContent = results.map(e => Object.values(e).join(",")).join("\n");

      const blob = new Blob([headers + "\n" + csvContent], {type: 'text/csv;charset=utf-8'});
      const url = window.URL.createObjectURL(blob); 
      const link = document.createElement('a'); 
      link.href = url; 
      link.setAttribute('download', `${surveyTitle.replace(/ /g, '_')}_results.csv`); 
      document.body.appendChild(link); 
      link.click(); 
      document.body.removeChild(link); 
    } catch (err) { 
      console.error(err); 
    } 
  };

  const downloadExcel = async () => { 
    try { 
      const worksheet = XLSX.utils.json_to_sheet(results);
      const workbook = XLSX.utils.book_new(); 
      XLSX.utils.book_append_sheet(workbook, worksheet, "Results"); 
      
      XLSX.writeFile(workbook, `${surveyTitle.replace(/ /g, '_')}_results.xlsx`);
    } catch (err) { 
      console.error(err); 
    } 
  };
  
  const getAnswers = (questionId) => { 
    const answers = results.filter(result => result.question_id === questionId && result.question_type !== 'free text');
    const answers_results = [];
    var id_count = 0;

    for (const a of answers){
      answers_results.push({id:id_count, label: a.answer_text, value: a.selection_count});
      id_count++;
    }
    return answers_results
  };

  const getTextAnswers = (questionId) => { 
    return results.filter(result => result.question_id === questionId && result.question_type === 'free text') 
                  .map(result => result.answers).filter(answer => answer !== null); 
  };

  const getPieChart = (questionId) => {
    const chartData = getAnswers(questionId);
    
    return (
      <PieChart
        series={[
          {
            data: chartData,
          },
        ]}
        width={400}
        height={200}
      />
    )
  };

  const getBarChart = (questionId) => {
    const answerData = getAnswers(questionId);
    const chartData_x = [];
    const chartData_series = [];

    for (const a of answerData){
      chartData_x.push(a.label);
      chartData_series.push(a.value);
    }

    return (
      <BarChart
        xAxis={[
          {id: 'bar.'+{questionId},
            data : chartData_x,
            scaleType: 'band',
          },
        ]}
        series={[
          {data:chartData_series,},
        ]}
        width={500}
        height={300}
      />
    )
  };
  
  if (authStatus.isAdmin){
    return( 
      <Grid container spacing={0} direction="column" alignItems="center" justify="center" sx={{my:2}}>
        <Typography variant="h4">Results of survey: {surveyTitle}</Typography>
        <Typography sx={{my:2}} variant="h6">Number of participants: {numParticipants}</Typography>
        <Box>
          <Button sx={{mb:2, mr:1/2}} variant='outlined' onClick={() => downloadCSV()}>Download csv</Button>
          <Button sx={{mb:2}} variant='outlined' onClick={() => downloadExcel()}>Download excel</Button>
        </Box>
        {results.length > 0 && questions.length > 0 && questions.map((question, index) => (
          <Box sx={{minWidth:1/3, flexGrow:1, mb:2, p:2, border: '1px solid grey', borderRadius:2}}>
            <Typography sx={{mb:1}} variant="h5">Question {index + 1}</Typography>
            <Typography sx={{mb:1}} variant="body1">{question.question_text}</Typography>
            {question.type === 'yes/no' && (
              <Box>
                {getPieChart(question.question_id)}
              </Box>
            )}
            {question.type === 'multiple choice' && (
              <Box>
                {getBarChart(question.question_id)}
              </Box>
            )}
            {question.type === 'mc matrix' && (
              <Box>
                {question.subquestions.map((subquestion, sIdx) => (
                  <Box sx={{ my:1, p:1, border: '1px solid lightgrey', borderRadius:2}}>
                  <Typography variant="body1">{subquestion.question_text}</Typography>
                  {getBarChart(subquestion.question_id)}
                  </Box>
                ))}
              </Box>
            )}
            {question.type === 'free text' && (
              <Box>
                {getTextAnswers(question.question_id).length > 0 ? (
                  <List>
                    {getTextAnswers(question.question_id).map((answer, i) => (
                      <ListItem>
                        <Typography>{answer}</Typography>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                    <Typography sx={{m:1}}>No answers</Typography>
                )}
              </Box>
            )}
          </Box>
        ))}
      </Grid>
    );
  }
};

export default SurveyResults;
