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
} from "@mui/material";
import { fetchUserData, fetchAreaNames } from "../api/mainApi";
import { Grid } from "@mui/material";
import { fetchUserNames } from "../api/adminApi";
import AdminUserInterface from "../student_projects/project5_ss24/AdminUserInterface";

const Item = styled(Paper)(({ theme }) => ({
  backgroundCoor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  overflow: "auto",
}));
function ManageUsers() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [databaseOptions, setDatabaseOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [username, setUsername] = useState("");
  const [userArray, setUserArray] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const data = await fetchUserNames();

        setUserArray(data);
        const names = await fetchAreaNames();
        setDatabaseOptions(names);
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

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <Container>
      {/*  <h1>Manage Users</h1> */}
      <Typography
                variant="h4"
                style={{ textAlign: "center", marginBottom: "20px" }}
              >
              Admin User Management Interface
              </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Item>
              {" "}
              <AdminUserInterface />{" "}
            </Item>
          </Grid>
          {/*  <Grid item xs={12} md={6}>
            <Item>Add New User</Item>
          </Grid> */}
          <Grid item xs={12} md={6}>
            <Item>
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
                <Button onClick={handleClick}>Get Data</Button>
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
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default ManageUsers;
