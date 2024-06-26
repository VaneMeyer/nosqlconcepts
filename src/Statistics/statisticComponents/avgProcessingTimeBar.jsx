import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

const AvgProcessingTimeChart = ({ isUser }) => {
  //################# Style Settings ######################################################
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //################# State Variables ######################################################
  const [data, setData] = useState([]);
  const [username, setUsername] = useState(
    localStorage.getItem("token").replace(/"/g, "")
  );

  let path = "";
  if (isUser === true) {
    path = "/user-avg-processing-time";
  } else {
    path = "/avg-processing-time";
  }

  //################# Functions ######################################################
  const getStoredData = () => {
    const storedData = localStorage.getItem("avgProcessingTimeData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  };
  const transformData = () => {
    return data.map((item) => {
      const totalSeconds = item.avg_processing_time;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      return {
        ...item,
        avg_processing_time_formatted: `${hours
          .toString()
          .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`,
        avg_processing_time_minutes: minutes,
      };
    });
  };
  //################# useEffect Function ######################################################
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(path, { username });
        setData(response.data);
        localStorage.setItem(
          "avgProcessingTimeData",
          JSON.stringify(response.data)
        );
        //console.log(response.data);
      } catch (error) {
        console.error("Error with receiving data:", error);
        getStoredData();
      }
    };

    fetchData();
  }, []);
  //################# Frontend ######################################################
  return (
    <div style={{ height: "250px", width:"800px"}}>
      {data && <ResponsiveBar
        data={transformData()}
        keys={["avg_processing_time_minutes"]}
        indexBy="task_area_id"
        margin={{ top: 50, right: 200, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={[colors.custom01[400], colors.greenAccent[700]]}
        groupMode="grouped"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Database",
          legendPosition: "middle",
          legendOffset: 32,
          format: (value) => {
            switch (value) {
              case 1:
                return "PostgreSQL";
              case 2:
                return "Cassandra";
              case 3:
                return "Neo4J";
              case 4:
                return "MongoDB";
              case 5:
                return "Lab 1";
              case 6:
                return "Lab 2";
              default:
                return value;
            }
          },
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Average time for tasks in minutes",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemTextColor: "#000",
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
        tooltip={({ id, value }) => {
          const hours = Math.floor(value / 60);
          const minutes = value;
          return (
            <div
              style={{
                padding: "10px",
                background: "#f5f5f5",
                borderRadius: "5px",
              }}
            >
              <strong>{id}: </strong>
              {`${hours.toString().padStart(2, "0")}h:${minutes
                .toString()
                .padStart(2, "0")}min`}
            </div>
          );
        }}
      />}
    </div>
  );
};

export default AvgProcessingTimeChart;
