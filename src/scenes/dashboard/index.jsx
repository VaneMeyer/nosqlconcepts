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

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
          subtitle={
            "Welcome to the DBMS practical course! Please make sure that you are connected to the DB with your given username and password. If you are not connected yet, click on SIGN IN in the top right. After connecting you should be redirected to this page. You can then START your tasks. Feel free to ask your tutors for help. Have fun!"
          }
        />
      </Box>

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
            <Box width="400px">
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Statistics (Implementation In Progress...)
              </Typography>
              <Box pt={2}>
                <ChristmasCountdown />
              </Box>
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Typography variant="h5" fontWeight="600">
                Self-Determinded Correctness of Cypher Queries
              </Typography>
              <Box height="250px" width="600px" mt="-20px">
                <PieChart />
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
            Usability Survey
          </Typography>
          <Typography variant="p" sx={{ padding: "30px 30px 0 30px" }}>
            Follow the link and fill the survey to help us improving this
            webapplication.
          </Typography>


          <Box p={7}>
            <Typography variant="p" sx={{ padding: "30px 30px 0 30px", fontSize: '20px' }}>
              <Link to="https://survey.studiumdigitale.uni-frankfurt.de/nosqlconcepts">Link to Usability Survey</Link>
          
            </Typography>
          </Box>
        </Box>

        {/* ROW 3 */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Material
          </Typography>
          
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
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
