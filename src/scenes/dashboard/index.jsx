//######### Testphase DBMS - PostgreSQL session ###########
import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";


import Header from "../../components/Header";


import StatBox from "../../components/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="DASHBOARD"
          //comment for DBMS Testphase
          /* subtitle={`Welcome to your dashboard, ${name}`} */
          subtitle={"Welcome to the DBMS practical course! Please make sure that you are connected to the DB with your given username and password. If you are not connected yet, click on SIGN IN in the top right. After connecting you should be redirected to this page. You can then START your tasks. Feel free to ask your tutors for help. Have fun!"}
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
            link="/mongodb"
          />
        </Box>

        {/* ROW 2 */}
        {/* <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Your learning progress
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[100]} //500
              >
                Current Level: 11
              </Typography>
            </Box>
           
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
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
            Bar chart - placeholder
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
 */}
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
