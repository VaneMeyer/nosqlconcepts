import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Tooltip,
  IconButton,
  Alert,
  Button,
  CardActions,
} from "@mui/material";
import neo4jImage from "../../images/neo4j3.png";
import mongodbImage from "../../images/mongodb3.png";
import postgresImage from "../../images/postgres3.png";
import cassandraImage from "../../images/cassandra3.png";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  addAssignment,
  deleteAssignment,
  fetchAssignments,
  updateAssignment,
} from "../../api/adminApi";
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
import { checkAuth } from "../../api/loginApi";
import CircularProgressC from "./circularProgressC";
export default function CardContainer() {
  const navigate = useNavigate();
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
    feedback_on: false,
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
      feedback_on: false,
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
      feedback_on: false,
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
    <Box
      sx={{
        flexGrow: 1,
        p: 4,
        /* backgroundColor: '#f5f7fa', */ minHeight: "45vh",
      }}
    >
      <Grid container spacing={4}>
        {assignments.map((assignment, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 6,
                },
                opacity: assignment.is_active ? 1 : 0.5,
                pointerEvents: assignment.is_active ? "auto" : "none",
              }}
            >
              <CardActionArea
                component={Link}
                to={assignment.link}
                aria-label={`Open ${assignment.area_name}`}
              >
                <Box
                  sx={{
                    height: 150,
                    backgroundImage: `url(${
                      assignment.endpoint === "PostgreSQL"
                        ? postgresImage
                        : assignment.endpoint === "Cassandra"
                        ? cassandraImage
                        : assignment.endpoint === "Neo4J"
                        ? neo4jImage
                        : assignment.endpoint === "MongoDB"
                        ? mongodbImage
                        : "no image"
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-end",
                    borderRadius: 4,
                    overflow: "hidden",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(234, 229, 229, 0.6), rgba(239, 228, 228, 0))",
                      zIndex: 1,
                    },
                  }}
                >
                  {/* Edit/Delete Buttons */}
                  {isAdmin && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        zIndex: 10,
                        display: "flex",
                        gap: 1,
                        pointerEvents: "auto",
                      }}
                    >
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          sx={{
                            color: "white",
                            backgroundColor: "rgba(95, 93, 93, 0.4)",
                            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleEdit(assignment);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          sx={{
                            color: "white",
                            backgroundColor: "rgba(95, 93, 93, 0.4)",
                            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDelete(assignment);
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}

                  {/* Circular Progress Overlay */}
                  <CardActions>
                    <CircularProgressC areaId={assignment.area_id} />
                  </CardActions>

                  <CardContent
                    sx={{
                      position: "relative",
                      zIndex: 10,
                      color: "black",
                      width: "100%",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {assignment.area_name}
                    </Typography>
                    <Typography>{assignment.descr}</Typography>
                  </CardContent>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        {isAdmin && (
          <Box p={2}>
            <IconButton aria-label="add new card" onClick={handleAdd}>
              <AddIcon />
            </IconButton>
          </Box>

          /*  </Card> */
        )}
      </Grid>
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
    </Box>
  );
}
