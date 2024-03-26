import { AppBar } from "@mui/material";
import "./App.css";
import Login from "./Pages/LoginPage";
import { Box } from "@mui/system";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import React from "react";



function App() {
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#fff",
            color: "black",
            padding: "12px 10px",
          }}
        >
          <Toolbar>
            <img src="src/assets/Image 116.png" alt="" width={"30px"} />
            <img src="src/assets/स्टूडेंट360.png" alt="" height={"25px"} />
          </Toolbar>
        </AppBar>
      </Box>
      <div className="home-container">
        <div className="home-desc">
          <h1>
            Welcome to<br></br>स्टूडेंट<span>360</span>
          </h1>
          <div className="img-container">
            <img src="src\assets\Container 86.png" alt="" />
          </div>
        </div>
        <Login />
      </div>
    </div>
  );
}

export default App;
