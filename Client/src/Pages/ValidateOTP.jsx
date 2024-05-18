import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ValidateOTP = ({ role }) => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const validateOTP = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/${role}/validateOTP`,
        { email, otp }
      );
      if (response.data.success) {
        setErrorMessage("");
        console.log(response.data.message);
        localStorage.setItem("token", response.data.data.accessToken);
        navigate(`/resetpassword/${role}`);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setEmail(localStorage.getItem("emailforotp"));
  }, []);
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          marginTop: "5rem",
          color: "black",
        }}
      >
        Validate OTP
      </h1>
      <p
        style={{
          textAlign: "center",
          color: "black",
        }}
      >
        Enter the OTP sent to your email address below.
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
        <label>OTP</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
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
            validateOTP();
          }}
        >
          Validate OTP
        </button>
      </form>
      {errorMessage && (
        <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
      )}
    </div>
  );
};

export default ValidateOTP;
