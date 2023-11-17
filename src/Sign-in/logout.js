import React, { useState } from "react";
import { Button, useTheme } from "@mui/material";
import { tokens } from "../theme";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const LogOut = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //const logOut = () => {
    const handleLogout = async () => {
      try {
        const response = await axios.get('/logout');
        if (response.status === 200) {
          //setUser(null);
          localStorage.removeItem("token");
          //localStorage.removeItem("user");
          navigate("/signin");
          window.location.reload();
        } else {
          alert('Fehler beim Abmelden');
        }
      } catch (error) {
        console.error('Fehler beim Abmelden:', error);
        alert('Fehler beim Abmelden');
      }
    };
   /*  axios
      .get("api/logout")
      .then((result) => {
        toast.success("Log out successfull");
        localStorage.removeItem("token");
        setLoggedOut(true); // **
        console.log(loggedOut); // **
        navigate("/signin");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      }); */
 // };

  return (
    <Link to="signin" replace>
      <Button sx={{ color: colors.blueAccent[400] }} onClick={handleLogout}>
        Logout
      </Button>
    </Link>
  );
};

export default LogOut;
