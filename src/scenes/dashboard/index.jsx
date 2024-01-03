//######### Testphase DBMS - PostgreSQL session ###########
import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import postgreSQLLogo from "../../images/logo-postgresql.png";
import CassandraLogo from "../../images/logo-cassandra.png";
import Neo4JLogo from "../../images/logo-neo4j.png";
import MongoDBLogo from "../../images/logo-mongodb.png";
import { Link } from "react-router-dom";

import Header from "../../components/Header";

import StatBox from "../../components/StatBox";
import ChristmasCountdown from "../../components/xmasCountdown";
import PieChart from "../../components/PieChart";
import ImportantMsg from "../../components/importantMsg";
import CountdownTimer from "../../components/countdownTimer";
import BarChart from "../../components/BarChart";
import SolvedTasksBar from "../../Statistics/statisticComponents/solvedTasksBar";
import TotalUsers from "../../Statistics/statisticComponents/userNumber";
import DifficultyRating from "../../Statistics/statisticComponents/difficultyRating";
import PageViews from "../../Statistics/statisticComponents/pageViews";
import AvgProcessingTimeChart from "../../Statistics/statisticComponents/avgProcessingTimeBar";
import QueryHistoryChart from "../../Statistics/statisticComponents/historyLineChart";

const Dashboard = () => {
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

  useEffect(() => {}, []);

  const [profile, setProfile] = useState("");
  const { name } = profile;
  //comment for DBMS Testphase
  /*  useEffect(() => {
    fetch("/api/getme")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        //console.log(result);
        setProfile(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); */

  return (
    <Box m="20px" p={7}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="DASHBOARD"
          //comment for DBMS Testphase
          /* subtitle={`Welcome to your dashboard, ${name}`} */
          subtitle={"Welcome to the DBMS practical course!"}
        />
      </Box>
      {/* <Box>
        <ImportantMsg
          message="
Important Notice! This tool is still in the development phase. Please save your inputs in a separate file as a precaution to prevent potential loss. Currently, inputs are not user-specific and are only stored in the browser. This means that if you switch to another browser or clear browser data, your entries in the task areas will be lost."
          type="error"
        />
      </Box> */}

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="PostgreSQL"
            /* progress="0.75"
            increase="75%" */
            link="/postgresql"
            logo={postgreSQLLogo}
            /* link="/pglogin" */
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Cassandra"
            /* progress="0.50"
            increase="50%" */
            logo={CassandraLogo}
            link="/cassandra"
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Neo4J"
            logo={Neo4JLogo}
            /* progress="0.30" increase="30%" */ link="/neo4j"
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="MongoDB"
            /* progress="0.80"
            increase="80%" */
            logo={MongoDBLogo}
            link="/mongodb"
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            /* alignItems="center" */
            overflow="auto"
          >
              <Box gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto">
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Your average processing time for each area
              </Typography>
              <Box height="250px" width="600px" mt="-20px">
              <AvgProcessingTimeChart isUser={true} />
                
              </Box>
            </Box> 
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Typography variant="h5" fontWeight="600">
                Number of executable and correct queries
              </Typography>
              <Box height="250px" width="600px" mt="-20px">
                {/* <PieChart /> */}
                <SolvedTasksBar isUser={true} />
              </Box>

            </Box>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Statistics Summary
          </Typography>
          <TotalUsers />
          <DifficultyRating />
          <Link to="/statistics">
            <Button sx={muiButtonStyle}>View more Statistics</Button>
          </Link>
        </Box>
        {/* ROW 3 */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            /* alignItems="center" */
            overflow="auto"
          >
              <Box gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto">
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Your Query Executions per Day
              </Typography>
              <Box height="350px" width="1000px" mt="-20px">
              <QueryHistoryChart isUser={true}/>
                
              </Box>
            </Box> 
           
          </Box>
        </Box>
        

        {/* ROW 4 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Material
          </Typography>
          {/* <PageViews /> */}
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Feedback
          </Typography>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Evaluation
          </Typography>
          <Typography variant="p" sx={{ padding: "30px 30px 0 30px" }}>
            Follow the link to help us improving this webapplication.
          </Typography>

          <Box p={7}>
            <Typography
              variant="p"
              sx={{ padding: "30px 30px 0 30px", fontSize: "20px" }}
            >
              <Link
                to="https://survey.studiumdigitale.uni-frankfurt.de/nosqlconcepts"
                target="_blank"
                rel="noopener noreferrer"
              >
                SoSci Survey Link
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
