//######### Testphase DBMS - PostgreSQL session ###########
import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import { Box, TextField, InputLabel, useTheme } from "@mui/material"
import { tokens } from "../theme"
import { useNavigate, Link } from "react-router-dom"
import Footer from "../scenes/global/footer"
import { Controller, useForm } from "react-hook-form"
import CustomInput from "./CustomInput"
import { Button, Input } from "antd"
import { AiFillLock } from "react-icons/ai"
import { FaRegUser } from "react-icons/fa"
import "./PgLogin.css"
const PgLogin = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [userInput, setUserInput] = useState("")
  const [captchaText, setCaptchaText] = useState("")
  const userRef = useRef()
  const canvasRef = useRef()
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm()

  let obj = {}
  const sample = Object.keys(errors).length

  if (sample) {
    for (const key in errors) {
      obj[key] = errors[key]?.message
    }
  }

  const generateRandomChar = (min, max) =>
    String.fromCharCode(Math.floor(Math.random() * (max - min + 1) + min))

  const generateCaptchaText = () => {
    let captcha = ""
    for (let i = 0; i < 3; i++) {
      captcha += generateRandomChar(65, 90)
      captcha += generateRandomChar(97, 122)
      //captcha += generateRandomChar(48, 122)
    }

    return captcha
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("")
  }
  const drawCaptchaOnCanvas = (ctx, captcha) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    const textColors = ["rgb(0,0,0)"]
    const letterSpace = 150 / captcha.length
    for (let i = 0; i < captcha.length; i++) {
      const xInitialSpace = 25
      ctx.font = "35px Roboto Mono"
      console.log(
        "color",
        textColors,
        textColors[Math.floor(Math.random() * 2)],
        Math.random() * 2
      )
      ctx.fillStyle = textColors["rgb(158, 44, 44)"]
      ctx.fillText(
        captcha[i],
        xInitialSpace + i * letterSpace,
        // Randomize Y position slightly
        Math.floor(Math.random() * 16 + 25),
        100
      )
    }
  }

  const initializeCaptcha = (ctx) => {
    setUserInput("")
    const newCaptcha = generateCaptchaText()
    console.log(newCaptcha)
    setCaptchaText(newCaptcha)
    drawCaptchaOnCanvas(ctx, newCaptcha)
  }

  let muiButtonStyle = {
    backgroundColor: colors.blueAccent[100],
    color: colors.grey[900],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
    margin: "10px",
  }

  /* const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [isConnected, setIsConnected] = useState(false);*/
  const [errorMessage, setErrorMessage] = useState("")

  const [user, setUser] = useState(null)
  //const [username, setUsername] = useState("");
  //const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
  //upadte login part

  /* const handleLogin = async (e) => {
    e.preventDefault() */
  const onSubmit = (data) => {
    const { username, password } = data
    axios
      .post("/login", {
        username,
        password,
      })
      .then((response) => {
        setIsLoggedIn(true)
        setUser(response.data.username)
        localStorage.setItem("token", JSON.stringify(response.data.username))
        navigate("/")
        window.location.reload()
      })
      .catch((error) => {
        console.log(error)
        setIsLoggedIn(false)
        setErrorMessage(
          "Connection failed. Please check your username and password again or ask your tutors for help."
        )
      })
  }

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

  const handleRecaptcha = () => {
    console.log(userRef.current.value, "cap", captchaText)
    if (userRef.current.value === captchaText) {
      alert("matched")
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    initializeCaptcha(ctx)
  }, [])
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "600px", border: "8px solid black", padding: "30px" }}
      >
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Login
        </h1>
        <CustomInput
          label="User Name"
          name="username"
          control={control}
          rules={{ required: "User Name is required" }}
          placeholder="Type your user name"
          type="text"
          errors={obj}
          icon={<FaRegUser />}
        />
        <CustomInput
          icon={<AiFillLock />}
          label="Password"
          name="password"
          control={control}
          errors={obj}
          rules={{ required: "Password is required" }}
          placeholder="Type your password"
          type="password"
        />
        <br />
        <div className="recaptcha">
          <div
            className="wrapper"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              paddingTop: "10px",
            }}
          >
            <canvas
              ref={canvasRef}
              style={{
                width: "253px",
                height: "83px",
                paddingTop: "35px",
                paddingLeft: "29px",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
              }}
            ></canvas>
            <Button
              type="primary"
              htmlType="submit"
              className=""
              onClick={() =>
                initializeCaptcha(canvasRef.current.getContext("2d"))
              }
            >
              Reload
            </Button>
          </div>
          <div class="buttonIn">
            <input
              type="text"
              className="captcha"
              placeholder="Enter the text in the image"
              ref={userRef}
            />
            <button id="clear" onClick={handleRecaptcha}>
              check
            </button>
          </div>
        </div>

        <br />

        <Button type="primary" htmlType="submit" className="form_btn">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default PgLogin
