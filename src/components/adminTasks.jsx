import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ResultTable from "./ResultTable";
import WarningIcon from "@mui/icons-material/Warning";
import ImportantMsg from "./importantMsg";

const ExerciseManager = () => {
  //################# State Variables ######################################################
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
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [statementsArray, setStatementsArray] = useState([]);
  const [areaSelected, setAreaSelected] = useState(false);

  //################# useEffect function  ######################################################
  useEffect(() => {
    loadExercises();
   /* loadStatementsforSelect(); */ 
  }, []);

  //################# Functions  ######################################################
  const loadExercises = async () => {
    try {
      const response = await axios.get("/api/getexercises");
      setExercises(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const loadStatementsforSelect = async () => {
    const areaId = newExercise.area_id;
    axios
      .post("/api/getstatements", { areaId })
      .then((response) => {
        setStatementsArray(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  //################# handle functions  ######################################################

/*    const handleShowContent = () => {
setAreaSelected(true);
loadStatementsforSelect();

   } */
  const handleInputChange = (event) => {
    
    const { name, value } = event.target;
    
    if (name !== "statement_id"){
    setNewExercise({ ...newExercise, [name]: value });}
    else {
      if (value === '' || /^\d+$/.test(value)) {
        setNewExercise({ ...newExercise, [name]: value });
      }
    }
    /* if (name === "area_id") {
    setAreaSelected(false);
      loadStatementsforSelect();
    } */
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

  const handleUpdate = () => {
    setActionType("update");
    setConfirmationDialogOpen(true);
  };

  const handleDelete = () => {
    setActionType("delete");
    setConfirmationDialogOpen(true);
  };

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
  };

  const handleConfirmation = async () => {
    if (actionType === "update") {
      try {
        await axios.post("/api/update-exercises", newExercise);
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
    } else if (actionType === "delete") {
      try {
        await axios.post("/api/delete-exercises", newExercise);
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
    }
    setConfirmationDialogOpen(false);
  };

  //################# Frontend  ######################################################
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Exercises
      </Typography>
      <ImportantMsg
          message={
            <>
             <WarningIcon />
              Work in progress
            </>
          }
          type="info"
        />
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <InputLabel id="area-id-label">
          Select an area_id (1 = PostgreSQL, 2 = Cassandra, 3 = Neo4J, 4 = MongoDB, 5 =
          Lab1, 6 = Lab2)
        </InputLabel>
        <Select
          fullWidth
          name="area_id"
          value={newExercise.area_id}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
          labelId="area-id-label"
          label="area_id"
        >
          {[1, 2, 3, 4, 5, 6].map((number) => (
            <MenuItem key={number} value={number}>
              {number}
            </MenuItem>
          ))}
        </Select>
       {/*  <Button onClick={handleShowContent}>Manage Exercises</Button> */}

        {/* areaSelected && */ (<div>{/* <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={newExercise.statement_id}
          label="Select existing statement_id, if you want to update or delete exercise"
          onChange={handleInputChange}
        >
          {statementsArray.map((item) => (
            <MenuItem key={item.statement_id} value={item.statement_id}>
              {item.statement_id}
            </MenuItem>
          ))}
        </Select> */}
        <TextField
          fullWidth
          variant="outlined"
          label="statement_id (tasknumber, should be a positive integer)"
          name="statement_id"
          value={newExercise.statement_id}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        />
        
        <TextField
          fullWidth
          variant="outlined"
          label="page (is also a title for a taskform page, e.g. 'Page 1', the number should be equal to the statement_id)"
          name="tasknumber"
          value={newExercise.tasknumber}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="topic (Specify a Use case topic, e.g. 'Use case 1: Equi Join')"
          name="topic"
          value={newExercise.topic}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="subtask title (specify a short subtask title, e.g. '1.1 List of people...')"
          name="subtasknumber"
          value={newExercise.subtasknumber}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="maxtime (maximum time that students should work on this task, e.g. 'Maxtime: 1h')"
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
          label="exercise description (detailed task description)"
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
          label="hint (optional)"
          name="hint"
          value={newExercise.hint}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          label="solution (only if there is a solution query. If no query, then type in a solution within /* */)"
          name="solution_query"
          value={newExercise.solution_query}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Exercise
        </Button>
        <br></br>
        <p>
          If you want to overwrite an existing exercise, please fill the form
          with the new content and click on the OVERWRITE EXERCISE Button.{" "}
        </p>
        <Button
          type="button"
          variant="contained"
          color="error"
          onClick={handleUpdate}
        >
          Overwrite Exercise
        </Button>
        <br></br>
        <p>
          If you want to delete an existing exercise, please fill statement_id
          and select an area_id and click on the DELETE EXERCISE Button.{" "}
        </p>
        <Button
          type="button"
          variant="contained"
          color="error"
          onClick={handleDelete}
        >
          Delete Exercise
        </Button></div>)}
        
      </form>
      <Dialog
        open={confirmationDialogOpen}
        onClose={handleConfirmationDialogClose}
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {actionType} the exercise?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationDialogClose}>Cancel</Button>
          <Button onClick={handleConfirmation} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h5" gutterBottom>
        List of exercises
      </Typography>

      <ResultTable queryResult={exercises} resultSize={exercises.length} />
    </Container>
  );
};

export default ExerciseManager;
