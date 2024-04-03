import React, {useState, useEffect} from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { tokens } from '../theme';
import { useTheme } from '@mui/material';
import axios from "axios";


const BarChart = () => {
  //################# Style Settings ######################################################
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //################# State Variables ######################################################

  const [data, setData] = useState([]);
  const [username, setUsername] = useState(localStorage.getItem("token").replace(/"/g, ''));

  //################# useEffect Function ######################################################
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

//################# Frontend ######################################################
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
