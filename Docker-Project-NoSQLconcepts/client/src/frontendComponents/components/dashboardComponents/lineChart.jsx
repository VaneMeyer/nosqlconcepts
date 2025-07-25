import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Card, CircularProgress } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { fetchLineChartData } from "../../api/chartsApi";
import { format } from "date-fns";
import { useAuth } from "../../App";

export default function LineChartC() {
  const { username } = useAuth();
  const [limit, setLimit] = useState(7);
  const [loading, setLoading] = useState(true);
  const [xAxisData, setXAxisData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  

  const fetchData = async (username) => {
    try {
      const result = await fetchLineChartData(username, limit);
      if (result.length > 0) {
        const data = result[0].data;
        const dataDate = data.map((d) => new Date(d.x));
        const onlyDate = dataDate.map((date) =>
          date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        );
        

        const xAxis = data.map((d) => new Date(d.x));
        const series = data.map((d) => d.y);
        setXAxisData(xAxis);
        setSeriesData(series);
      }
    } catch (error) {
      console.error("Error fetching chart data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
   
      if (username) {
       
         fetchData(username);
      }
    };

    fetchUser();
   
  }, [username, limit]);

  const handleChange = (event) => {
    setLimit(event.target.value);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress aria-label="Loading data" />
      </Box>
    );
  }

  return (
    <Card elevation={3} sx={{ borderRadius: 4, p: 2 }}>
      <Box
        sx={{ marginTop: "30px", marginBottom: 0, minWidth: 200, padding: 0 }}
        display="flex"
        justifyContent="space-between"
        role="form"
        aria-labelledby="data-selection-form"
      >
        <FormControl fullWidth>
          <InputLabel id="data-select-label">Show number of queries</InputLabel>
          <Select
            labelId="data-select-label"
            id="data-select"
            value={limit}
            label="choose how many days"
            onChange={handleChange}
            aria-describedby="data-select-description"
          >
            <MenuItem value={7}>last 7 active days</MenuItem>
            <MenuItem value={14}>last 14 active days</MenuItem>
            <MenuItem value={21}>last 21 active days</MenuItem>
          </Select>
          <span id="data-select-description" style={{ display: "none" }}>
            Select the time span to show the number of executed queries during
            that time.
          </span>
        </FormControl>
      </Box>
      <Box role="region" aria-live="polite" aria-atomic="true">
        <LineChart
          xAxis={[
            {
              data: xAxisData,
              disableTicks: true,
              label: "Date",
              scaleType: 'time'
            },
          ]}
          series={[
            {
              data: seriesData,
              label: "Number of executed queries",
            },
          ]}
          width={500}
          height={300}
        />
      </Box>
    </Card>
  );
}
