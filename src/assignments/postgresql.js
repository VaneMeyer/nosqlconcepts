import React, { useState, useEffect } from "react";
import "./assignments.css";

const PostgreSQL = () => {
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

  useEffect(() => {
    // TODO fetch the task from a database

    //this is the first task

    setTask(
      "For each person you want to know in which department she or he works. Therefore, you should make an output that contains a person’s first name and last name and the name of the department she or he is working at."
    );
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
    if (taskNumber === 4) {
      // This is the last task
      alert("This is the last task");
    } else {
      setTask(`Solve this math problem: ${taskNumber} + ${taskNumber} = ?`);
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
    <div className="assignment">
      <h1>Task {taskNumber}</h1>
      <p>{task}</p>
      {hasStarted ? (
        <div>
          <p>Time: {formatTime(time)}</p>
          <p>Solution:</p>
          <textarea
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
          ></textarea>
          <p>Partial solution/Description/comment:</p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <p>Is the query executable?</p>
          <select
            value={isExecutable}
            onChange={(e) => setIsExecutable(e.target.value)}
          >
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
          <br />
          <p>Does the query return correct results?</p>
          <select
            value={isCorrect}
            onChange={(e) => setIsCorrect(e.target.value)}
          >
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
          <br />
          <p>Result size:</p>
          <input
            type="number"
            value={resultSize}
            onChange={(e) => setResultSize(e.target.value)}
          ></input>
          <br />
          <p>Difficulty level:</p>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value={0}>Select level</option>
            <option value={1}>Level 1</option>
            <option value={2}>Level 2</option>
            <option value={3}>Level 3</option>
            <option value={4}>Level 4</option>
            <option value={5}>Level 5</option>
          </select>
          <br />
          <br />
          {taskNumber === 4 ? (
            <button onClick={handleSubmit}>Submit</button>
          ) : (
            <button onClick={handleNextTask}>Next Task</button>
          )}{" "}
          <button onClick={stopTimer}>Finish task</button>
        </div>
      ) : (
        <button onClick={startTimer}>Start task</button>
      )}
    </div>
  );
};

export default PostgreSQL;