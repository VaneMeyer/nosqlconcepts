import React, { useState } from 'react';
import axios from 'axios';

const question = "You have to find a suitable database query for the following task: For each person you want to know in which department she or he works. Therefore, you have to make an output that contains a person’s first name and last name and the name of the department she or he is working at.";

function TestC() {
  const [studentAnswer, setStudentAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback('');

    try {
      const response = await axios.post('http://localhost:3001/api/feedback', {
        question,
        studentAnswer
      });
      setFeedback(response.data.feedback);
    } catch (error) {
      setFeedback('❌ Error getting feedback.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto' }}>
      <h2>📘 Educational Feedback Tool</h2>
      <p><strong>Question:</strong> {question}</p>

      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          value={studentAnswer}
          onChange={(e) => setStudentAnswer(e.target.value)}
          placeholder="✍️ Type your answer here..."
          style={{ width: '100%', marginBottom: '1rem' }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Getting Feedback...' : 'Submit Answer'}
        </button>
      </form>

      {feedback && (
        <div style={{ marginTop: '2rem', background: '#eef', padding: '1rem' }}>
          <strong>📋 AI Feedback:</strong>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
}

export default TestC;


/* import React from 'react';
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Grid,
  useMediaQuery,
  IconButton
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DownloadIcon from "@mui/icons-material/Download";
import SaveIcon from "@mui/icons-material/Save";
import PauseIcon from '@mui/icons-material/Pause';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-sql";
import "../../custom_ace_files/mode-cypher";
import "../../custom_ace_files/mode-mongodb";
import "../../custom_ace_files/mode-pgsql";
import "../../custom_ace_files/theme-goethe";
import PgDatabaseSchema from "../components/pgSchema";
import { styled } from '@mui/system';

const GradientButton = styled(Button)(({ theme }) => ({
  borderRadius: '25px',
  padding: '10px 20px',
  background: 'linear-gradient(135deg,rgb(12, 88, 154) 0%,rgb(16, 115, 120) 100%)',
  color: '#ffffff',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s, box-shadow 0.2s',

  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 14px rgba(0, 0, 0, 0.15)',
    background: 'linear-gradient(135deg, #3fa9f5 0%, #00d6e6 100%)',
  },

  '&:focus-visible': {
    outline: '3px solid #ffffff',
    outlineOffset: '2px',
  },

  '&:disabled': {
    background: '#b3e5fc',
    color: '#ffffff',
    opacity: 0.6,
  },
}));

export default function TestExerciseSheet() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const SidebarContent = () => (
    <>
      <Typography variant="h6" component="h2" gutterBottom>PostgreSQL Tasks</Typography>
      <List aria-label="Task List">
        <ListItem button selected>
          <ListItemText primary="Info" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Task 1.1: Find people and their department" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Task 1.2: xxxx" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Task 1.3: xxxx" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Task 2.1: xxxxx" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Task 2.2: xxxxx" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Finish and Submission Info" />
        </ListItem>
      </List>
    </>
  );

  return (
    <Box display="flex" flexDirection={isSmallScreen ? 'column' : 'row'} height="100vh">
     
      {!isSmallScreen && (
        <Box width="20%" p={2} bgcolor="#f5f5f5" borderRight={1} borderColor="divider">
          <SidebarContent />
        </Box>
      )}

    
      <Box flexGrow={1} p={2} display="flex" flexDirection="column">
        <Box display="flex" flexDirection={isSmallScreen ? 'column' : 'row'} justifyContent="space-between" mb={2}>
          <Box mb={isSmallScreen ? 2 : 0}>
            <Typography variant="h4" component="h1">Equi Join</Typography>
            <Typography variant="subtitle1">1.1 Find people and their department</Typography>
            <Typography variant="body2" color="textSecondary">
              Find out what department each person is working for. The Output should contain all persons with their firstname and lastname, as well as the name of the department.
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Hint: you may have to also use the schema name 'email' in your queries.
            </Typography>
          </Box>
          <Box textAlign={isSmallScreen ? 'left' : 'right'}>
            <Typography variant="body2">Max Time: 0,5h</Typography>
            <Typography variant="body2">
              Timer: 00:00:00 <IconButton color="secondary"><PauseIcon /></IconButton>
            </Typography>
            <Box mt={1}>
              <IconButton color="primary" aria-label="Save"><SaveIcon /></IconButton>
              <IconButton color="primary" aria-label="Download"><DownloadIcon /></IconButton>
            </Box>
          </Box>
        </Box>

       
        <Grid container spacing={2} flexGrow={1}>
          <Grid item xs={12} md={6} order={{ xs: 1, md: 1 }}>
            <Typography variant="caption" component="label" htmlFor="editor">Query Editor</Typography>
            <AceEditor
              id="query-input-label"
              name="query"
              mode="sql"
              editorProps={{ $blockScrolling: true }}
              style={{ width: "100%", height: "400px" }}
              setOptions={{ fontSize: "16px" }}
            />
            <Box textAlign="center" mt={2}>
              <GradientButton>Run Query</GradientButton>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} order={{ xs: 2, md: 3 }}>
            <Typography variant="caption" component="label" htmlFor="output">Output</Typography>
            <TextField id="output" aria-label="Output" multiline rows={4} fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12} md={6} order={{ xs: 3, md: 4 }}>
            <Typography variant="caption" component="label" htmlFor="radio-groups">Self-Assessment and Text-Submission</Typography>
            <TextField id="radio-groups" aria-label="Self-Assessment and Submission" multiline rows={4} fullWidth variant="outlined" />
          </Grid>

          <Grid item xs={12} md={6} order={{ xs: 4, md: 2 }}>
            <Typography variant="caption" component="label" htmlFor="db-structure">Database Structure</Typography>
            <Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
              <PgDatabaseSchema />
            </Box>
          </Grid>
        </Grid>
      </Box>

     
      {isSmallScreen && (
        <Box width="100%" p={2} bgcolor="#f5f5f5" borderTop={1} borderColor="divider">
          <SidebarContent />
        </Box>
      )}

    </Box>
  );
}
 */