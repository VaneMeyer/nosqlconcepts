// student project DBMS course WS 23/24
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const HistoryTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No history data available.</p>;
  }

  const copyToClipboard = (query) => {
    navigator.clipboard.writeText(query);
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{ borderCollapse: "collapse", width: "100%", marginTop: "20px" }}
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
    </div>
  );
};

const History = () => {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("");
  const [username, setUsername] = useState("");
  const [historyData, setHistoryData] = useState(null);

  const handleOptionChange = async (event) => {
    setSelectedOption(event.target.value);

    // Clear existing history data when a new option is selected
    setHistoryData(null);

    // Change here the username to the one that is logged in
    let username = localStorage.getItem("token").replace(/["']/g, "");

    try {
      const response = await fetch("/gethistory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, databasetype: event.target.value }),
      });

      if (!response.ok) {
        window.alert("No queries have yet been made for this database.");
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();
      // Sort data by time

      data = data.sort(
        (a, b) => new Date(b.executed_at) - new Date(a.executed_at)
      );

      if (data.length === 0) {
        // Handle case where no history data is returned
        window.alert("No history data available for the selected database.");
        return;
      }
      setHistoryData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div
      style={{
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
      <div style={{ maxWidth: "600px", width: "100%" }}>
        <label
          htmlFor="dropdown"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Select a database type:
        </label>
        <select
          id="dropdown"
          value={selectedOption}
          onChange={handleOptionChange}
          style={{ width: "100%", padding: "8px" }}
        >
          <option value="">Choose an option</option>
          <option value="PostgreSQL">PostgreSQL</option>
          <option value="Cassandra">Cassandra</option>
          <option value="Neo4J">Neo4J</option>
          <option value="MongoDB">MongoDB</option>
        </select>
      </div>
      <div style={{ fontSize: "26px", width: "100%", marginTop: "20px" }}>
        {historyData && <HistoryTable data={historyData} />}
      </div>
    </div>
  );
};

export default History;
