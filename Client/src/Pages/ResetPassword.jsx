import React from "react";
import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ResetPassword = ({ role }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const resetPassword = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/${role}/setNewPassword`,
        { newPassword: password },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        console.log(response.data.message);
        setMessage(response.data.message);
        localStorage.removeItem("token");
        localStorage.removeItem("emailforotp");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "5rem", color: "black" }}>
        Reset Password
      </h1>
      <p style={{ textAlign: "center", color: "black" }}>
        Enter your new password below.
      </p>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "30%",
          margin: "auto",
          marginTop: "2rem",
          padding: "1rem",
          borderRadius: "10px",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        }}
      >
        <label>New Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label>Confirm New Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <button
          style={{
            backgroundColor: "#634dd1",
            color: "white",
            padding: "0.5rem",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            marginTop: "1rem",
          }}
          onClick={(e) => {
            e.preventDefault();
            if (password !== confirmPassword) {
              alert("Passwords do not match");
            } else {
              resetPassword();
            }
          }}
        >
          Reset Password
        </button>
      </form>
      {message && (
        <p style={{ color: "green", textAlign: "center" }}>{message}</p>
      )}
    </div>
  );
};

export default ResetPassword;
