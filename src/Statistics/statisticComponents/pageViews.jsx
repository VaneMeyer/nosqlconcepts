//not in use
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ResponsiveLine } from "@nivo/line";

const PageViews = () => {
  //################# State Variables ######################################################
  const [pageViews, setPageViews] = useState(0);
  const [data, setData] = useState([]);
  //################# useEffect Function ######################################################
  useEffect(() => {
    fetchPageViews();
    fetchData();
  }, []);
  //################# Functions ######################################################
  const fetchPageViews = async () => {
    try {
      const response = await axios.get("/getViews");
      setPageViews(response.data.pageViews);
      console.log(response.data.pageViews);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/getViews");
      setData([
        {
          x: new Date().toLocaleTimeString(),
          y: response.data.pageViews,
        },
        ...data,
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //################# Frontend ######################################################
  return (
    <div>
      <p>Total Page Views: {pageViews}</p>
      <div style={{ height: "400px" }}>
        <ResponsiveLine
          data={[{ id: "views", data }]}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          curve="linear"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "time",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "views",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          colors={{ scheme: "nivo" }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
        />
      </div>
    </div>
  );
};

export default PageViews;
