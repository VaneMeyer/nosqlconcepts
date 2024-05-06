import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import ResultTable from "./ResultTable";

const ExerciseManager = () => {
  const [exercises, setExercises] = useState("");
  const [newExercise, setNewExercise] = useState({
    statement_id: 0,
    area_id: 0,
    statement_text: "",
    solution_query: "",
    topic: "",
    subtasknumber: "",
    maxtime: "",
    hint: "",
    tasknumber: "",
  });

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      const response = await axios.get("/api/getexercises");
      setExercises(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewExercise({ ...newExercise, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/api/exercises", newExercise);
      setNewExercise({
        statement_id: 0,
        area_id: 0,
        statement_text: "",
        solution_query: "",
        topic: "",
        subtasknumber: "",
        maxtime: "",
        hint: "",
        tasknumber: "",
      });
      loadExercises();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Exercises
      </Typography>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <TextField
          fullWidth
          variant="outlined"
          label="statement_id"
          name="statement_id"
          value={newExercise.statement_id}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        />
        <Select
          fullWidth
          variant="outlined"
          label="Area ID"
          name="area_id"
          value={newExercise.area_id}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        >
          {[1, 2, 3, 4, 5, 6].map((number) => (
            <MenuItem key={number} value={number}>
              {number}
            </MenuItem>
          ))}
        </Select>
        <TextField
          fullWidth
          variant="outlined"
          label="page"
          name="tasknumber"
          value={newExercise.tasknumber}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="topic"
          name="topic"
          value={newExercise.topic}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="subtasknumber"
          name="subtasknumber"
          value={newExercise.subtasknumber}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="maxtime"
          name="maxtime"
          value={newExercise.maxtime}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          label="Exercise Description"
          name="statement_text"
          value={newExercise.statement_text}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          label="solution"
          name="solution_query"
          value={newExercise.solution_query}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Exercise
        </Button>
      </form>
      <Typography variant="h5" gutterBottom>
        List of exercises
      </Typography>

      <ResultTable queryResult={exercises} resultSize={exercises.length} />
    </Container>
  );
};

export default ExerciseManager;
