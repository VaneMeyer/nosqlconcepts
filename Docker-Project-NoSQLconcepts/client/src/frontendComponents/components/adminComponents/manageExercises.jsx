import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import {
  Container,
  Typography,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import {
  addExercise,
  deleteExercise,
  fetchExercises,
  updateExercise,
} from "../../api/adminApi";
import { fetchAreaNames } from "../../api/mainApi";

const ManageExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [areamames, setAreaNames] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [maxId, setMaxId] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [formValues, setFormValues] = useState({
    statement_id: 0,
    area_id: "",
    statement_text: "",
    solution_query: "",
    topic: "",
    subtasknumber: "",
    maxtime: "",
    hint: "",
    tasknumber: "",
  });
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [areaIdFilter, setAreaIdFilter] = useState(""); // New state for area_id filter

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      const response = await fetchExercises();
      setExercises(response);

      const response2 = await fetchAreaNames();
      setAreaNames(response2);
      /*  const filteredStatementIds = response.filter(
        (exercise) => exercise.area_id === selectedArea
      );
     
      let idArray = filteredStatementIds.map((item) => item.statement_id);
      let maxId = Math.max(...idArray) + 1;
      setMaxId(maxId); */
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAdd = () => {
    setActionType("add");
    setFormValues({
      statement_id: 0,
      area_id: "",
      statement_text: "",
      solution_query: "",
      topic: "",
      subtasknumber: "",
      maxtime: "",
      hint: "",
      tasknumber: "",
    });
    setOpenFormDialog(true);
    setSelectedArea("");
  };

  const handleEdit = (exercise) => {
    setActionType("edit");
    setSelectedExercise(exercise);
    setSelectedArea(exercise.area_id);
    setFormValues({ ...exercise });
    setOpenFormDialog(true);
  };

  const handleDelete = (exercise) => {
    setActionType("delete");
    setSelectedExercise(exercise);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
  };

  const handleFormDialogClose = () => {
    setOpenFormDialog(false);
    setFormValues({
      statement_id: 0,
      area_id: "",
      statement_text: "",
      solution_query: "",
      topic: "",
      subtasknumber: "",
      maxtime: "",
      hint: "",
      tasknumber: "",
    });
  };

  const handleConfirmation = async () => {
    try {
      if (actionType === "delete") {
        await deleteExercise(
          selectedExercise.statement_id,
          selectedExercise.area_id
        );
      } else if (actionType === "add") {
        if (
          formValues.area_id &&
          formValues.statement_id &&
          formValues.statement_text &&
          formValues.subtasknumber
        ) {
          await addExercise(formValues);
        } else {
          alert("Please fill all required fields!");
        }
        setSelectedArea("");
      } else if (actionType === "edit") {
        if (
          formValues.area_id &&
          formValues.statement_id &&
          formValues.statement_text &&
          formValues.subtasknumber
        ) {
          await updateExercise(formValues);
        } else {
          alert("Please fill all required fields!");
        }
        setSelectedArea("");
      }
      loadExercises();
    } catch (error) {
      console.error("Error:", error);
      if (actionType === "add") {
        alert(
          "Failed to add exercise. Please make sure that the statement_id and/or area_id don't already exist."
        );
      }
      if (actionType === "delete") {
        alert(
          "Failed to delete exercise. There is user data for this exercise."
        );
      }
    }
    setConfirmationDialogOpen(false);
    setOpenFormDialog(false);
  };

  const handleFormInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAreaIdFilterChange = (event) => {
    setAreaIdFilter(event.target.value);
  };
  const handleSelectedArea = (event) => {
    setSelectedArea(event.target.value);

    
      const filteredStatementIds = exercises.filter(
        (exercise) => exercise.area_id === event.target.value
      );
      
if (filteredStatementIds.length > 0) {
      let idArray = filteredStatementIds.map((item) => item.statement_id);
      let maxId = Math.max(...idArray) + 1;
      /* setMaxId(maxId);  */
      setFormValues({
        ...formValues,
        area_id: event.target.value,
        statement_id: maxId,
      });
    } else {
      setFormValues({
        ...formValues,
        area_id: event.target.value,
        statement_id: 1,
      });
    }
  };

  const filteredExercises = exercises.filter((exercise) => {
    return areaIdFilter === "" || exercise.area_name === areaIdFilter;
  });

  const uniqueAreaIds = [
    ...new Set(exercises.map((exercise) => exercise.area_name)),
  ];
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Exercises
      </Typography>

      <Button
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        onClick={handleAdd}
        sx={{ mb: 2 }}
      >
        Add Exercise
      </Button>
      <FormControl
        fullWidth
        variant="outlined"
        style={{ marginBottom: "20px" }}
      >
        <InputLabel id="area-id-filter-label">Filter by Area</InputLabel>
        <Select
          labelId="area-id-filter-label"
          value={areaIdFilter}
          onChange={handleAreaIdFilterChange}
          label="Filter by Area ID"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {uniqueAreaIds.map((area_name) => (
            <MenuItem key={area_name} value={area_name}>
              {area_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer>
        <Table aria-label="exercise table">
          <TableHead>
            <TableRow>
              <TableCell>Statement ID</TableCell>
              <TableCell>Area ID</TableCell>
              <TableCell>Area Name</TableCell>
              <TableCell>Statement Text</TableCell>
              <TableCell>Topic</TableCell>
              <TableCell>Subtask Number</TableCell>
              <TableCell>Max Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredExercises.map((exercise) => (
              <TableRow key={exercise.statement_id}>
                <TableCell>{exercise.statement_id}</TableCell>
                <TableCell>{exercise.area_id}</TableCell>
                <TableCell>{exercise.area_name}</TableCell>
                <TableCell>{exercise.statement_text}</TableCell>
                <TableCell>{exercise.topic}</TableCell>
                <TableCell>{exercise.subtasknumber}</TableCell>
                <TableCell>{exercise.maxtime}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(exercise)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(exercise)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={confirmationDialogOpen}
        onClose={handleConfirmationDialogClose}
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {actionType} this exercise?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationDialogClose}>Cancel</Button>
          <Button onClick={handleConfirmation} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openFormDialog} onClose={handleFormDialogClose}>
        <DialogTitle>
          {actionType === "add" ? "Add Exercise" : "Edit Exercise"}
        </DialogTitle>
        <DialogContent>
          <FormControl
            required
            fullWidth
            variant="outlined"
            style={{ marginBottom: "20px", marginTop: "5px" }}
          >
            <InputLabel id="area-dialog">Area</InputLabel>
            <Select
              labelId="area-dialog"
              value={selectedArea}
              onChange={handleSelectedArea}
              label="Select Area"
            >
              {areamames.map((item) => (
                <MenuItem key={item.area_id} value={item.area_id}>
                  {item.area_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedArea && (
            <TextField
              fullWidth
              required
              variant="outlined"
              label="Statement ID - Unique identifier for an exercise with type integer"
              name="statement_id"
              value={formValues.statement_id}
              onChange={handleFormInputChange}
              style={{ marginBottom: "10px", marginTop: "5px" }}
            />
          )}
          {/*   <TextField
            fullWidth
            variant="outlined"
            label="Area ID - Assignment which the exercise belongs to"
            name="area_id"
            value={formValues.area_id}
            onChange={handleFormInputChange}
            style={{ marginBottom: "10px" }}
          /> */}

          <TextField
            fullWidth
            required
            variant="outlined"
            multiline
            rows={4}
            label="Statement Text - Detailed description of an exercise"
            name="statement_text"
            value={formValues.statement_text}
            onChange={handleFormInputChange}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Topic - e.g. 'Use case: Equi Join'"
            name="topic"
            value={formValues.topic}
            onChange={handleFormInputChange}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            required
            variant="outlined"
            label="Subtask - e.g. '1.1 Find all departments'"
            name="subtasknumber"
            value={formValues.subtasknumber}
            onChange={handleFormInputChange}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Max Time - e.g. '1,5h'"
            name="maxtime"
            value={formValues.maxtime}
            onChange={handleFormInputChange}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            label="Hint"
            name="hint"
            value={formValues.hint}
            onChange={handleFormInputChange}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            label="Solution - should be an executable query or a comment starting with '/*' and ending with '*/'"
            name="solution_query"
            value={formValues.solution_query}
            onChange={handleFormInputChange}
            style={{ marginBottom: "10px" }}
          />
        </DialogContent>
        <DialogActions>
          <Alert severity="warning">
            Attention! When you edit an existing StatementID within an Area, the
            current Exercise in that Area will be overwritten.
          </Alert>
          <Button onClick={handleFormDialogClose}>Cancel</Button>
          <Button onClick={handleConfirmation} color="primary">
            {actionType === "add" ? "Add" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageExercises;
