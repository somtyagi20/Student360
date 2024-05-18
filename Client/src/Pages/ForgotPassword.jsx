import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ForgotPassword = ({ role }) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const forgotPassword = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/${role}/forgotpassword`,
        { email }
      );
      if (response.data.success) {
        console.log(response.data.message);
        localStorage.setItem("emailforotp", email);
        navigate(`/validateotp/${role}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          marginTop: "5rem",
          color: "black",
        }}
      >
        Forgot Password
      </h1>
      <p
        style={{
          textAlign: "center",
          color: "black",
        }}
      >
        Enter your email address below and we'll send you a OTP to reset your
        password.
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
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter your email"
          required
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            forgotPassword();
          }}
          style={{
            backgroundColor: "#634dd1",
            color: "white",
            padding: "0.5rem",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "1rem",
          }}
        >
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
