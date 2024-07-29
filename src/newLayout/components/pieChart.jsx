import React, { useState, useEffect } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Grid, Typography } from '@mui/material';
import { fetchPieChartData } from "../api/chartsApi";
import { fetchAreaNames } from "../api/mainApi";

export default function PieChartC() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [areaNames, setAreaNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPieChartData();
        setChartData(response);

        const names = await fetchAreaNames();
        setAreaNames(names);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Funktion zum Gruppieren der Daten nach task_area_id
  const groupDataByTaskArea = (data) => {
    const groupedData = {};
    data.forEach((item) => {
      const { task_area_id, difficulty_level, avg_task_count } = item;
      if (!groupedData[task_area_id]) {
        groupedData[task_area_id] = [];
      }
      groupedData[task_area_id].push({ label: difficulty_level, value: parseFloat(avg_task_count) });
    });
    return groupedData;
  };

  // Gruppierte Daten erhalten
  const groupedChartData = groupDataByTaskArea(chartData);

  // Bereichsnamen mappen
  const areaIdToName = Object.fromEntries(
    areaNames.map((area) => [area.area_id, area.area_name])
  );

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2}>
        {Object.keys(groupedChartData).map((taskAreaId) => (
          <Grid item xs={12} md={6}  key={taskAreaId}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
               {areaIdToName[taskAreaId]}
            </Typography>
            <PieChart
              key={taskAreaId}
              series={[
                {
                  data: groupedChartData[taskAreaId],
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                },
              ]}
              height={200}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
