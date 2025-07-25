// Integration in the NoSQLConceptsTool:
// Change the 'API_URL'.
// The function 'check-auth' might be replaced, if a similar function exists.
// The other functions should be added in the tool.

import axios from 'axios';

const API_URL = "/api";

// API call to get the user information
// This function might be replaced by an existing function from the NoSQLConceptsTool
export const checkAuth = async (user_name) => {
  try {
      const response = await axios.get(`${API_URL}/check-auth/${user_name}`);
      return response.data;
  } catch (err) {
      console.error(err);
  }
};

// API call to get all surveys
export const fetchSurveys = async () => {
  try {
    const response = await axios.get(`${API_URL}/surveys`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// API call to get all active surveys a specific user did not finished
export const fetchActiveSurveys = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/surveys/${username}/active`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// API call to get the results of a specific survey
export const fetchResults = async (surveyId) => {
  try {
    const response = await axios.get(`${API_URL}/surveys/${surveyId}/results`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// API call to get the number of participants of a specific survey
export const fetchParticipants = async (surveyId) => {
  try {
    const response = await axios.get(`${API_URL}/survey-participants/${surveyId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    }
};

// API call to add a new survey
export const addSurvey = async (newSurvey) => {
  try {
    const response = await axios.post(`${API_URL}/surveys`, {title:newSurvey});
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// API call to change the survey title of a specific survey
export const changeSurveyTitle = async (surveyId, title) => { 
  try { 
    const response = await axios.put(`${API_URL}/surveys/${surveyId}`, { title: title });
    return response.data;
  } catch (err) { 
    console.error(err); 
  } 
};

// Enpoint to start a specific survey
export const activateSurvey = async (surveyId) => {
  try { 
    const response = await axios.put(`${API_URL}/surveys/${surveyId}/start`);
    return response.data;
  } catch (err) {
    console.error(err); 
  }
};

// Enpoint to stop a specific survey
export const finishSurvey = async (surveyId) => {
  try { 
    const response = await axios.put(`${API_URL}/surveys/${surveyId}/stop`);
    return response.data;  
} catch (err) {
    console.error(err); 
  }
};

// Enpoint to copy a specific survey
export const copySurvey = async (surveyId) => { 
  try { 
    const response = await axios.post(`${API_URL}/surveys/${surveyId}/copy`); 
    return response.data;
  } catch (err) { 
    console.error(err); 
  } 
};

// API call to delete a specific survey
export const deleteSurvey = async (surveyId) => {
  try { 
    const response = await axios.delete(`${API_URL}/surveys/${surveyId}`);
    return response.data;  
  } catch (err) {
    console.error(err); 
  }
};

// API call to get all questions of a specific survey
export const fetchQuestions = async (surveyId) => {
  try {
    const response = await axios.get(`${API_URL}/questions/${surveyId}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// API call to get all subquestions of a specific question
export const fetchSubquestions = async (questionId) => {
  try {
    const response = await axios.get(`${API_URL}/subquestions/${questionId}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// API call to save all questions and answers of a specific survey
export const saveQuestionsWithAnswers = async (questions, surveyId) => {
  try {
    const response = axios.post(`${API_URL}/save-questions`, { questions: questions, survey_id: surveyId });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// API call to get all answers of a specific question
export const fetchAnswers = async (questionId) => {
  try {
    const response = await axios.get(`${API_URL}/answers/${questionId}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// API call to get an answer given by an user
export const fetchUsersAnswers = async (username, questionId) => {
  try {
    const response = await axios.get(`${API_URL}/user-answers/${username}/${questionId}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// API call to change an answer given by an user
export const changeUserAnswers = async (username, answerId, answertext, saveText) => {
  try {
    const response = await axios.post(`${API_URL}/change-user-answer`, {username: username, answerId: answerId, answertext: answertext, saveText: saveText});
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// API call to save an answer given by an user
export const saveUserAnswers = async (username, answerId) => {
  try {
    const response = await axios.post(`${API_URL}/save-user-answer`,  {username, answerId});
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// API call to delete an answer given by an user
export const deleteUserAnswers = async (username, answerId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-user-answer`,  { data: {username, answerId }});
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// API call to save a finished survey by an user
export const saveUserSurvey = async (username, surveyId) => {
    try {
      const response = await axios.post(`${API_URL}/save-user-survey`, { username, surveyId});
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };
