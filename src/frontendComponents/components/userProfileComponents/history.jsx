// student project DBMS course WS 23/24
//adjusted version
import React, { useState, useEffect } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import { fetchAreaNames, fetchHistoryData } from "../../api/mainApi";
import { useAuth } from '../../App';

const HistoryTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <Typography>No history data available.</Typography>;
  }

  const copyToClipboard = (query) => {
    navigator.clipboard.writeText(query);
  };

  return (
    <Box sx={{ overflowX: "auto", marginTop: 2 }}>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Time
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Query
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {new Date(item.executed_at).toLocaleString()}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{item.query_text}</span>
                <Tooltip title="Copy Query">
                  <IconButton
                    onClick={() => copyToClipboard(item.query_text)}
                    size="small"
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

const History = () => {
  const { username } = useAuth();
  const [selectedOption, setSelectedOption] = useState("");

  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [databaseOptions, setDatabaseOptions] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const names = await fetchAreaNames();
        setDatabaseOptions(names);
      } catch (error) {
        console.error("Error fetching database names:", error);
      }
    };
   

    fetchData();
  }, []);

  const handleOptionChange = async (event) => {
    setSelectedOption(event.target.value);

    // Clear existing history data when a new option is selected
    setHistoryData(null);

   
   

    try {
      setLoading(true);
      const response = await fetchHistoryData(username, event.target.value);

      console.log(response);
      if (!response) {
        window.alert("No queries have yet been made for this database.");
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response;
      // Sort data by time
      data = data.sort(
        (a, b) => new Date(b.executed_at) - new Date(a.executed_at)
      );

      if (data.length === 0) {
        // Handle case where no history data is returned
        window.alert("No history data available for the selected database.");
        return;
      }
      setHistoryData(data.slice(0, 50));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      
      <Box
        sx={{
          fontFamily: "Arial, sans-serif",
          margin: "auto",
          padding: "20px",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh", // ensures that the container fills the entire screen
        }}
      >
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
        <Box sx={{ fontSize: "26px", width: "100%", marginTop: "20px" }}>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            historyData && <HistoryTable data={historyData} />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default History;
