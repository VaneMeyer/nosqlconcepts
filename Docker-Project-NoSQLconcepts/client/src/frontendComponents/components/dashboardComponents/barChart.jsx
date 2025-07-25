import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import DownloadIcon from "@mui/icons-material/Download";
import {
  fetchUserTaskChartData,
  fetchUserTimeChartData,
  fetchTaskChartData,
  fetchTimeChartData,
} from "../../api/chartsApi";
import { fetchAreaNames } from "../../api/mainApi";
//import { checkAuth } from "../api/loginApi";
import { useAuth } from "../../App";
import {
  Box,
  Button,
  Card,
  CardContent,
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

  const exportToCSV = () => {
    const csvRows = [];

    // Add headers
    if (isTimeChart) {
      csvRows.push("Area Name,Avg Value (minutes)");
    } else {
      csvRows.push("Area Name,Started Tasks,Executable Tasks,Correct Tasks");
    }

    // Add data
    chartData.forEach((item) => {
      const areaName = areaIdToName[item.task_area_id];
      if (isTimeChart) {
        csvRows.push(`${areaName},${item.avg_value}`);
      } else {
        csvRows.push(
          `${areaName},${item.started_tasks_count},${item.executable_tasks_count},${item.correct_tasks_count}`
        );
      }
    });

    // Create and download the CSV file
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "chart_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          color: "rgb(110, 200, 201)",
          label: "minutes",
        },
      ]
    : [
        {
          name: "Started Tasks Count",
          data: chartData.map((item) => item.started_tasks_count),
          color: "rgb(191, 129, 217)",
          label: "Started Tasks",
        },
        {
          name: "Executable Tasks Count",
          data: chartData.map((item) => item.executable_tasks_count),
          color: "rgb(220, 188, 129)",
          label: "Executable Tasks",
        },
        {
          name: "Correct Tasks Count",
          data: chartData.map((item) => item.correct_tasks_count),
          color: "rgb(128, 214, 191)",
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
