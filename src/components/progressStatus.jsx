import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ProgressStatus = ({ title }) => {
  //################# Style Settings ######################################################
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Styles for mui components
  let muiBoxStyle = {};

  let startedStyle = {
    backgroundColor: "#dded82",
    color: colors.grey[100],
    fontSize: "10px",
    fontWeight: "bold",
    padding: "5px 10px",
    margin: "10px 10px",
  };
  let finishStyle = {
    backgroundColor: "#5ae0a8",
    color: colors.grey[100],
    fontSize: "10px",
    fontWeight: "bold",
    padding: "5px 10px",
    margin: "10px 10px",
  };
  //################# State Variables ######################################################
  const [username, setUsername] = useState(localStorage.getItem("token"));

  if (localStorage.getItem(`${title.toLowerCase()}Status_${username}`) === "STARTED") {
    muiBoxStyle = startedStyle;
  } else if (
    localStorage.getItem(`${title.toLowerCase()}Status_${username}`) === "FINISHED"
  ) {
    muiBoxStyle = finishStyle;
  }
  //################# Frontend ######################################################
  return (
    <Box>
      <Box sx={muiBoxStyle}>
        {localStorage.getItem(`${title.toLowerCase()}Status_${username}`) || ""}{" "}
      </Box>
    </Box>
  );
};

export default ProgressStatus;
