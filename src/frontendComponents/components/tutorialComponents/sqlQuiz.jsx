import React, { useState } from 'react';
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
  Paper,
} from '@mui/material';

const Quiz = ({ questionData, onSubmit }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmit = () => {
    const currentQuestion = questionData[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < questionData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
      if (onSubmit) onSubmit(score + 1);
    }
  };

  const currentQuestion = questionData[currentQuestionIndex];

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: '0 auto' }}>
      {showResult ? (
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            Quiz Completed!
          </Typography>
          <Typography variant="h6">
            Your Score: {score} / {questionData.length}
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography variant="h5" gutterBottom>
            Question {currentQuestionIndex + 1} of {questionData.length}
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            {currentQuestion.question}
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="quiz"
              name={`question-${currentQuestionIndex}`}
              value={selectedAnswer}
              onChange={handleAnswerChange}
            >
              {currentQuestion.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                  aria-checked={selectedAnswer === option}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Box sx={{ marginTop: 3, textAlign: 'right' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
            >
              {currentQuestionIndex === questionData.length - 1
                ? 'Finish'
                : 'Next'}
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default Quiz;

/* // Example usage:
 const questions = [
   {
     question: 'What is the capital of France?',
     options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
     correctAnswer: 'Paris',
   },
   {
     question: 'Which planet is known as the Red Planet?',
     options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
     correctAnswer: 'Mars',
   },
 ];

  <Quiz questionData={questions} onSubmit={(score) => console.log(`Final Score: ${score}`)} />  */
