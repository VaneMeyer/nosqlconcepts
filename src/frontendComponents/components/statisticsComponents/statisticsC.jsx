
//student project SS2024 

/*This file contains the frontend of the statistics dashboard extension 
ATTENTION: If this code is to be implemented in the main tool, please note the following: 
1. The getData Effects or setData function must be adapted. All 4 database tables are loaded completely as an array and then processed in the filter part. 
2. Replace the User Selection Bar with the Logged in User delete the header "taskleiste" */

import React, { useState, useEffect } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Alert,
} from "@mui/material";
import { fetchData, fetchTaskData, fetchUserData, fetchAreaData } from "../../api/statApi";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  generateDataSeries,
  generateDif_Series,
  get_dif_ranking,
  get_rank,
} from "./statisticsfunctions";
import { checkAuth } from "../../api/loginApi";

// Card style for hover effect
let cardStyle = {
  borderRadius: "12px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
  },
  padding: 1,
  textAlign: "center",
  overflow: "auto",
};

function StatisticsC() {
  //Defintions for the data, selection bars and theme

  /*In this part the 4 arrays for each of the postgresql database tables are initialized, 
  to insert them into the NoSQLConcepts main tool the correct set data function must be referenced here*/
  const [data, setData] = useState([]); // State for main data
  const [taskData, setTaskData] = useState([]); // State for task-related data
  const [userData, setUserData] = useState([]); // State for user-related data
  const [areaData, setAreaData] = useState([]); // State for area-related data

  const [selectedStatementId, setSelectedStatementId] = useState(""); // State for selected task ID
  const [selectedUserId, setSelectedUserId] = useState(""); // State for selected user ID
  const [selectedAreaId, setSelectedAreaId] = useState(""); // State for selected area ID
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [username, setUsername] = useState("");

  // Effect to set document title on component mount
  useEffect(() => {
    document.title = "NoSQLconcepts";
    const verifyAuth = async () => {
      const authData = await checkAuth();
      setIsAuthenticated(authData !== null);
      if (authData) {
        setIsAdmin(authData.role === "admin");
      }
    };

    verifyAuth();
    const fetchUser = async () => {
      const user = await checkAuth();
      if (user) {
        setUsername(user.username);
      }
    };

    fetchUser();
  }, []);

  /* To integrate into the main tool, either adapt these 4 functions so that they receive the correct data
   or delete the functions and describe them correctly in the setData definitions above */
  const getTaskData = async (area) => {
    try {
      const result = await fetchTaskData(area); // Fetching task-related data from API
      setTaskData(result); // Setting task data state
    } catch (error) {
      console.error("Error fetching task data:", error);
    }
  };
  const getData = async () => {
    try {
      const result = await fetchData(); // Fetching data
      setData(result); // Setting main data state
      console.log(
        result.filter(
          (item) =>
            item.statement_id === selectedStatementId &&
            item.task_area_id === selectedAreaId
        )
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const getUserData = async () => {
      try {
        const result = await fetchUserData(); // Fetching user-related data from API
        setUserData(result); // Setting user data state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    const getAreaData = async () => {
      try {
        const result = await fetchAreaData(); // Fetching area-related data from API
        setAreaData(result); // Setting area data state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData(); // Fetch user data
    getAreaData(); // Fetch area data
    //getTaskData(); // Fetch task data on initial render
    getData(); // Fetch main data on initial render
  }, []);

  // Event handler for selecting task
  const handleStatementIdChange = (event) => {
    setSelectedStatementId(event.target.value);
  };

  // Event handler for selecting user
  const handleUserIdChange = (event) => {
    setSelectedUserId(event.target.value);
  };

  // Event handler for selecting area
  const handleAreaIdChange = (event) => {
    setSelectedAreaId(event.target.value);
    getTaskData(event.target.value);
  };

  // CSV download function
  const downloadCSV = (data, filename) => {
    const csvContent =
      "data:text/csv;charset=utf-8," + data.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
  };

  const downloadTaskData = () => {
    const csvData = [
      ["Time ranges in minutes", "Frequency"],
      ["below 30min", timedata[0].data[0]],
      ["30-60min", timedata[0].data[1]],
      ["60-90min", timedata[0].data[2]],
      ["over 90min", timedata[0].data[3]],
    ];
    downloadCSV(csvData, "task_data.csv");
  };

  const downloadAreaData = () => {
    const csvData = [
      ["Time ranges in minutes", "Frequency"],
      ["below 30min", areatimedata[0].data[0]],
      ["30-60min", areatimedata[0].data[1]],
      ["60-90min", areatimedata[0].data[2]],
      ["over 90min", areatimedata[0].data[3]],
    ];
    downloadCSV(csvData, "area_data.csv");
  };
  // CSV download function for Task Difficulty Data
  const downloadTaskDifficultyData = () => {
    const csvData = [
      ["Difficulty Level", "Frequency"],
      ["Very Easy", difdata[0].data[0]],
      ["Easy", difdata[0].data[1]],
      ["Moderate", difdata[0].data[2]],
      ["Hard", difdata[0].data[3]],
      ["Very Hard", difdata[0].data[4]],
    ];
    downloadCSV(csvData, "task_difficulty_data.csv");
  };

  // CSV download function for Area Difficulty Data
  const downloadAreaDifficultyData = () => {
    const csvData = [
      ["Difficulty Level", "Frequency"],
      ["Very Easy", areadifdata[0].data[0]],
      ["Easy", areadifdata[0].data[1]],
      ["Moderate", areadifdata[0].data[2]],
      ["Hard", areadifdata[0].data[3]],
      ["Very Hard", areadifdata[0].data[4]],
    ];
    downloadCSV(csvData, "area_difficulty_data.csv");
  };

  /*In this part the filtered arrays are defined, all 4 Postgresql tables are available as arrays and are filtered here accordingly,
   e.g. to save only the time values in an array */

  // Filtered data based on selected task
  const filteredData = data.filter(
    (item) =>
      item.statement_id === selectedStatementId &&
      item.task_area_id === selectedAreaId
  ); //Filters by selected task (Statement ID)
  const processingTimes = filteredData.map((item) => item.processing_time / 60); //Filters the data of the selected task, so that only the time values remain
  const dif_data = filteredData.map((item) => item.difficulty_level); //Filters for dif values only
  const timedata = generateDataSeries(processingTimes); //Generate a times series of the filtered time data
  const difdata = generateDif_Series(dif_data).dataSeries; //This saves the data from all users grouped by difficulty e.g. very easy = 3, easy = 5....
  const avgdiffi = generateDif_Series(dif_data).resultavgdif; //This just saves the average dif e.g. 3.4
  const meanProcessingTime =
    filteredData.length > 0 //Gets mean processing time
      ? (
          filteredData.reduce(
            (acc, item) => acc + item.processing_time / 60,
            0
          ) / filteredData.length
        ).toFixed(0)
      : null;

  // Filtered data based on selected area
  const filteredAreaData = data.filter(
    (item) => item.task_area_id === selectedAreaId
  ); //Same as for the statement tasks but with the area filter now
  const processingAreaTimes = filteredAreaData.map(
    (item) => item.processing_time / 60
  );
  const area_dif_data = filteredAreaData.map((item) => item.difficulty_level);
  const areatimedata = generateDataSeries(processingAreaTimes);
  const areadifdata = generateDif_Series(area_dif_data).dataSeries;
  const areaavgdiffi = generateDif_Series(area_dif_data).resultavgdif;
  const AreameanProcessingTime =
    filteredAreaData.length > 0
      ? (
          filteredAreaData.reduce(
            (acc, item) => acc + item.processing_time / 60,
            0
          ) / filteredAreaData.length
        ).toFixed(0)
      : null;

  // Filtered data based on selected user
  const filteredUserData = data.filter(
    (item) => item.username === selectedUserId
  ); //Same as for the statement task but with user, area and statement filter now
  const filteredUserTaskData = filteredUserData.filter(
    (item) =>
      item.statement_id === selectedStatementId &&
      item.task_area_id === selectedAreaId
  );
  const UserTaskprocessingTimes = filteredUserTaskData.map((item) =>
    (item.processing_time / 60).toFixed(0)
  );
  const UserTaskdifdata = filteredUserTaskData.map(
    (item) => item.difficulty_level
  );
  const filteredUserAreaData = filteredUserData.filter(
    (item) => item.task_area_id === selectedAreaId
  );
  const UserAreadifdata = filteredUserAreaData.map(
    (item) => item.difficulty_level
  );
  const userareaavgdiffi = generateDif_Series(UserAreadifdata).resultavgdif;
  const AreameanProcessingTimeUser =
    filteredUserAreaData.length > 0
      ? (
          filteredUserAreaData.reduce(
            (acc, item) => acc + item.processing_time / 60,
            0
          ) / filteredUserAreaData.length
        ).toFixed(0)
      : null;

  return (
    <Grid container spacing={2} alignItems="center">
      {/* 1. Task selection section */}
      <Grid item xs={12} md={12}>
        <Typography>Choose Area and Task for detailed statistics:</Typography>{" "}
        <InputLabel id="area-label">Select Area</InputLabel>
        <Select
          labelId="area-label"
          id="area-select"
          value={selectedAreaId}
          onChange={handleAreaIdChange}
          style={{ width: "100%" }}
        >
          {areaData.map((item) => (
            <MenuItem key={item.area_id} value={item.area_id}>
              {item.area_name}
            </MenuItem>
          ))}
        </Select>
        <InputLabel id="statement-label">Select Task</InputLabel>
        <Select
          labelId="statement-label"
          id="statement-select"
          value={selectedStatementId}
          onChange={handleStatementIdChange}
          style={{ width: "100%" }}
        >
          {taskData.map((item) => (
            <MenuItem key={item.data_id} value={item.statement_id}>
              {item.subtasknumber}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      {filteredData.length > 0 && (
        <>
          <Grid item xs={12} md={6}>
            <Box
              height="100%"
              /*  backgroundColor={colors.primary[400]} */
              sx={cardStyle}
            >
              <Typography>Needed Time for Selected Task:</Typography>
              <Typography>
                Mean Processing Time by all users: {meanProcessingTime} Minutes
              </Typography>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: ["below 30min", "30-60min", "60-90min", "over 90min"],
                    label: "Time ranges in minutes",
                  },
                ]}
                yAxis={[
                  {
                    scaleType: "linear",
                    label: "frequency",
                  },
                ]}
                series={timedata}
                /* colors={[colors.custom01[400], colors.greenAccent[700]]} */
                width={500}
                height={300}
              />
              <Button
                onClick={downloadTaskData}
                
              >
                Download  CSV <DownloadIcon></DownloadIcon>
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              height="100%"
              /* backgroundColor={colors.primary[400]} */
              sx={cardStyle}
            >
              <Typography>Difficulty for Selected Task:</Typography>
              <Typography>
                Mean Difficulty Rating by all users: {avgdiffi}/5
              </Typography>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: [
                      "Very Easy",
                      "Easy",
                      "Medium",
                      "Difficult",
                      "Very Difficult",
                    ],
                    label: "Difficulty",
                  },
                ]}
                yAxis={[
                  {
                    scaleType: "linear",
                    label: "frequency",
                  },
                ]}
                series={difdata}
                /* colors={[colors.custom01[400], colors.greenAccent[700]]} */
                width={500}
                height={300}
              />
              <Button
                onClick={downloadTaskDifficultyData}
              
              >
                Download CSV <DownloadIcon></DownloadIcon>
              </Button>
            </Box>
          </Grid>
        </>
      )}
      {/* Message when no task is selected */}
      {/* {selectedStatementId == 0 && (
        <Grid container spacing={2} justify="flex-start">
          <Grid item xs={6} md={6}>
            <p style={{ marginLeft: "0px" }}>Please select a task </p>
          </Grid>
        </Grid>
      )} */}
      {/* Message when no data is available for selected task */}
      {selectedStatementId > 0 && filteredData.length == 0 && (
        <Grid container spacing={0} justify="flex-start">
          <Grid item xs={6} md={6}>
            <p style={{ marginLeft: "0px" }}>
              No Data available for this task, please select another{" "}
            </p>
          </Grid>
        </Grid>
      )}
      {/* Placeholder when no task is selected */}
      {filteredData.length == 0 && (
        <>
          <Grid item xs={12} md={6} />
        </>
      )}

      {filteredAreaData.length > 0 && (
        <>
          <Grid item xs={12} md={6}>
            <Box
              height="100%"
              /* backgroundColor={colors.primary[400]} */
              sx={cardStyle}
            >
              <Typography>Needed Time for Selected Area:</Typography>
              <Typography>
                Mean Processing Time by all users: {AreameanProcessingTime}{" "}
                Minutes
              </Typography>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: ["below 30min", "30-60min", "60-90min", "over 90min"],
                    label: "Time ranges in minutes",
                  },
                ]}
                yAxis={[
                  {
                    scaleType: "linear",
                    label: "frequency",
                  },
                ]}
                series={areatimedata}
                /* colors={[colors.blueAccent[400], colors.greenAccent[400]]} */
                padding={0.3}
                width={500}
                height={300}
              />
              <Button
                onClick={downloadAreaData}
            
              >
                Download CSV <DownloadIcon></DownloadIcon>
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              height="100%"
              /* backgroundColor={colors.primary[400]} */
              sx={cardStyle}
            >
              <Typography>Difficulty for Selected Area:</Typography>
              <Typography>
                Mean Difficulty Rating by all users: {areaavgdiffi}/5
              </Typography>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: [
                      "Very Easy",
                      "Easy",
                      "Medium",
                      "Difficult",
                      "Very Difficult",
                    ],
                    label: "Difficulty",
                  },
                ]}
                yAxis={[
                  {
                    scaleType: "linear",
                    label: "frequency",
                  },
                ]}
                series={areadifdata}
                /*  colors={[colors.blueAccent[400], colors.greenAccent[400]]} */
                width={500}
                height={300}
              />
              <Button
                onClick={downloadAreaDifficultyData}
            
              >
                Download CSV <DownloadIcon></DownloadIcon>
              </Button>
            </Box>
          </Grid>
        </>
      )}
      {/* Message when no area is selected */}
      {/* {selectedAreaId == 0 && (
        <Grid container spacing={50} justify="flex-end">
          <Grid item xs={10} md={10}>
            <p
              style={{
                marginLeft: "0px",
                textAlign: "right",
                marginTop: "-66px",
              }}
            >
              Please select an area
            </p>
          </Grid>
        </Grid>
      )} */}
      {/* Message when no data is available for selected area */}
      {selectedAreaId > 0 && filteredAreaData.length == 0 && (
        <Grid container spacing={0} justify="flex-end">
          <Grid item xs={11} md={11}>
            <p
              style={{
                marginLeft: "0px",
                textAlign: "right",
                marginTop: "-66px",
              }}
            >
              No Data available for this area, please select another
            </p>
          </Grid>
        </Grid>
      )}
      {isAdmin ? (
        <Grid item xs={12}>
          <Typography>
            Choose User for User specific task and area statistics:
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="user-label">Select User</InputLabel>
            <Select
              labelId="user-label"
              id="user-select"
              value={selectedUserId}
              onChange={handleUserIdChange}
              style={{ width: "100%" }}
            >
              {userData.map((item) => (
                <MenuItem key={item.username} value={item.username}>
                  {item.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Typography>
            Choose User for User specific task and area statistics:
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="user-label">Select User</InputLabel>
            <Select
              labelId="user-label"
              id="user-select"
              value={selectedUserId}
              onChange={handleUserIdChange}
              style={{ width: "100%" }}
            >
              <MenuItem key={username} value={username}>
                {username}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      )}
      <Grid item xs={12} md={12}>
        <Box component="section">
          {" "}
          <Alert severity="info" sx={{ marginBottom: 2 }}>
            Note: The ranking is intended only as gamification and not as a
            rating for passing or failing the course.
          </Alert>
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box sx={{ ...cardStyle, padding: 3, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h5" fontWeight="600" gutterBottom>
            User performance by task
          </Typography>

          {(selectedStatementId == 0 || selectedUserId == 0) && (
            <Typography variant="body1" color="textSecondary">
              Please select a task and a user to see these statistics
            </Typography>
          )}
          {selectedStatementId != 0 &&
            selectedUserId != 0 &&
            filteredUserTaskData.length > 0 && (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Metric</TableCell>
                      <TableCell>User Data</TableCell>
                      <TableCell>All Users Data</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Time for this task</TableCell>
                      <TableCell style={{ color: "blue" }}>
                        {UserTaskprocessingTimes} minutes
                      </TableCell>
                      <TableCell style={{ color: "purple" }}>
                        {meanProcessingTime} minutes
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Difficulty ranking for this task</TableCell>
                      <TableCell style={{ color: "blue" }}>
                        {UserTaskdifdata}
                      </TableCell>
                      <TableCell style={{ color: "purple" }}>
                        {avgdiffi}/5 - {get_dif_ranking(avgdiffi)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        <Typography
                          variant="h4"
                          color="primary"
                          style={{ marginTop: "1rem" }}
                        >
                          User Rank:{" "}
                          {get_rank(
                            UserTaskprocessingTimes,
                            meanProcessingTime,
                            UserTaskdifdata,
                            avgdiffi
                          )}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          {selectedStatementId != 0 &&
            selectedUserId != 0 &&
            filteredUserTaskData.length == 0 && (
              <Typography variant="body1" color="textSecondary">
                No statistics for this user and task available
              </Typography>
            )}
        </Box>
      </Grid>

      {/* 5. User performance by area */}
      <Grid item xs={12} md={6}>
        <Box sx={{ ...cardStyle, padding: 3, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h5" fontWeight="600" gutterBottom>
            User performance by area
          </Typography>
          {(selectedAreaId == 0 || selectedUserId == 0) && (
            <Typography variant="body1" color="textSecondary">
              Please select an area and a user to see these statistics
            </Typography>
          )}
          {selectedAreaId != 0 &&
            selectedUserId != 0 &&
            filteredUserAreaData.length > 0 && (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Metric</TableCell>
                      <TableCell>User Data</TableCell>
                      <TableCell>All Users Data</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        Mean time for exercises in this area
                      </TableCell>
                      <TableCell style={{ color: "blue" }}>
                        {AreameanProcessingTimeUser} minutes
                      </TableCell>
                      <TableCell style={{ color: "purple" }}>
                        {AreameanProcessingTime} minutes
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        Difficulty ranking for tasks in this area
                      </TableCell>
                      <TableCell style={{ color: "blue" }}>
                        {userareaavgdiffi}/5 -{" "}
                        {get_dif_ranking(userareaavgdiffi)}
                      </TableCell>
                      <TableCell style={{ color: "purple" }}>
                        {areaavgdiffi}/5 - {get_dif_ranking(areaavgdiffi)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        <Typography
                          variant="h4"
                          color="primary"
                          style={{ marginTop: "1rem" }}
                        >
                          User Rank:{" "}
                          {get_rank(
                            AreameanProcessingTimeUser,
                            AreameanProcessingTime,
                            get_dif_ranking(userareaavgdiffi),
                            areaavgdiffi
                          )}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          {selectedAreaId != 0 &&
            selectedUserId != 0 &&
            filteredUserAreaData.length == 0 && (
              <Typography variant="body1" color="textSecondary">
                No statistics for this user and area available
              </Typography>
            )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default StatisticsC;
