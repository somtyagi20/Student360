import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentDashboard from "./Pages/StudentDashboard.jsx";
import FacultyDashboard from "./Pages/FacultyDashboard.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import ValidateOTP from "./Pages/ValidateOTP.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#634dd1",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/faculty" element={<FacultyDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route
              path="/forgotpassword/student"
              element={<ForgotPassword role={"student"} />}
            />
            <Route
              path="/forgotpassword/faculty"
              element={<ForgotPassword role={"faculty"} />}
            />
            <Route
              path="/forgotpassword/admin"
              element={<ForgotPassword role={"admin"} />}
            />
            <Route
              path="/validateotp/student"
              element={<ValidateOTP role={"student"} />}
            />
            <Route
              path="/validateotp/faculty"
              element={<ValidateOTP role={"faculty"} />}
            />
            <Route
              path="/validateotp/admin"
              element={<ValidateOTP role={"admin"} />}
            />
            <Route
              path="/resetpassword/student"
              element={<ResetPassword role={"student"} />}
            />
            <Route
              path="/resetpassword/faculty"
              element={<ResetPassword role={"faculty"} />}
            />
            <Route
              path="/resetpassword/admin"
              element={<ResetPassword role={"admin"} />}
            />
          </Routes>
        </Router>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);
