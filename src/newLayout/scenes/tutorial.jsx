import React, { useState } from 'react';
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/system';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center'
}));

const TutorialAndQuiz = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [quizData, setQuizData] = useState({
    topic: '',
    question: '',
    answer: ''
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleQuizSubmit = () => {
    // Handle quiz submission logic here
    console.log(quizData);
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData({
      ...quizData,
      [name]: value
    });
  };

  const tutorials = [
    {
      title: 'SQL Tutorial',
      content: `
        SQL (Structured Query Language) is used to manage and manipulate relational databases.
        Basic Commands:
        - SELECT: Retrieve data from a database.
        - INSERT: Add new data to a database.
        - UPDATE: Modify existing data.
        - DELETE: Remove data.
        
        Example:
        \`\`\`sql
        SELECT * FROM users WHERE age > 30;
        \`\`\`
      `,
      quiz: {
        question: 'What SQL command is used to retrieve data from a database?',
        answer: 'SELECT'
      }
    },
    {
      title: 'CQL Tutorial',
      content: `
        CQL (Cassandra Query Language) is used to interact with the Cassandra database.
        Basic Commands:
        - SELECT: Retrieve data from a table.
        - INSERT: Add new data to a table.
        - UPDATE: Modify existing data.
        - DELETE: Remove data.
        
        Example:
        \`\`\`sql
        SELECT * FROM users WHERE age > 30;
        \`\`\`
      `,
      quiz: {
        question: 'What CQL command is used to add new data to a table?',
        answer: 'INSERT'
      }
    },
    {
      title: 'Cypher Tutorial',
      content: `
        Cypher is a query language for the Neo4j graph database.
        Basic Commands:
        - MATCH: Retrieve data from the graph.
        - CREATE: Add new nodes and relationships.
        - SET: Modify properties on nodes and relationships.
        - DELETE: Remove nodes and relationships.
        
        Example:
        \`\`\`cypher
        MATCH (n:Person) WHERE n.age > 30 RETURN n;
        \`\`\`
      `,
      quiz: {
        question: 'What Cypher command is used to retrieve data from the graph?',
        answer: 'MATCH'
      }
    },
    {
      title: 'MQL Tutorial',
      content: `
        MQL (MongoDB Query Language) is used to interact with MongoDB, a NoSQL database.
        Basic Commands:
        - find: Retrieve documents from a collection.
        - insert: Add new documents to a collection.
        - update: Modify existing documents.
        - remove: Remove documents.
        
        Example:
        \`\`\`javascript
        db.users.find({ age: { $gt: 30 } });
        \`\`\`
      `,
      quiz: {
        question: 'What MQL command is used to retrieve documents from a collection?',
        answer: 'find'
      }
    }
  ];

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Tutorials and Quizzes
      </Typography>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="tutorial tabs"
      >
        {tutorials.map((tutorial, index) => (
          <Tab key={index} label={tutorial.title} id={`tab-${index}`} aria-controls={`tabpanel-${index}`} />
        ))}
      </Tabs>
      {tutorials.map((tutorial, index) => (
        <StyledBox
          role="tabpanel"
          hidden={selectedTab !== index}
          id={`tabpanel-${index}`}
          key={index}
        >
          <Typography variant="h6">{tutorial.title}</Typography>
          <Typography component="div">
            <pre>{tutorial.content}</pre>
          </Typography>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Take Quiz
          </Button>
        </StyledBox>
      ))}

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Quiz</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Answer the following question:
          </DialogContentText>
          <FormControl fullWidth margin="normal">
            <InputLabel id="select-label">Topic</InputLabel>
            <Select
              labelId="select-label"
              value={quizData.topic}
              onChange={handleInputChange}
              name="topic"
            >
              {tutorials.map((tutorial, index) => (
                <MenuItem key={index} value={tutorial.title}>{tutorial.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            name="question"
            label="Question"
            type="text"
            fullWidth
            value={quizData.question}
            onChange={handleInputChange}
            disabled
          />
          <TextField
            margin="dense"
            name="answer"
            label="Answer"
            type="text"
            fullWidth
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleQuizSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TutorialAndQuiz;
