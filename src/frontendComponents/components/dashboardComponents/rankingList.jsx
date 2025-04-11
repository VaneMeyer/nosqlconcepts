import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { fetchRankingData, fetchTotalUsersData } from "../../api/chartsApi";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import PersonIcon from "@mui/icons-material/Person";
import { Card, CircularProgress } from "@mui/material";


function RankingList() {
    const [easyTask, setEasyTask] = useState(0);
      const [difficultTask, setDifficultTask] = useState(0);
      const [loading, setLoading] = useState(true);
      const [totalUsers, setTotalUsers] = useState(0);
    
      const fetchData = async () => {
        try {
          const result = await fetchRankingData();
          const result2 = await fetchTotalUsersData();
    
          if (result) {
            const dataEasy = result.easy;
            const dataDiff = result.difficult;
    
            setEasyTask(dataEasy[0]);
            setDifficultTask(dataDiff[0]);
          }
          if (result2) {
            setTotalUsers(result2[0].total_users);
          }
        } catch (error) {
          console.error("Error fetching chart data:", error);
        } finally {
          setLoading(false);
        }
      };
      useEffect(() => {
        fetchData();
      }, []);
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
      return (
        <Card elevation={3} sx={{ borderRadius: 4, height:300, p:2 }}>
            <Box sx={{ flexGrow: 1, maxWidth: 752}}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Total user count: ${totalUsers}`}
                    secondary={``}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <InsertEmoticonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Most easy rated: Task ${easyTask.task_id}`}
                    secondary={` ${easyTask.task_area}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <MoodBadIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Most difficult rated: Task ${difficultTask.task_id}`}
                    secondary={` ${difficultTask.task_area}`}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Box>
        </Card>
        
      );
}

export default RankingList;