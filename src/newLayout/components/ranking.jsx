import React, { useState, useEffect } from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchRankingData, fetchTotalUsersData } from "../api/chartsApi";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import PersonIcon from "@mui/icons-material/Person";

export default function RankingC() {
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
    return <p>Loading...</p>;
  }
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
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
  );
}
