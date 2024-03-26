/* 
import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { tokens } from '../theme';
import { useTheme } from '@mui/material';
import { pgTasks, cassandraTasks, neo4jTasks, mongodbTasks } from '../data/tasksData';

const BarChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const databaseTasks = [
    { title: 'PostgreSQL', tasks: pgTasks },
    { title: 'Cassandra', tasks: cassandraTasks },
    { title: 'Neo4J', tasks: neo4jTasks },
    { title: 'MongoDB', tasks: mongodbTasks },
  ];

  const data = databaseTasks.map((database) => {
    const numCorrect = database.tasks.reduce((acc, task, i) => {
      const answer5 = localStorage.getItem(`${database.title.toLowerCase()}isCorrect${i + 1}`) || '0';
      return acc + (answer5 === 'Yes' ? 1 : 0);
    }, 0);

    const numExecutable = database.tasks.reduce((acc, task, i) => {
      const answer3 = localStorage.getItem(`${database.title.toLowerCase()}isExecutable${i + 1}`) || '0';
      return acc + (answer3 === 'Yes' ? 1 : 0);
    }, 0);

    return {
      database: database.title,
      correctQueries: numCorrect,
      executableQueries: numExecutable,
    };
  });

  return (
    <ResponsiveBar
      data={data}
      keys={['correctQueries', 'executableQueries']}
      indexBy="database"
      margin={{ top: 50, right: 60, bottom: 60, left: 80 }}
      padding={0.3}
      colors={[colors.blueAccent[400], colors.greenAccent[400]]}
      groupMode="grouped"
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemTextColor: colors.primary[700],
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: colors.primary[600],
              },
            },
          ],
        },
      ]}
    />
  );
};

export default BarChart;
 */

import React, {useState, useEffect} from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { tokens } from '../theme';
import { useTheme } from '@mui/material';
import { pgTasks, cassandraTasks, neo4jTasks, mongodbTasks } from '../data/tasks';
import axios from "axios";


const BarChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [username, setUsername] = useState(localStorage.getItem("token").replace(/"/g, ''));

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.post("/user-solved-tasks-count", {username});
        setData(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error("Error with receiving data:", error);
      }
    };

    fetchData();
  }, []);
/*   const databaseTasks = [
    { title: 'PostgreSQL', tasks: pgTasks },
    { title: 'Cassandra', tasks: cassandraTasks },
    { title: 'Neo4J', tasks: neo4jTasks },
    { title: 'MongoDB', tasks: mongodbTasks },
  ]; */

  /* const data = databaseTasks.map((database) => {
    const numCorrect = database.tasks.reduce((acc, task, i) => {
      const answer5 = localStorage.getItem(`${database.title.toLowerCase()}isCorrect${i + 1}`) || '0';
      return acc + (answer5 === 'Yes' ? 1 : 0);
    }, 0);

    const numExecutable = database.tasks.reduce((acc, task, i) => {
      const answer3 = localStorage.getItem(`${database.title.toLowerCase()}isExecutable${i + 1}`) || '0';
      return acc + (answer3 === 'Yes' ? 1 : 0);
    }, 0);

    return {
      database: database.title,
      correctQueries: numCorrect,
      executableQueries: numExecutable,
    };
  }); */

  return (
     <ResponsiveBar
      data={data}
      keys={['avg_solved_tasks_count', 'avg_correct_tasks_count', 'avg_executable_tasks_count']}
      indexBy="database"
      margin={{ top: 50, right: 60, bottom: 60, left: 80 }}
      padding={0.3}
      colors={[colors.blueAccent[400], colors.greenAccent[400]]}
      groupMode="grouped"
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
       // tickValues:0
      }}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'top-left',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemTextColor: colors.primary[700],
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: colors.primary[600],
              },
            },
          ],
        },
      ]}
    /> 
    
  );
};

export default BarChart;
