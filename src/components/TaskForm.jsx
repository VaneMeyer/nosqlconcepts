import React, { useState, useEffect } from "react";
import pgDataModel from "../images/datamodel1.png";
import mongoDataModel from "../images/datamodel4.png";
import neoDataModel from "../images/datamodel3.png";
import cassandraDataModel from "../images/datamodel2.png";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  useTheme,
} from "@mui/material";

import { tokens } from "../theme";
import MongoQueryComponent from "./MongoDBQuery";
import SQLQuery from "./SQLQuery";
import MQLQuery from "./MQLQuery";
import CypherQuery from "./CypherQuery";

const TaskForm = ({ title, taskdescr }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  /* Styles for mui components */
  let muiButtonStyle = {
    backgroundColor: colors.blueAccent[700],
    color: colors.grey[100],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
  };
  let muiRadioStyle = {
    "&.Mui-checked": {
      color: colors.primary[100],
    },
  };
  //const [taskDescription, setTaskDescription] = useState('');
  const [task, setTask] = useState("");
  const [solution, setSolution] = useState("");
  const [difficulty, setDifficulty] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [taskNumber, setTaskNumber] = useState(1);
  const [isExecutable, setIsExecutable] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [resultSize, setResultSize] = useState(0);
  const [comment, setComment] = useState("");
  const [tasksArray, setTasksArray] = useState([]);
  const [isPostgreSQL, setIsPostgreSQL] = useState(false);
  const [isMongoDB, setIsMongoDB] = useState(false);
  const [isCassandra, setIsCassandra] = useState(false);
  const [isNeo4J, setIsNeo4J] = useState(false);

  useEffect(() => {
    // TODO fetch the task from a database

    if (title === "PostgreSQL") {
      setIsPostgreSQL(true);
      setTask(
        "Task 1.1: For each person you want to know in which department she or he works. Therefore, you should make an output that contains a person’s first name and last name and the name of the department she or he is working at."
      );
      setTasksArray([
        " Task 1.2: For each department: Find out how many emails in total were sent out from employees working there. The output per department shall contain the corresponding number of emails.",
        "Task 1.3: For each department: Find out how many emails in total were sent to employees working there (hint: carbon copies included). The output shall have the same structure as the output of Task 1.2.",
        "Task 2.1: Do people that earn more than the average salary in their department write more emails than those who don’t? Query for people that earn more than the average salary at their department and find out whether they write more emails than the other employees that earn less than the average salary at their department (equal is not considered). Check that for each department. First compute the result for the average salary (avg. S.) per department that contains the brief-name of all the departments and the average salary for that department. Then produce the output of all the people that earn more than the avg. Salary and accordingly produce the output for all the people who earn less than the avg. Salary. Produce a query result per department that contains the number of emails written by the people earning more and the people earning less than the average.",
        "Task 3.1: Hint: First create a copy of email table (in the “public” schema) and name it with “email_yourname” (e.g. email_elmamooz) and execute the queries of task 3 (3.1, 3.2) on this new table. Add/delete data and attributes just in your own copy of email table. You have to introduce a new element (attribute) to the email’s entity set (to your own copy of email table you created in task 3.1). Find the general syntax to do that.",
        "Task 3.2: Now, use the syntax from task 3.2 and add a new element “priority” to the email’s entity set with a default value of 1 for each entry. Then take a single entry of your choice (with a certain id) and set its priority to a value of 3. Remember : Drop the table you created in task 3.1.",
        "Task 4.1: Find missing values for each attribute of the e-mails. Which attribute has the most missing values?",
        "Task 5.1: Select all emails that have been written between the 01.09.2001 and the 31.10.2001. First, find out which date and time format is used in email!",
        "Task 5.2: Larry May is an employee of Enron. Find all emails he received between the 01.09.2001 and the 31.10.2001.",
        "Task 6.1: Network analysis can be done to investigate social structures. In the related field of social network analysis a network is characterized by nodes (individual actors, people, or things within the network) and the edges (relationships or interactions) that connect them. To find out, how far from each other two nodes of the network are, we can count hops. To calculate the number of hops, we calculate m+1, where m is the number of intermediate nodes between the two nodes we’re looking at. In Enron example, each employee can be seen as a node in the network and edges are represented by the emails sent from one to another employee or by the “knows” relationship between two employees. A relational Database provides us only records; therefore solutions to network analysis must be derived somehow different. Hint: you can  use  a UDF (User defined function)  to solve the following two  tasks. Remember: Delete any created functions before you leave the site. If the network nodes (the persons) are fully connected, how many hops are needed to reach everyone in Enron from Larry May by email? Consider the “from” and “to” fields to compute the amount of hops that is needed to reach everyone in Enron.",
        "Task 6.2: How many hops are needed to reach everyone from Larry May by their 'knows' relationship (similar to task 6.1)?",
        "Task 6.3: Which people are in the 2-hop email network? Again, consider the “knows” relationship, but only for people that are reachable with two hops.",
        "Task 6.4: Find out who sent emails to exact 7 TO-recipients. The output shall contain the name(s) of the sender(s).",
        "Task 7.1: Take an email text and count the occurrence of each word in that email. The output shall contain the words and the number of occurrence. You might need to use an external programming language to implement a UDF (User defined function) to split the email text into words. Apply the UDF to a particular email body. Bonus: Show the result according to ·	the alphabetical order of the words ·	the ascending order of occurrence ·	the descending order of occurrence Remember: Delete any created functions before you leave the site.",
        "Task 7.2: Now, create an output similar to task 7.1 for all emails. Info: depending on the database management system, this operation might be very expensive and can result in a timeout. In that case you might want to set a threshold for a timeout, if possible. Remember: Delete any created functions before you leave the site.",
      ]);
    }
    if (title === "Cassandra") {
      setIsCassandra(true);
      setTask(
        "Task 1.1: For each person you want to know in which department she or he works. Therefore you have to make an output that contains a person’s first name and last name and the name of the department she or he is working at."
      );
      setTasksArray([
        "Task 1.2: For each department: Find out how many emails in total were sent out from employees working there. The output per department shall contain the corresponding number of emails.",
        "Task 1.3: For each department: Find out how many emails in total were sent to employees working there (hint: carbon copies included). The output shall have the same structure as the output of Task 1.2.",
        "Task 2.1: Do people that earn more than the average salary in their department write more emails than those who don’t? Query for people that earn more than the average salary at their department and find out whether they write more emails than the other employees that earn less than the average salary at their department (equal is not considered). Check that for each department. First compute the result for the average salary (avg. S.) per department. Then produce the output of people that earn more than the avg. S. and accordingly produce the output for people who earn less than the average salary. Produce a query result per department that contains the number of emails written by the people earning more and the people earning less than the average.",
        "Task 3.1: Create a copy of email table and name it with “email_yourname” (e.g. email_elmamooz) and execute the queries of task 3 (3.2, 3.3, 3.4) on this new table.",
        "Task 3.2: You have to introduce a new element (attribute) to the person’s entity set (to your own copy of email table you created in task 3.1). Find the general syntax to do that.",
        "Task 3.3: Now, use the syntax from task 3.2 and add a new element “priority” to the person’s entity set (your copy of table) with a default value of 1 for each entry. Then take a single entry of your choice (with a certain id) and set its priority to a value of 3.",
        "Task 3.4: Drop the table you created in task 3.1.",
        "Task 4.1: Find missing values for each attribute of the e-mails. Which attribute has the most missing values?",
        "Task 5.1: Select all emails that have been written between the 01.09.2001 and the 31.10.2001. First, find out which date and time format is used in email!",
        "Task 5.2: Larry May is an employee of Enron. Find all emails he received between the 1st of September 2001 and the 31st of October 2001.",
        "Task 6.1: Network analysis can be done to investigate social structures. In the related field of social network analysis a network is characterized by nodes (individual actors, people, or things within the network) and the edges (relationships or interactions) that connect them. To find out, how far from each other two nodes of the network are, we can count hops. To calculate the number of hops, we calculate m+1, where m is the number of intermediate nodes between the two nodes we’re looking at. In Enron example, each employee is a node in the network and edges are represented by the emails sent from one to another employee or by the “knows” relationship between two employees. If the network nodes (the persons) are fully connected, how many hops are needed to reach everyone in Enron from Larry May by email? Consider the “from” and “to” fields to compute the amount of hops that is needed to reach everyone in Enron.",
        "Task 6.2: How many hops are needed to reach everyone by their 'knows' relationship (similar to task 6.1)?",
        "Task 6.3: Which people are in the 2-hop email network? Again, consider the “knows” relationship, but only for people that are reachable with two hops.",
        "Task 6.4: Find out who sent emails to exact 7 TO-recipients. The output shall contain the name(s) of the sender(s).",
        "Task 7.1: Take an email text and count the occurrence of each word in that email. The output shall contain the words and the number of occurrence. You might need to integrate Java code into an UDF (User defined function) to split the email text into words. Apply the UDF to a particular email body. Hint: You might need an UDA (User defined aggregation) to produce the required output. Bonus: Show the result according to - the alphabetical order of the words - the ascending order of occurrence - the descending order of occurrence",
        "Task 7.2: Now, create an output similar to task 7.1 for all emails. Info: depending on the database management system, this operation might be very expensive and can result in a timeout. In that case you might want to set a threshold for a timeout, if possible.",
      ]);
    }
    if (title === "Neo4J") {
      setIsNeo4J(true);
      setTask(
        "Task 1.1: For each person you want to know in which department she or he works. Therefore you have to make an output that contains a person’s first name and last name and the name of the department she or he is working at."
      );
      setTasksArray([
        " Task 1.2: For each department: Find out how many emails in total were sent out from employees working there. The output per department shall contain the corresponding number of emails.",
        "Task 1.3: For each department: Find out how many emails in total were sent to employees working there (hint: carbon copies included). The output shall have the same structure as the output of Task 1.2.",
        "Task 2.1: Do people that earn more than the average salary in their department write more emails than those who don’t? Query for people that earn more than the average salary at their department and find out whether they write more emails than the other employees that earn less than the average salary at their department (equal is not considered). Check that for each department. First compute the result for the average salary (avg. S.) per department that contains the brief-name of all the departments and the average salary for that department. Then produce the output of all the people that earn more than the avg. Salary and accordingly produce the output for all the people who earn less than the avg. Salary. Produce a query result per department that contains the number of emails written by the people earning more and the people earning less than the average.",
        "Task 3.1: Find missing values for each attribute of the e-mails. Which attribute has the most missing values?",
        "Task 4.1: Select all emails that have been written between the 01.09.2001 and the 31.10.2001. First, find out which date and time format is used in email!",
        "Task 4.2: Larry May is an employee of Enron. Find all emails he received between the 01.09.2001 and the 31.10.2001.",
        "Task 5.1: Network analysis can be done to investigate social structures. In the related field of social network analysis a network is characterized by nodes (individual actors, people, or things within the network) and the edges (relationships or interactions) that connect them. To find out, how far from each other two nodes of the network are, we can count hops. To calculate the number of hops, we calculate m+1, where m is the number of intermediate nodes between the two nodes we’re looking at. If the network nodes (the persons) are fully connected, how many hops are needed to reach everyone in Enron from Larry May by email? Consider “EMAIL_FROM” and “EMAIL_TO” links to compute the amount of hops that is needed to reach everyone in Enron.",
        "Task 5.2: How many hops are needed to reach everyone by their 'KNOWS' relationship starting from Larry May (similar to task 5.1)?",
        "Task 5.3: Which people are in the 2-hop email network of Larry May? Again, consider the “KNOWS” relationship, but only for people that are reachable with two hops.",
        "Task 5.4: Find out who sent emails to exact 7 TO-recipients. The output shall contain the name(s) of the sender(s).",
      ]);
    }
    if (title === "MongoDB") {
      setIsMongoDB(true);
      setTask(
        "Task 1.1: For each person you want to know in which department she or he works. Therefore you have to make an output that contains a person’s first name and last name and the name of the department she or he is working at."
      );
      setTasksArray([
        " Task 1.2: For each department: Find out how many emails in total were sent out from employees working there. The output per department shall contain the corresponding number of emails.",
        "Task 1.3: For each department: Find out how many emails in total were sent to employees working there (hint: carbon copies included). The output shall have the same structure as the output of Task 1.2.",
        "Task 2.1: Do people that earn more than the average salary in their department write more emails than those who don’t? Query for people that earn more than the average salary at their department and find out whether they write more emails than the other employees that earn less than the average salary at their department (equal is not considered). Check that for each department. First compute the result for the average salary (avg. S.) per department that contains the brief-name of all the departments and the average salary for that department. Then produce the output of all the people that earn more than the avg. Salary and accordingly produce the output for all the people who earn less than the avg. Salary. Produce a query result per department that contains the number of emails written by the people earning more and the people earning less than the average.",
        "Task 3.1: Hint: First create a copy of email table and name it with “email_yourname” (e.g. email_elmamooz) and execute the queries of task 3 (3.1, 3.2) on this new table. Please do not change email table. Add/delete data and attributes just in your own copy of email table, not in the original one. You have to introduce a new element (attribute) to the email’s entity set (to your own copy of email table you created in task 3.1). Find the general syntax to do that.",
        "Task 3.2: Now, use the syntax from task 3.2 and add a new element “priority” to the email’s entity set (your copy of table) with a default value of 1 for each entry. Then take a single entry of your choice (with a certain id) and set its priority to a value of 3. Hint: Drop the table you created in task 3.1.",
        "Task 4.1: Find missing values for each attribute of the e-mails. Which attribute has the most missing values?",
        "Task 5.1: Select all emails that have been written between the 01.09.2001 and the 31.10.2001. First, find out which date and time format is used in email!",
        "Task 5.2: Larry May is an employee of Enron. Find all emails he received between the 01.09.2001 and the 31.10.2001.",
        "Task 6.1: Network analysis can be done to investigate social structures. In the related field of social network analysis a network is characterized by nodes (individual actors, people, or things within the network) and the edges (relationships or interactions) that connect them. To find out, how far from each other two nodes of the network are, we can count hops. To calculate the number of hops, we calculate m+1, where m is the number of intermediate nodes between the two nodes we’re looking at. In Enron example, each employee can be seen as a node in the network and edges are represented by the emails sent from one to another employee or by the “knows” relationship between two employees. If the network nodes (the persons) are fully connected, how many hops are needed to reach everyone in Enron from Larry May by email? Consider the “from” and “to” fields to compute the amount of hops that is needed to reach everyone in Enron.",
        "Task 6.2: How many hops are needed to reach everyone by their 'knows' relationship from Larry May (similar to task 6.1)?",
        "Task 6.3: Which people are in the 2-hop email network of Larry May? Again, consider the “knows” relationship, but only for people that are reachable with two hops.",
        "Task 6.4: Find out who sent emails to exact 7 TO-recipients. The output shall contain the name(s) of the sender(s).",
        "Task 7.1: Take an email text and count the occurrence of each word in that email. The output shall contain the words and the number of occurrence. You might need to use an external programming language to implement a UDF (User defined function) to split the email text into words. Apply the UDF to a particular email body. Bonus: Show the result according to - the alphabetical order of the words -	the ascending order of occurrence -	the descending order of occurrence",
        "Task 7.2: Now, create an output similar to task 7.1 for all emails. Info: depending on the database management system, this operation might be very expensive and can result in a timeout. In that case you might want to set a threshold for a timeout, if possible.",
      ]);
    }
    //this is the first task

    //setTask(taskdescr);
    //setTaskDescription('');
  }, []);

  const startTimer = () => {
    setIsRunning(true);
    setHasStarted(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO send data to database
    console.log({
      task: task,
      solution: solution,
      difficulty: difficulty,
      time: time,
      isExecutable: isExecutable,
      isCorrect: isCorrect,
      resultSize: resultSize,
      comment: comment,
    });
    alert("Submitted!");
  };

  // Function to handle navigation to the next task
  const handleNextTask = () => {
    // TODO fetch the next task from a database
    // and set it to the state variable "task"
    if (taskNumber === tasksArray.length + 1) {
      // This is the last task
      alert("This is the last task");
    } else {
      let newTask = taskNumber - 1;
      setTask(tasksArray[newTask]);
      setTaskNumber(taskNumber + 1);
      setSolution("");
      setDifficulty(0);
      setTime(0);
      setIsExecutable(false);
      setIsCorrect(false);
      setResultSize(0);
      setComment("");
      setIsRunning(false);
      setHasStarted(false);
    }
  };

  /* const handlePrevTask = () => {
    setTaskNumber(prevState => prevState - 1); 
    //let newTask = taskNumber - 1;
     //setTask(tasksArray[newTask]);
      
  } */

  // Function to format time in HH:MM:SS format
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
    const seconds = timeInSeconds - hours * 3600 - minutes * 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  // time count in seconds
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    if (time > 7200) {
      // Maximum time of 2 hours has been crossed
      alert("Maximum time limit of 2 hours has been reached");
      setHasStarted(false);
      setIsRunning(false);
      setTime(0);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]); // dependency on isRunning and time

  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
        {/* <h1>Task {taskNumber}</h1> */}
        <p>{task}</p>
        {hasStarted ? (
          <form>
            <p>Time: {formatTime(time)}</p>
            {/* <InputLabel id="query-input-label">Your query:</InputLabel>
          <TextField
            id="query-input-label"
            fullWidth
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
          /> */}
            {isPostgreSQL ? <SQLQuery /> : <p></p>}
            {isMongoDB ? <MQLQuery /> : <p></p>}
            {isNeo4J ? <CypherQuery /> : <p></p>}
            {/* <MongoQueryComponent/> */}
            <InputLabel id="partial-solution-label">
              Your partial solution:
            </InputLabel>
            <TextField
              id="partial-solution-label"
              fullWidth
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {/* <InputLabel id="isexecuteable-select-label">
            Is the query executable?
          </InputLabel>
          <Select
            fullWidth
            id="isexecuteable-select-label"
            value={isExecutable}
            onChange={(e) => setIsExecutable(e.target.value)}
          >
            <MenuItem value={0}>No</MenuItem>
            <MenuItem value={1}>Yes</MenuItem>
          </Select> */}
            {/* <InputLabel id="iscorrect-select-label">
            Does the query return correct results?
          </InputLabel>
          <Select
            id="iscorrect-select-label"
            fullWidth
            value={isCorrect}
            onChange={(e) => setIsCorrect(e.target.value)}
          >
            <MenuItem value={0}>No</MenuItem>
            <MenuItem value={1}>Yes</MenuItem>
          </Select> */}
            <InputLabel id="isCorrect-radiogroup">
              Does the query return correct results?
            </InputLabel>
            <RadioGroup
              row
              id="isCorrect-radiogroup"
              defaultValue={0}
              value={isCorrect}
              onChange={(e) => setIsCorrect(e.target.value)}
            >
              <FormControlLabel
                value={0}
                control={<Radio sx={muiRadioStyle} />}
                label="I don't know"
              />
              <FormControlLabel
                value={1}
                control={<Radio sx={muiRadioStyle} />}
                label="Yes"
              />
              <FormControlLabel
                value={2}
                control={<Radio sx={muiRadioStyle} />}
                label="No"
              />
            </RadioGroup>
            {/* <InputLabel id="resultsize-label">Result size:</InputLabel>
          <TextField
            id="resultsize-label"
            fullWidth
            type="number"
            value={resultSize}
            onChange={(e) => setResultSize(e.target.value)}
          ></TextField> */}
            <InputLabel id="difficulty-level-radiogroup">
              Difficulty level:
            </InputLabel>
            <RadioGroup
              row
              id="difficulty-level-radiogroup"
              defaultValue={0}
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <FormControlLabel
                value={0}
                control={<Radio sx={muiRadioStyle} />}
                label="None"
              />
              <FormControlLabel
                value={1}
                control={<Radio sx={muiRadioStyle} />}
                label="Very easy"
              />
              <FormControlLabel
                value={2}
                control={<Radio sx={muiRadioStyle} />}
                label="Easy"
              />
              <FormControlLabel
                value={3}
                control={<Radio sx={muiRadioStyle} />}
                label="Normal"
              />
              <FormControlLabel
                value={4}
                control={<Radio sx={muiRadioStyle} />}
                label="Difficult"
              />
              <FormControlLabel
                value={5}
                control={<Radio sx={muiRadioStyle} />}
                label="Very difficult"
              />
            </RadioGroup>
            <br />
            <br />
            {taskNumber === tasksArray.length + 1 ? (
              <Button sx={muiButtonStyle} onClick={handleSubmit}>
                Submit
              </Button>
            ) : (
              <Button sx={muiButtonStyle} onClick={handleNextTask}>
                Next Task
              </Button>
            )}{" "}
            {/* <Button sx={muiButtonStyle} onClick={handlePrevTask}>
            Previous task
          </Button> */}
            <Button sx={muiButtonStyle} onClick={stopTimer}>
              Stop time
            </Button>
          </form>
        ) : (
          <Button sx={muiButtonStyle} onClick={startTimer}>
            Start task
          </Button>
        )}
      </Box>
      <Box>
        {isPostgreSQL && (<img
          src={pgDataModel}
          alt="Data model of PostgreSQL enron database - further description follows"
          width={800}
        />)}
        {isMongoDB && (<img
          src={mongoDataModel}
          alt="Data model of MongoDB enron database - further description follows"
          width={800}
        />)}
        {isNeo4J && (<img
          src={neoDataModel}
          alt="Data model of Neo4J enron database - further description follows"
          width={800}
        />)}
        {isCassandra && (<img
          src={cassandraDataModel}
          alt="Data model of Cassandra enron database - further description follows"
          width={800}
        />)}
      </Box>
    </Box>
  );
};

export default TaskForm;
