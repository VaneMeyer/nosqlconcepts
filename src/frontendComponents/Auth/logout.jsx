import React, { useState, useEffect } from "react";
import { Button} from "@mui/material";
import { Link } from "react-router-dom";
import { handleLogout } from "../api/loginApi";

const LogOut = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [initialValues, setInitialValues] = useState({});
  
  useEffect(() => {
    const storedUsername = localStorage.getItem("rememberedUsername");
    const storedPassword = localStorage.getItem("rememberedPassword");

    if (storedUsername && storedPassword) {
      setInitialValues({
        username: storedUsername,
        password: storedPassword,
      });
      setUsername(storedUsername);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleChangeRememberMe = (event) => {
    setRememberMe(event.target.checked);

    if (!event.target.checked) {
      localStorage.removeItem("rememberedUsername");
      localStorage.removeItem("rememberedPassword");
    }
  };

  
  const handleLogoutClick = async () => {
    const loggedOut = await handleLogout();
    if (loggedOut) {
      
      window.location.reload(); 
    } else {
      
      alert("Error during logout. Please try again.");
    }
  };

  return (
    <Link to="/" replace style={{ textDecoration: "none" }}>
      <Button
       
        onClick={handleLogoutClick}
        aria-label="Logout"
      >
        Logout
      </Button>
    </Link>
  );
};

export default LogOut;
