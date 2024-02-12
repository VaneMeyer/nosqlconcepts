import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import InsightsIcon from '@mui/icons-material/Insights';


const QueryHistoryChart = ({ isUser }) => {
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
      data.forEach(item => {
        // Erzeuge ein Date-Objekt aus dem String
        const dateObj = new Date(item.x);
    
        // Extrahiere das Datum ohne die Uhrzeit
        //const dateStr = dateObj.toISOString().split('T')[0];
    
        // Füge einen Tag zum Datum hinzu
        dateObj.setDate(dateObj.getDate() + 1);
        const newDateStr = dateObj.toISOString().split('T')[0];
    
        // Aktualisiere den Wert von "x" im Datenpunkt
        item.x = newDateStr;
    });
      const lineChartDataArray = data;
      const transfomedData = [
        { id: "queryHistory", data: lineChartDataArray.reverse() },
      ];
      setData(transfomedData);
      localStorage.setItem("queryHistoryData", JSON.stringify(transfomedData));
      //console.log(transfomedData);
    } catch (error) {
      console.error("Error with receiving data:", error);
      getStoredData();
    }
  };
  useEffect(() => {
    fetchData();
    /* const data = [
            {
                id: "query history",
                
                "data": [
                    {
                        "x": "2024-01-02T23:00:00.000Z",
                        "y": "5"
                    },
                    {
                        "x": "2024-01-03T23:00:00.000Z",
                        "y": "6"
                    },
                    {
                        "x": "2024-01-04T23:00:00.000Z",
                        "y": "2"
                    },
                ]
            }
        ]; */

    /* const data = [
      {
        id: "japan",

        data: [
          {
            x: "plane",
            y: 101,
          },
          {
            x: "helicopter",
            y: 75,
          },
          {
            x: "boat",
            y: 36,
          },
          {
            x: "train",
            y: 216,
          },
          {
            x: "subway",
            y: 35,
          },
          {
            x: "bus",
            y: 236,
          },
          {
            x: "car",
            y: 88,
          },
          {
            x: "moto",
            y: 232,
          },
          {
            x: "bicycle",
            y: 281,
          },
          {
            x: "horse",
            y: 1,
          },
          {
            x: "skateboard",
            y: 35,
          },
          {
            x: "others",
            y: 14,
          },
        ],
      },
    ]; */
    /*  setData(data);  */
  }, []);

  const handleChange = (event) => {
    setLimit((limit) => event.target.value);
  };

  const handleClick = () => {
    fetchData();
  };

  return (
    <Box /* display="flex" justifyContent="space-between" */>
      <Box
        sx={{ marginTop: "30px", marginBottom: 0, minWidth: 200, padding:0}}
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
          colors={[colors.blueAccent[600], colors.greenAccent[400], colors.blueAccent[700], colors.greenAccent[700], colors.primary[900]]}
          /* colors={{ scheme: "nivo" }} */
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
