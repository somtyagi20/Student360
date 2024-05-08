import { useState, useRef } from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { Tab, Tabs } from "@mui/material";
import axios from "axios";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(0);
  const roles = ["Student", "Faculty", "Admin"];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const handleChange = (event, newValue) => {
    setRole(newValue);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    setEmailError(!emailRegex.test(event.target.value));
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleLogin = () => {
    const r = roles[role];
    if (r === "Student") {
      axios
        .post("http://localhost:3000/api/v1/student/login", { email, password })
        .then((response) => {
          const data = response.data.data;
          console.log(data);
          localStorage.setItem("token", data.accessToken);
          setUser(data.loggedInUser);
          navigate("/student");
        })
        .catch((error) => {
          // handle login error
        });
    } else if (r === "Faculty") {
      try {
        axios
          .post("http://localhost:3000/api/v1/faculty/login", {
            email,
            password,
          })
          .then((response) => {
            const data = response.data.data;
            console.log(data);
            localStorage.setItem("token", data.accessToken);
            setUser(data.loggedInUser);
            navigate("/faculty");
          })
          .catch((error) => {
            // handle login error
          });
      } catch (error) {
        console.log(error);
      }
    } else if (r === "Admin") {
      try {
        axios
          .post("http://localhost:3000/api/v1/admin/login", {
            email,
            password,
          })
          .then((response) => {
            const data = response.data.data;
            console.log(data);
            localStorage.setItem("token", data.accessToken);
            setUser(data.loggedInUser);
            navigate("/admin");
          })
          .catch((error) => {
            // handle login error
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container">
      <div className="login">
        <LoginIcon sx={{ fontSize: 40, m: 0 }} />
        <h2>Sign In</h2>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& > :not(style)": { m: 1, width: "100%" },
          }}
        >
          <div className="role">
            <Tabs
              value={role}
              onChange={handleChange}
              centered
              indicatorColor="primary"
            >
              <Tab label="Student" />
              <Tab label="Faculty" />
              <Tab label="Admin" />
            </Tabs>
          </div>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            sx={{ m: 1 }}
            value={email}
            type="email"
            error={emailError}
            helperText={emailError ? "Invalid email format" : ""}
            onChange={handleEmailChange}
          />
          <FormControl sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            Forgot password?
          </a>
          <Button
            variant="contained"
            sx={{
              m: 1,
              width: "100%",
              padding: "10px 12px",
            }}
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Login;
