import React from "react";
import PropTypes from "prop-types";
import { Box, Tabs, Tab, Typography, Container } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

// Accessibility-friendly a11yProps function
function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function DatabaseTutorials() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Database Tutorials Tabs"
        >
          <Tab label="PostgreSQL" {...a11yProps(0)} />
          <Tab label="Cassandra" {...a11yProps(1)} />
          <Tab label="Neo4J" {...a11yProps(2)} />
          <Tab label="MongoDB" {...a11yProps(3)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Typography variant="h5">PostgreSQL Tutorial</Typography>
          <Typography paragraph>
            PostgreSQL is a powerful, open-source object-relational database
            system with a strong reputation for reliability, feature robustness,
            and performance. Here is a detailed tutorial to get started with
            PostgreSQL:
          </Typography>
          <ul>
            <li>Installation and Setup</li>
            <li>Basic SQL Commands</li>
            <li>Data Types and Constraints</li>
            <li>Indexes and Performance Optimization</li>
            <li>Advanced Features (JSON, Full-text Search, etc.)</li>
            <li>Backup and Restore</li>
          </ul>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Typography variant="h5">Cassandra Tutorial</Typography>
          <Typography paragraph>
            Apache Cassandra is a highly scalable, distributed NoSQL database
            designed to handle large amounts of data across many commodity
            servers, providing high availability with no single point of
            failure. Here's an in-depth tutorial on working with Cassandra:
          </Typography>
          {/*  <ul>
          <li>Understanding Cassandra's Architecture</li>
          <li>Setting up a Cassandra Cluster</li>
          <li>Introduction to CQL (Cassandra Query Language)</li>
          <li>Data Modeling Best Practices</li>
          <li>Managing Replication and Consistency</li>
          <li>Troubleshooting and Monitoring</li>
        </ul> */}
          <Typography variant="h5">Introduction to CQL</Typography>
          <Typography paragraph>
            CQL (Cassandra Query Language) is the primary language for creating
            and querying data in Apache Cassandra. CQL is similar to SQL, but is
            tailored to the special requirements of Cassandra as a distributed
            NoSQL database.
          </Typography>
          <Typography variant="h5">Basic Concepts</Typography>
          <Typography variant="h6">Keyspaces</Typography>
          <Typography paragraph>
            A keyspace is the highest logical container object in Cassandra. It
            corresponds roughly to a database in a relational database
            management system (RDBMS). A keyspace contains one or more tables.
          </Typography>
          <hr></hr>
          <Typography paragraph>
            Syntax for creating a keyspace: <br></br>
            {`CREATE KEYSPACE my_keyspace
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3};`}
          </Typography>
          <hr></hr>
          <ul>
            <li>
              SimpleStrategy: A simple replication strategy that is suitable for
              single DC setups.
            </li>
            <li>
              replication_factor: Number of replicas that are distributed across
              the cluster.
            </li>
          </ul>
          <Typography variant="h6">Tables</Typography>
          <Typography paragraph>
            A table (also known as a column family) contains rows of data
            organised in columns. Each table must have a primary key consisting
            of one or more fields.
          </Typography>
          <hr></hr>
          <Typography paragraph>
            Syntax for creating a table: <br></br>
            {`CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    name TEXT,
    age INT,
    email TEXT
);
`}
          </Typography>
          <hr></hr>
          <ul>
            <li>user_id is the primary key that uniquely identifies the rows in the table.</li>
          </ul>
          
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Typography variant="h5">Neo4J Tutorial</Typography>
          <Typography paragraph>
            Neo4J is a leading graph database management system, optimized for
            storing and querying graph-like structures efficiently. This
            tutorial will help you master Neo4J:
          </Typography>
          <ul>
            <li>Introduction to Graph Databases and Neo4J</li>
            <li>Installing and Configuring Neo4J</li>
            <li>Basic CRUD Operations with Cypher Query Language</li>
            <li>Graph Data Modeling Techniques</li>
            <li>Advanced Cypher Queries</li>
            <li>Performance Tuning and Scaling Neo4J</li>
          </ul>
        </TabPanel>

        <TabPanel value={value} index={3}>
          <Typography variant="h5">MongoDB Tutorial</Typography>
          <Typography paragraph>
            MongoDB is a popular, open-source, NoSQL database known for its high
            performance, flexibility, and scalability. Here is a comprehensive
            tutorial on MongoDB:
          </Typography>
          <ul>
            <li>Introduction to MongoDB and NoSQL</li>
            <li>Installing MongoDB and Setting up a Database</li>
            <li>CRUD Operations and Data Modeling</li>
            <li>Indexes and Aggregation Framework</li>
            <li>Replication and Sharding</li>
            <li>Backup, Restore, and Security Best Practices</li>
          </ul>
        </TabPanel>
      </Box>
    </Container>
  );
}

/* import React, { useState } from 'react';
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
 */
