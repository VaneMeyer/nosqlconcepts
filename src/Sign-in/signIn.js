import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Box, Button, TextField, InputLabel, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
//import "./signin.css";

const SignIn = () => {
  const navigate = useNavigate() ;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  /* Styles for mui components */
  let muiButtonStyle = {
    backgroundColor: colors.blueAccent[700],
    color: colors.grey[100],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
  };

  const handleLogin = () => {
    // open Authorization-URL from OAuth2-Provider
    window.location.href = "AUTHORIZATION_URL";
    //example: const authorizationUrl = `AUTHORIZATION_ENDPOINT?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`;
  };
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = values;

  const handleChange = (name) => (e) => {
    // console.log(e.target.value);
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/signin", {
        email,
        password,
      });

      //console.log(data);

      if (data.success === true) {
        setValues({ email: "", password: "" });
        toast.success("Log In successfully");
        localStorage.setItem("token", JSON.stringify(data));
        if (typeof window !== "undefined") {
            //setTimeout(() => {
            navigate("/");
            window.location.reload(); // other solution
          //}, 2000);
        }
      }
    } catch (err) {
      console.log(err.response.data.error);
      toast.error(err.response.data.error);
    }
  };
  return (
    <Box m="20px">
      <div>
        <div>
          <h2>SIGN IN</h2>
          <form>
            <div>
              <InputLabel id="email">E-Mail</InputLabel>
              <TextField
                id="email"
                width="300px"
                type="email"
                onChange={handleChange("email")}
                value={email}
              ></TextField>
            </div>

            <div>
              <InputLabel id="password">Password</InputLabel>
              <TextField
                id="password"
                width="300px"
                type="password"
                onChange={handleChange("password")}
                value={password}
              ></TextField>
            </div>
            <Button sx={muiButtonStyle} onClick={handleSubmit} type="submit">
              Log In
            </Button>
          </form>
        </div>
        <div>
          <Button sx={muiButtonStyle} onClick={handleLogin}>
            Log in with HRZ account
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default SignIn;

/*
<div>
      <div className="container custom_className ">
                <h2 className="signup_title text-center">SIGN IN</h2>
                <form className=" col-sm-6 offset-3 pt-5 signup_form">
                    
                                  
                    <div className="form-outline mb-4">
                        <input onChange={handleChange("email")}   type="email" id="form4Example2" className="form-control"  value={email} />
                        <label className="form-label" htmlFor="form4Example2">Email </label>
                    </div>

                
                    <div className="form-outline mb-4">
                        <input onChange={handleChange("password")}   type="password" id="form4Example3" className="form-control" value={password}  />
                        <label className="form-label" htmlFor="form4Example3">Password</label>
                    </div>
                
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block mb-4">Log In</button>
                </form>
            </div>
      <div id="sign-in">
      <button onClick={handleLogin}>Login with HRZ Account</button>
    </div>
    </div>
*/
