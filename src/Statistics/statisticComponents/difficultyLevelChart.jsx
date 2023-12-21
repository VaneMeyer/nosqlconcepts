import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";
import { Box, Typography, Paper, useTheme, Grid } from "@mui/material";

const DifficultyLevelChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/difficulty-level");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  

  const uniqueTaskAreas = [...new Set(data.map(item => item.task_area_id))];
  /* const pieCharts = uniqueTaskAreas.map(taskAreaId => {
    const filteredData = data.filter(item => item.task_area_id === taskAreaId); */

    return (
      <Grid container spacing={3}>
      {uniqueTaskAreas.map(taskAreaId => {
        const filteredData = data.filter(item => item.task_area_id === taskAreaId);

        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={taskAreaId}>
            <Paper style={{   margin:"0px",   padding: '20px',  height: '400px', width: '400px' }}>
              <Typography variant="h6" gutterBottom>
                Database: {
                  (() => {
                    switch (taskAreaId) {
                      case 1:
                        return "PostgreSQL";
                      case 2:
                        return "Cassandra";
                      case 3:
                        return "Neo4J";
                      case 4:
                        return "MongoDB";
                      default:
                        return taskAreaId;
                    }
                  })()
                }
              </Typography>
              <ResponsivePie
                data={filteredData}
                keys={["avg_task_count"]}
                id="difficulty_level"
                value="avg_task_count"
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ scheme: 'nivo' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                enableRadialLabels={true}
                radialLabelsSkipAngle={10}
                radialLabelsTextXOffset={6}
                radialLabelsTextColor="#333333"
                radialLabelsLinkOffset={0}
                radialLabelsLinkDiagonalLength={16}
                radialLabelsLinkHorizontalLength={24}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor={{ from: 'color' }}
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor="#333333"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
              />
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DifficultyLevelChart;
