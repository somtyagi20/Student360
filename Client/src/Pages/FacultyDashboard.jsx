import { Box } from "@mui/material";
import Navbar from "../Components/Navbar";
import FacultyInfoCard from "../Components/FacultyInfoCard";
import StudentTable from "../Components/StudentTable";

import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

import "./FacultyDashboard.css";

const FacultyDashboard = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "65px",
        gap: 3,
      }}
    >
      <Navbar />
      <FacultyInfoCard />
      <div
        style={{
          padding: "20px",
        }}
      >
        <StudentTable
          Class={user && user.accessed_class && user.accessed_class[0]}
        />
      </div>
    </Box>
  );
};

export default FacultyDashboard;
