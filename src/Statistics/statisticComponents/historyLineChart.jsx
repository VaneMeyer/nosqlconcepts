import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import InsightsIcon from "@mui/icons-material/Insights";

const QueryHistoryChart = ({ isUser }) => {
  //################# Style Settings ######################################################
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // Styles for mui components
  let muiButtonStyle = {
    backgroundColor: colors.blueAccent[100],
    color: colors.grey[900],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
    margin: "10px",
  };
  //################# State Variables ######################################################
  const [data, setData] = useState([]); /* useState([{data:[]}]) */
  const [limit, setLimit] = useState(7);
  const [username, setUsername] = useState(
    localStorage.getItem("token").replace(/"/g, "")
  );
  let path = "";
  if (isUser === true) {
    path = "/api/get-history-data";
  } else {
    path = "";
  }
  //################# Functions ######################################################
  const getStoredData = () => {
    const storedData = localStorage.getItem("queryHistoryData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.post(path, { username, limit });
      const data = response.data;
      data.forEach((item) => {
        const dateObj = new Date(item.x);

        dateObj.setDate(dateObj.getDate() + 1);
        const newDateStr = dateObj.toISOString().split("T")[0];

        item.x = newDateStr;
      });
      const lineChartDataArray = data;
      const transfomedData = [
        { id: "queryHistory", data: lineChartDataArray.reverse() },
      ];
      setData(transfomedData);
      localStorage.setItem("queryHistoryData", JSON.stringify(transfomedData));
    } catch (error) {
      console.error("Error with receiving data:", error);
      getStoredData();
    }
  };
  //################# useEffect Function ######################################################
  useEffect(() => {
    fetchData();
  }, []);
  //################# handle Functions ######################################################
  const handleChange = (event) => {
    setLimit((limit) => event.target.value);
  };

  const handleClick = () => {
    fetchData();
  };
  //################# Frontend ######################################################
  return (
    <Box>
      <Box
        sx={{ marginTop: "30px", marginBottom: 0, minWidth: 200, padding: 0 }}
        display="flex"
        justifyContent="space-between"
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Show data of the last...
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={limit}
            label="choose how many days"
            onChange={handleChange}
          >
            <MenuItem value={7}>7 active days</MenuItem>
            <MenuItem value={14}>14 active days</MenuItem>
            <MenuItem value={21}>21 active days</MenuItem>
          </Select>
        </FormControl>
        <Button sx={muiButtonStyle} onClick={handleClick}>
          <InsightsIcon></InsightsIcon> Apply
        </Button>
      </Box>
      <div style={{ height: "270px", padding: 0 }}>
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 10,
            legend: "Date",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Query Execution Count",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          colors={[
            colors.blueAccent[600],
            colors.greenAccent[400],
            colors.blueAccent[700],
            colors.greenAccent[700],
            colors.primary[900],
          ]}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
        />
      </div>
    </Box>
  );
};

export default QueryHistoryChart;
