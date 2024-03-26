import React from 'react';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const ImportantMsg = ({ message, type }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    let msgStyle = {};
    if (type === "success") {
      msgStyle = {fontSize: "16px", margin:"20px", fontWeight: "bold", padding: "10px", borderRadius:"5px", backgroundColor:`${colors.greenAccent[700]}` }
    }
    if (type === "error") {
      msgStyle = {fontSize: "16px", margin:"20px", fontWeight: "bold", padding: "10px", borderRadius:"5px", backgroundColor:`${colors.redAccent[700]}` };
    }
    if (type === "info") {
      msgStyle = {fontSize: "16px", margin:"20px", fontWeight: "bold", padding: "10px", borderRadius:"5px", backgroundColor:"#e1edf7" };
    }
  return (
    <div style={msgStyle}>
      {message}
    </div>
  );
};

export default ImportantMsg;
