import React, { useState, useEffect } from "react";
import neo4jImage from "../images/neo4j.png";
import mongodbImage from "../images/mongodb.png"
import postgresImage from "../images/postgres.png"
import cassandraImage from "../images/cassandra.png"
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import GaugeChartC from "./gaugeChart";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Alert from "@mui/material/Alert";
import {
  addAssignment,
  deleteAssignment,
  fetchAssignments,
  updateAssignment,
} from "../api/adminApi";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { checkAuth } from "../api/auth";
//to be implemented
export default function MediaCard() {
  const [assignments, setAssignments] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [maxId, setMaxId] = useState(0);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [formValues, setFormValues] = useState({
    area_id: maxId || 0,
    area_name: "",

    descr: "",
    link: "",
    endpoint: "",
    is_active: false,
    feedback_on:false,
  });
  const [openFormDialog, setOpenFormDialog] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const authData = await checkAuth();
      setIsAuthenticated(authData !== null);
      if (authData) {
        setIsAdmin(authData.role === "admin");
      }
    };

    verifyAuth();

    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      const response = await fetchAssignments();
      setAssignments(response);
      console.log(response);
      if (response.length > 0) {
        let idArray = response.map((item) => item.area_id);
        let maxId = Math.max(...idArray) + 1;

        setMaxId(maxId);
      } else setMaxId(1);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleAdd = () => {
    setActionType("add");
    setFormValues({
      area_id: maxId || 0,
      area_name: "",

      descr: "",
      link: "",
      endpoint: "",
      is_active: false,
      feedback_on:false,
    });
    setOpenFormDialog(true);
  };

  const handleEdit = (assignment) => {
    setActionType("edit");
    setSelectedAssignment(assignment);
    setFormValues({ ...assignment });
    setOpenFormDialog(true);
  };

  const handleDelete = (assignment) => {
    setActionType("delete");
    setSelectedAssignment(assignment);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
  };
  const handleFormDialogClose = () => {
    setOpenFormDialog(false);
    setFormValues({
      area_id: maxId || 0,
      area_name: "",

      descr: "",
      link: "",
      endpoint: "",
      is_active: false,
      feedback_on:false,
    });
  };
  const handleConfirmation = async () => {
    try {
      if (actionType === "delete") {
        await deleteAssignment(selectedAssignment.area_id);
      } else if (actionType === "add") {
        if (
          formValues.area_id &&
          formValues.area_name &&
          formValues.link &&
          formValues.endpoint 
        ) {
          await addAssignment(formValues);
          window.location.reload();
        } else {
          alert("Please fill all required fields!");
        }
      } else if (actionType === "edit") {
        if (
          formValues.area_id &&
          formValues.area_name &&
          formValues.link &&
          formValues.endpoint
        ) {
          await updateAssignment(formValues);
          window.location.reload();
        } else {
          alert("Please fill all required fields!");
        }
      }

      loadAssignments();
    } catch (error) {
      console.error("Error:", error);
      if (actionType === "add") {
        alert(
          "Failed to add card. Check if Area ID already exist. Also make sure to fill all fields in the dialog form."
        );
      }
      if (actionType === "delete") {
        alert(
          "Failed to delete exercise. There is user/exercise data for this assignment."
        );
      }
      if (actionType === "edit") {
        alert(
          "Failed to edit exercise. Try another area_id and make sure to fill all input fields in the dialog form."
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

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      {assignments.map((assignment) => (
        <Card sx={{ width: 345 }}>
          {assignment.endpoint === "Neo4J" && (
            <CardMedia
              sx={{ height: 150 }}
              image={neo4jImage}
              title="Image with a little sketch to represent the database of this assignment"
            />
          )}
          {assignment.endpoint === "MongoDB" && (
            <CardMedia
              sx={{ height: 150 }}
              image={mongodbImage}
              title="Image with a little sketch to represent the database of this assignment"
            />
          )}
          {assignment.endpoint === "PostgreSQL" && (
            <CardMedia
              sx={{ height: 150 }}
              image={postgresImage}
              title="Image with a little sketch to represent the database of this assignment"
            />
          )}
          {assignment.endpoint === "Cassandra" && (
            <CardMedia
              sx={{ height: 150 }}
              image={cassandraImage}
              title="Image with a little sketch to represent the database of this assignment"
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {assignment.area_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {assignment.descr}
            </Typography>
          </CardContent>
          <CardActions sx={{ marginLeft: "50px" }}>
            <Button
              disabled={!assignment.is_active}
              component={Link}
              to={assignment.link}
              size="small"
            >
              Start assignment
            </Button>
            {/*  <Button disabled size="small">
              Learn More - not available yet
            </Button> */}
            <GaugeChartC areaId={assignment.area_id} />
          </CardActions>
          {isAdmin && (
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(assignment)}
            >
              <DeleteIcon />
            </IconButton>
          )}
          {isAdmin && (
            <IconButton
              aria-label="edit"
              onClick={() => handleEdit(assignment)}
            >
              <EditIcon />
            </IconButton>
          )}
          {/* {isAdmin && <SwitchC areaId={assignment.area_id} />} */}
        </Card>
      ))}
      {isAdmin && (
        <Card sx={{ width: 345 }}>
          {/*  <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-repile.jpg"
        title="green iguana"
      /> */}

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Add
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Add a new assignment card
            </Typography>
          </CardContent>
          <IconButton aria-label="add new card" onClick={handleAdd}>
            <AddIcon />
          </IconButton>
        </Card>
      )}
      {isAdmin && (
        <Dialog
          open={confirmationDialogOpen}
          onClose={handleConfirmationDialogClose}
        >
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to {actionType} this assignment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmationDialogClose}>Cancel</Button>
            <Button onClick={handleConfirmation} color="error">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {isAdmin && (
        <Dialog open={openFormDialog} onClose={handleFormDialogClose}>
          <DialogTitle>
            {actionType === "add" ? "Add Assignment" : "Edit Assignment"}
          </DialogTitle>
          <DialogContent>
            <TextField
              required
              fullWidth
              variant="outlined"
              label="Area_Id - Unique identifier for an area with type integer"
              name="area_id"
              value={formValues.area_id}
              onChange={handleFormInputChange}
              style={{ marginBottom: "10px", marginTop: "5px" }}
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              label="Area_Name"
              name="area_name"
              value={formValues.area_name}
              onChange={handleFormInputChange}
              style={{ marginBottom: "10px" }}
            />

            <TextField
              fullWidth
              variant="outlined"
              label="Short Description - optional"
              name="descr"
              value={formValues.descr}
              onChange={handleFormInputChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              label="Name for Exercise Sheet URL - e.g. 'new-area-name'"
              name="link"
              value={formValues.link}
              onChange={handleFormInputChange}
              style={{ marginBottom: "10px" }}
            />

            <FormControl
              fullWidth
              required
              variant="outlined"
              style={{ marginBottom: "10px" }}
            >
              <InputLabel id="database-endpoint-label">
                Database Endpoint
              </InputLabel>
              <Select
                labelId="database-endpoint-label"
                id="database-endpoint"
                name="endpoint"
                value={formValues.endpoint}
                onChange={handleFormInputChange}
                label="Database Endpoint"
              >
                <MenuItem value="PostgreSQL">PostgreSQL</MenuItem>
                <MenuItem value="Cassandra">Cassandra</MenuItem>
                <MenuItem value="Neo4J">Neo4J</MenuItem>
                <MenuItem value="MongoDB">MongoDB</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              fullWidth
              variant="outlined"
              required
              style={{ marginBottom: "10px" }}
            >
              <InputLabel id="database-active-label">Activate area?</InputLabel>
              <Select
                labelId="database-active-label"
                id="database-active"
                name="is_active"
                value={formValues.is_active}
                onChange={handleFormInputChange}
                label="Activate area"
              >
                <MenuItem value={true}>Yes, activate</MenuItem>
                <MenuItem value={false}>No, deactivate</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              variant="outlined"
              required
              style={{ marginBottom: "10px" }}
            >
              <InputLabel id="feedback-label">Query feedback on?</InputLabel>
              <Select
                labelId="feedback-label"
                id="feedback-on"
                name="feedback_on"
                value={formValues.feedback_on}
                onChange={handleFormInputChange}
                label="Query feedback on?"
              >
                <MenuItem value={true}>Yes, activate</MenuItem>
                <MenuItem value={false}>No, deactivate</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Alert severity="warning">
              Attention! When you edit an existing Area ID, the current Area
              settings with that ID will be overwritten.
            </Alert>
            <Button onClick={handleFormDialogClose}>Cancel</Button>
            <Button onClick={handleConfirmation} color="primary">
              {actionType === "add" ? "Add" : "Save"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Stack>
  );
}
