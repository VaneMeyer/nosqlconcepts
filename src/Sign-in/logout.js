import React from "react";
import { Button, useTheme } from "@mui/material";
import { tokens } from "../theme";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LogOut = () => {
  const navigate = useNavigate();
  //################# Style Settings ######################################################
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
//################# handle Functions ######################################################
  const handleLogout = async () => {
    try {
      const response = await axios.get("/logout");
      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/");
        window.location.reload();
      } else {
        alert("Fehler beim Abmelden");
      }
    } catch (error) {
      console.error("Fehler beim Abmelden:", error);
      alert("Fehler beim Abmelden");
    }
  };
//################# Frontend ######################################################
  return (
    <Link to="signin" replace>
      <Button
        sx={{
          color: colors.grey[100],
          width:"300px",
          /* "&:hover": { backgroundColor: `${colors.blueAccent[700]}` }, */
        }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Link>
  );
};

export default LogOut;
