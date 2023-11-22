//######### Testphase DBMS - PostgreSQL session ###########
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, TextField, InputLabel, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";

const PgLogin = () => {
  const navigate = useNavigate();
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

  /* const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [isConnected, setIsConnected] = useState(false);*/
  const [errorMessage, setErrorMessage] = useState("");

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //const { username, password } = values;

  /* const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("/api/pgaccess", {
        username,
        password,
      })
      .then((response) => {
        setIsConnected(true);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        setIsConnected(false);
        setErrorMessage("Connection failed. Please check your username and password again or ask your tutors for help.")

      });
  }; */

  // login
  /* const handleLogin = async () => {
    try {
      const response = await axios.post('/login', { username, password });
      if (response.status === 200) {
        setUser(response.user);
        setIsLoggedIn(true);
        setUsername('');
        setPassword('');
        navigate("/dashboard"); 
        
      } else {
        alert('Fehler: Ungültige Anmeldeinformationen');
      }
    } catch (error) {
      console.error('Fehler beim Anmelden:', error);
      alert('Fehler beim Anmelden');
    }
  }; */
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
        localStorage.setItem("token", JSON.stringify(response.data.user_name));
        //localStorage.setItem("user", JSON.stringify(response.data.user_name) );

        navigate("/dashboard");
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
  /*  const handleLogout = async () => {
    try {
      const response = await axios.get('/logout');
      if (response.status === 200) {
        setUser(null);
      } else {
        alert('Fehler beim Abmelden');
      }
    } catch (error) {
      console.error('Fehler beim Abmelden:', error);
      alert('Fehler beim Abmelden');
    }
  }; */

  useEffect(() => {
    // Hier können Sie einen API-Aufruf an Ihren Server senden, um den aktuellen Benutzer abzurufen, wenn vorhanden.
  }, []);
  return (
    <Box display="flex" alignItems="center" justifyContent="center" p={7}>
      <div>
        <div
        
          style={{
            border: `1px solid ${colors.blueAccent[100]}`,
            borderRadius: "5px",
            padding: "50px"
          }}
        >
          <h2>Login</h2>
          <p>
            Please type in your username and password provided by your
            instructor.
          </p>
          <form>
            {user ? (
              <div></div>
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
      </div>
    </Box>
  );
};

export default PgLogin;
