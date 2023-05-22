import React, { useState, useEffect } from 'react';

const Task = () => {
    const [task, setTask] = useState('');
    const [solution, setSolution] = useState('');
    const [difficulty, setDifficulty] = useState(0);
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [taskNumber, setTaskNumber] = useState(1);
  
    useEffect(() => {
      // Here you can fetch the task from a database or any other source
      // and set it to the state variable "task"
      setTask('Solve this math problem: 3 * 5 = ?');
    }, []);
  
    // Function to start the timer
    const startTimer = () => {
      setIsRunning(true);
      setHasStarted(true);
    }
  
    // Function to stop the timer
    const stopTimer = () => {
      setIsRunning(false);
    }
  
    // Function to handle submission of solution and difficulty level
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Here you can send the data to the PostgreSQL database
      console.log({
        task: task,
        solution: solution,
        difficulty: difficulty,
        time: time
      });
  
      // Increment the task number and reset the variables for the next task
      setTaskNumber(taskNumber + 1);
      setSolution('');
      setDifficulty(0);
      setTime(0);
      setIsRunning(false);
      setHasStarted(false);
    }
  
    // Function to handle navigation to the next task
    const handleNextTask = () => {
      // Here you can fetch the next task from a database or any other source
      // and set it to the state variable "task"
      if (taskNumber === 4) {
        // This is the last task
        alert('This is the last task');
      } else {
        setTask(`Solve this math problem: ${taskNumber} + ${taskNumber} = ?`);
        setTaskNumber(taskNumber + 1);
        setSolution('');
        setDifficulty(0);
        setTime(0);
        setIsRunning(false);
        setHasStarted(false);
      }
    }
  
    // Function to format time in HH:MM:SS format
    const formatTime = (timeInSeconds) => {
      const hours = Math.floor(timeInSeconds / 3600);
      const minutes = Math.floor((timeInSeconds - (hours * 3600)) / 60);
      const seconds = timeInSeconds - (hours * 3600) - (minutes * 60);
  
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  
    useEffect(() => {
      let interval;
      if (isRunning) {
        interval = setInterval(() => {
          setTime(time => time + 1);
        }, 1000);
      } else {
        clearInterval(interval);
      }
      if (time > 7200) {
        // Maximum time of 2 hours has been crossed
        alert('Maximum time limit of 2 hours has been reached');
        setHasStarted(false);
        setIsRunning(false);
        setTime(0);
      }
      return () => clearInterval(interval);
    }, [isRunning, time]);
  
    return (
      <div>
        <h1>Task {taskNumber}</h1>
        <p>{task}</p>
        {hasStarted ? (
          <div>
            <p>Time: {formatTime(time)}</p>
            <p>Solution:</p>
            <textarea value={solution} onChange={(e) => setSolution(e.target.value)}></textarea>
            <p>Difficulty level:</p>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
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
            )}
            {' '}
            <button onClick={stopTimer}>Finish</button>
          </div>
        ) : (
          <button onClick={startTimer}>Start task</button>
        )}
      </div>
    );
  }
  
  export default Task;