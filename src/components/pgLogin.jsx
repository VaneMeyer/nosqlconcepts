import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, InputLabel, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import Footer from "../scenes/global/footer";

const PgLogin = () => {
  const navigate = useNavigate();

  //################# Style Settings ######################################################
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
  };

  //################# State Variables ######################################################
  const [errorMessage, setErrorMessage] = useState("");

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //################# handle Functions ######################################################
  const handleLogin = async (e) => {
    e.preventDefault();
    axios
      .post("/login", {
        username,
        password,
      })
      .then((response) => {
        setIsLoggedIn(true);
        setUser(response.data.user_name);
        setRole(response.data.role);
        localStorage.setItem("token", JSON.stringify(response.data.username));
        /* localStorage.setItem("token", JSON.stringify(response.data.user_name)); */
        localStorage.setItem("role", response.data.role);

        navigate("/"); //dashboard

        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        setIsLoggedIn(false);
        setErrorMessage(
          "Connection failed. Please check your username and password again or ask your tutors for help."
        );
      });
  };

  //################# Frontend ######################################################
  return (
    <Box display="flex" alignItems="center" justifyContent="center" p={7}>
      <div>
        <div
          style={{
            border: `1px solid ${colors.blueAccent[100]}`,
            borderRadius: "5px",
            padding: "50px",
          }}
        >
          <h2>Login</h2>
          <p>
            Please type in your username and password provided by your
            instructor.
          </p>
          <form>
            {user ? (
              <div>
                {" "}
                {/* <Link to="/dashboard">
                  <Button>Go To Dashboard</Button>
                </Link> */}
              </div>
            ) : (
              <div>
                <div>
                  <InputLabel id="username">Username</InputLabel>
                  <TextField
                    id="username"
                    width="300px"
                    type="text"
                    /* onChange={handleChange("username")} */
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  ></TextField>
                </div>

                <div>
                  <InputLabel id="password">Password</InputLabel>
                  <TextField
                    id="password"
                    width="300px"
                    type="password"
                    /* onChange={handleChange("password")} */
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  ></TextField>
                </div>

                <Button
                  sx={muiButtonStyle}
                  /* onClick={handleSubmit} */ onClick={handleLogin}
                  type="submit"
                >
                  login
                </Button>
              </div>
            )}
            {errorMessage !== "" && (
              <p
                style={{
                  fontWeight: "bold",
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: `${colors.redAccent[700]}`,
                }}
              >
                {errorMessage}
              </p>
            )}
          </form>
        </div>
        <Footer />
      </div>
    </Box>
  );
};

export default PgLogin;
