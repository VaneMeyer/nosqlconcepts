import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  fetchUserTaskChartData,
  fetchUserTimeChartData,
  fetchTaskChartData,
  fetchTimeChartData,
} from "../../api/chartsApi";
import { fetchAreaNames } from "../../api/mainApi";
import { useAuth } from "../../App";
import {
  Box,
  Card,
  CircularProgress,
} from "@mui/material";

export default function BarChartC({ isUser, isTimeChart }) {
  const { username } = useAuth();
  const [chartData, setChartData] = useState([]);
  const [xAxisData, setXAxisData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (isUser && isTimeChart) {
          const rawData = await fetchUserTimeChartData(username);
          data = transformUserTimeChartData(rawData);
        } else if (!isUser && isTimeChart) {
          const rawData = await fetchTimeChartData();
          data = transformTimeChartData(rawData);
        } else if (isUser && !isTimeChart) {
          const rawData = await fetchUserTaskChartData(username);
          data = transformUserTaskChartData(rawData);
        } else if (!isUser && !isTimeChart) {
          const rawData = await fetchTaskChartData();
          data = transformTaskChartData(rawData);
        }

        setChartData(data);
        const names = await fetchAreaNames();
        setXAxisData(names);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isUser, isTimeChart, username]);

  const transformUserTimeChartData = (data) => {
    return data.map((item) => ({
      task_area_id: item.task_area_id,
      avg_value: parseInt(item.avg_processing_time / 60),
    }));
  };

  const transformTimeChartData = (data) => {
    return data.map((item) => ({
      task_area_id: item.task_area_id,
      avg_value: parseInt(item.avg_processing_time / 60),
    }));
  };

  const transformUserTaskChartData = (data) => {
    return data.map((item) => ({
      task_area_id: item.task_area_id,
      started_tasks_count: parseInt(item.started_tasks_count),
      executable_tasks_count: parseInt(item.executable_tasks_count),
      correct_tasks_count: parseInt(item.correct_tasks_count),
    }));
  };

  const transformTaskChartData = (data) => {
    return data.map((item) => ({
      task_area_id: item.task_area_id,
      started_tasks_count: parseInt(item.started_tasks_count),
      executable_tasks_count: parseInt(item.executable_tasks_count),
      correct_tasks_count: parseInt(item.correct_tasks_count),
    }));
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
  // Map area_id to area_name
  const areaIdToName = Object.fromEntries(
    xAxisData.map((area) => [area.area_id, area.area_name])
  );
  const xAxisNames = chartData.map((item) => areaIdToName[item.task_area_id]);

  const seriesData = isTimeChart
    ? [
        {
          data: chartData.map((item) => item.avg_value),
          name: "Avg Value",
          color: "rgba(52, 105, 184, 1)",
          label: "minutes",
        },
      ]
    : [
        {
          name: "Started Tasks Count",
          data: chartData.map((item) => item.started_tasks_count),
          color: "rgba(52, 105, 184, 1)",
          label: "Started Tasks",
        },
        {
          name: "Executable Tasks Count",
          data: chartData.map((item) => item.executable_tasks_count),
          color: "rgba(61, 62, 100, 1)",
          label: "Executable Tasks",
        },
        {
          name: "Correct Tasks Count",
          data: chartData.map((item) => item.correct_tasks_count),
          color: "rgba(79, 132, 118, 1)",
          label: "Correct Tasks",
        },
      ];

  return (
 
      <Card elevation={3} sx={{ borderRadius: 4, p: 2 }}>
        <BarChart
          xAxis={[{ scaleType: "band", data: xAxisNames }]}
          series={seriesData}
          width={500}
          height={300}
        />
      </Card>
   
  );
}
