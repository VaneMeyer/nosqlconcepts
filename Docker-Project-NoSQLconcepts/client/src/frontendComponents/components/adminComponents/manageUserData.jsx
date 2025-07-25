import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Box,
  Select,
  MenuItem,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { fetchUserData, fetchAreaNames } from "../../api/mainApi";
import { Grid } from "@mui/material";
import {
  deleteAllUserData,
  deleteUserData,
  fetchUserNames,
  fetchUserTaskData,
  fetchHistoryData,
} from "../../api/adminApi";

import DownloadIcon from "@mui/icons-material/Download";

const Item = styled(Paper)(({ theme }) => ({
  backgroundCoor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  overflow: "auto",
}));
function ManageUserData() {
  const [userData, setUserData] = useState(null);
  const [allUserTaskData, setAllUserTaskData] = useState(null);
  const [allHistoryData, setAllHistoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [databaseOptions, setDatabaseOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [username, setUsername] = useState("");
  const [userArray, setUserArray] = useState([]);
  const [actionType, setActionType] = useState("");
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserNames();

        setUserArray(data);
        const names = await fetchAreaNames();
        setDatabaseOptions(names);
        const alluserdata = await fetchUserTaskData();
        setAllUserTaskData(alluserdata);
        const allhistorydata = await fetchHistoryData();
        setAllHistoryData(allhistorydata);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const handleOptionChange = async (event) => {
    setSelectedOption(event.target.value);

    setUserData(null);
  };
  const handleUserOptionChange = async (event) => {
    setUsername(event.target.value);

    setUserData(null);
  };

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await fetchUserData(username, selectedOption);

      //console.log(response);
      if (!response) {
        window.alert("No data for this database.");
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response;

      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
  };

  const handleDelete = (userdata) => {
    setActionType("delete");
    setSelectedUserData(userdata);
    setConfirmationDialogOpen(true);
  };
  const handleDeleteAll = (username) => {
    setActionType("deleteAll");
    setSelectedUserData(username);
    setConfirmationDialogOpen(true);
  };
  const handleConfirmation = async () => {
    try {
      if (actionType === "delete") {
        await deleteUserData(selectedUserData);
      } else if (actionType === "deleteAll") {
        await deleteAllUserData(username);
      }
      handleClick();
    } catch (error) {
      console.error("Error:", error);
      if (actionType === "delete") {
        alert("Failed to delete user data. ");
      } else if (actionType === "deleteAll") {
        alert("Failed to delete user data. ");
      }
    }
    setConfirmationDialogOpen(false);
    /* setOpenFormDialog(false); */
  };

  const convertToCSV = (objArray) => {
    const array = [Object.keys(objArray[0])].concat(objArray);

    return array.map(row => {
        return Object.values(row).toString();
    }).join('\n');
};

  const handleDownloadUserData = () => {
    
    const csv = convertToCSV(allUserTaskData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute('download', 'user_task_data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  };
  const handleDownloadHistoryData = () => {
    
    const csv = convertToCSV(allHistoryData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute('download', 'history_data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <Container>
   
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
         
          
          <Grid item xs={12} md={12}>
            <Item
              sx={{
                maxHeight: "500px",
                overflowY: "auto",
              }}
            >
              <Typography
                variant="h4"
                style={{ textAlign: "center", marginBottom: "20px" }}
              >
                View User Assignment Data
              </Typography>

              <Box style={{ maxWidth: "600px", width: "100%" }}>
                <Typography
                  htmlFor="dropdown"
                  variant="subtitle1"
                  component="label"
                  sx={{ marginBottom: "5px", display: "block" }}
                >
                  Select an area:
                </Typography>
                <Select
                  id="area"
                  value={selectedOption}
                  onChange={handleOptionChange}
                  style={{ width: "100%", padding: "8px" }}
                >
                  {databaseOptions.map((option) => (
                    <MenuItem key={option.area_id} value={option.area_id}>
                      {option.area_name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box style={{ maxWidth: "600px", width: "100%" }}>
                <Typography
                  htmlFor="dropdown"
                  variant="subtitle1"
                  component="label"
                  sx={{ marginBottom: "5px", display: "block" }}
                >
                  Select user:
                </Typography>

                <Select
                  id="user"
                  value={username}
                  onChange={handleUserOptionChange}
                  style={{ width: "100%", padding: "8px" }}
                >
                  {userArray.map((item) => (
                    <MenuItem key={item.username} value={item.username}>
                      {item.username}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              {username && selectedOption && (
                <Box>
                  <Button onClick={handleClick}>Get Data</Button>
                </Box>
              )}

              {userData && (
                <TableContainer component={Paper}>
                  <Table aria-label="My Data Table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Exercise Number</TableCell>
                        <TableCell>Query Text</TableCell>
                        <TableCell align="center">Executable</TableCell>
                        <TableCell align="center">Result Size</TableCell>
                        <TableCell align="center">Correct</TableCell>
                        <TableCell align="center">Partial Solution</TableCell>
                        <TableCell align="center">Difficulty Level</TableCell>
                        <TableCell align="center">Processing Time</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userData.map((row) => (
                        <TableRow key={row.data_id}>
                          <TableCell>{row.statement_id}</TableCell>
                          <TableCell>{row.query_text}</TableCell>
                          <TableCell align="center">
                            {row.is_executable}
                          </TableCell>
                          <TableCell align="center">
                            {row.result_size}
                          </TableCell>
                          <TableCell align="center">{row.is_correct}</TableCell>
                          <TableCell align="center">
                            {row.partial_solution}
                          </TableCell>
                          <TableCell align="center">
                            {row.difficulty_level}
                          </TableCell>
                          <TableCell align="center">
                            {(row.processing_time / 60).toFixed(0)} minutes
                          </TableCell>
                          <TableCell>
                            <IconButton
                              color="secondary"
                              onClick={() => handleDelete(row)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              {username && (
                <Box>
                  <hr></hr>
                  <Typography variant="h3">Delete User Data</Typography>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteAll(username)}
                  >
                    <DeleteIcon />
                    Delete ALL data of this user - All Areas and History
                  </IconButton>
                </Box>
              )}
            </Item>
            <Dialog
              open={confirmationDialogOpen}
              onClose={handleConfirmationDialogClose}
            >
              <DialogTitle>Confirmation</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to {actionType} this user data?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleConfirmationDialogClose}>Cancel</Button>
                <Button onClick={handleConfirmation} color="error">
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typography>
          Download all user_task_data as csv for further analysis
        </Typography>
        <Button onClick={handleDownloadUserData}>
          Download <DownloadIcon></DownloadIcon>
        </Button>
        <Typography>
          Download all history data as csv for further analysis
        </Typography>
        <Button onClick={handleDownloadHistoryData}>
          Download <DownloadIcon></DownloadIcon>
        </Button>
      </Box>
    </Container>
  );
}

export default ManageUserData;
