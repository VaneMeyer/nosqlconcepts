import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import postgreSQLLogo from "../../images/logo-postgresql.png";
import CassandraLogo from "../../images/logo-cassandra.png";
import Neo4JLogo from "../../images/logo-neo4j.png";
import MongoDBLogo from "../../images/logo-mongodb.png";
import { Link } from "react-router-dom";
import DataObjectIcon from "@mui/icons-material/DataObject";
import SchemaIcon from "@mui/icons-material/Schema";
import TableRowsIcon from "@mui/icons-material/TableRows";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
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
import BarChartIcon from "@mui/icons-material/BarChart";
import Footer from "../global/footer";

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
    "&:hover": {
      color: colors.primary[500],
    },
  };

  useEffect(() => {
    if (role === "admin") {
      setIsAdmin(true);
    }
  }, []);

  const [profile, setProfile] = useState("");
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [isAdmin, setIsAdmin] = useState(false);
  const { name } = profile;

  return (
    <Box m="20px" p={7}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="DASHBOARD"
          subtitle={"Welcome to the DBMS practical course!"}
        />
        <ImportantMsg
          message="
Note: This tool is still in the development phase. Please make sure to have a backup of your solutions and inform us about unexpected behavior of the tool.  "
          type="info"
        />
        {isAdmin && <Link to="/admin"><Button>Admin</Button></Link>}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "repeat(12, 1fr)" }}
        gridAutoRows={{ xs: "auto", md: "140px" }}
        gap="20px"
        /*  display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px" */
      >
        {/* ROW 1 */}

        <Box
          gridColumn={{ xs: "span 20", md: "span 3" }}
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="PostgreSQL"
            link="/postgresql"
            logo={postgreSQLLogo}
            icon={<TableRowsIcon></TableRowsIcon>}
          />
        </Box>
        <Box
          /* gridColumn="span 3" */
          gridColumn={{ xs: "span 20", md: "span 3" }}
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Cassandra"
            logo={CassandraLogo}
            link="/cassandra"
            icon={<ViewColumnIcon></ViewColumnIcon>}
          />
        </Box>
        <Box
          /* gridColumn="span 3" */
          gridColumn={{ xs: "span 20", md: "span 3" }}
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Neo4J"
            logo={Neo4JLogo}
            icon={<SchemaIcon></SchemaIcon>}
            link="/neo4j"
          />
        </Box>
        <Box
          /* gridColumn="span 3" */
          gridColumn={{ xs: "span 20", md: "span 3" }}
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="MongoDB"
            logo={MongoDBLogo}
            link="/mongodb"
            icon={<DataObjectIcon></DataObjectIcon>}
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn={{ xs: "span 20", md: "span 8" }}
          gridRow={{ xs: "span 2", md: "span 2" }}
          /* gridColumn="span 8" */
          /* gridRow="span 2" */
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            /* alignItems="center" */
            overflow="auto"
          >
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
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
          /*  gridColumn="span 4"*/
          gridRow="span 2"
          gridColumn={{ xs: "span 20", md: "span 4" }}
          /* display="flex" */
          flexDirection={{ xs: "column", md: "row" }}
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Course Summary
          </Typography>
          <TotalUsers />
          <DifficultyRating />
          <Link to="/statistics">
            <Button sx={muiButtonStyle}>
              {" "}
              <BarChartIcon></BarChartIcon> View course Statistics
            </Button>
          </Link>
        </Box>
        {/* ROW 3 */}
        <Box
          gridColumn={{ xs: "span 20", md: "span 12" }}
          gridRow={{ xs: "span 3", md: "span 3" }}
          /* gridColumn="span 12"
          gridRow="span 3" */
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
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Your Query Executions per Day
              </Typography>
              <Box height="350px" width="1000px" mt="-20px">
                <QueryHistoryChart isUser={true} />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ROW 4 */}
        <Box
          gridColumn={{ xs: "span 20", md: "span 4" }}
          gridRow={{ xs: "span 2", md: "span 2" }}
          /*  gridColumn="span 4"
          gridRow="span 2"  */
          flexDirection={{ xs: "column", md: "row" }}
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Material
          </Typography>
          {/* <PageViews /> */}
        </Box>
        <Box
          /*  gridColumn="span 4"
          gridRow="span 2"  */
          gridColumn={{ xs: "span 20", md: "span 4" }}
          gridRow={{ xs: "span 2", md: "span 2" }}
          flexDirection={{ xs: "column", md: "row" }}
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
          /*   gridColumn="span 4"
          gridRow="span 2"  */
          gridColumn={{ xs: "span 20", md: "span 4" }}
          gridRow={{ xs: "span 2", md: "span 2" }}
          flexDirection={{ xs: "column", md: "row" }}
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
      <Footer />
    </Box>
  );
};

export default Dashboard;
