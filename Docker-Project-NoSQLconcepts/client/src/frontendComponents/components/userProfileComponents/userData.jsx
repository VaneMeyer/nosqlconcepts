import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { fetchUserData, fetchAreaNames } from "../../api/mainApi";
import { useAuth } from "../../App";

const UserData = () => {
  const { username } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [databaseOptions, setDatabaseOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
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
  }, []);

  const handleOptionChange = async (event) => {
    setSelectedOption(event.target.value);

    // Clear existing history data when a new option is selected
    setUserData(null);

    try {
      setLoading(true);
      const response = await fetchUserData(username, event.target.value);

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
          id="dropdown"
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
      {userData && (
        <TableContainer component={Paper}>
          <Table aria-label="My Data Table">
            <TableHead>
              <TableRow>
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
                  <TableCell>{row.query_text}</TableCell>
                  <TableCell align="center">{row.is_executable}</TableCell>
                  <TableCell align="center">{row.result_size}</TableCell>
                  <TableCell align="center">{row.is_correct}</TableCell>
                  <TableCell align="center">{row.partial_solution}</TableCell>
                  <TableCell align="center">{row.difficulty_level}</TableCell>
                  <TableCell align="center">
                    {(row.processing_time / 60).toFixed(0)} minutes
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default UserData;
