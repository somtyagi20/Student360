import { Box, Button } from "@mui/material";
import Navbar from "../Components/Navbar";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import "./FacultyDashboard.css";
import AdminInfoCard from "../Components/AdminInfoCard";
import axios from "axios";
import { useEffect } from "react";
import { Tab, Tabs } from "@mui/material";
import AllStudentsTable from "../Components/AllStudentsTable";
import AccessPanel from "../Components/AccessPanel";

const AdminDashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const [classes, setClasses] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [accessPanelVisible, setAccessPanelVisible] = useState(false);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const getClasses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/admin/getClasses`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setClasses([
          ...new Set(
            response.data.data.map((className) => className.toUpperCase())
          ),
        ]);
        console.log(classes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

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
      <AdminInfoCard />
      <Button
        variant="contained"
        sx={{
          width: "content-width",
          alignSelf: "start",
          marginLeft: "25px",
          color: "white",
        }}
        onClick={() => setAccessPanelVisible(true)}
      >
        Manage Access
      </Button>
      <Box
        sx={{
          padding: "20px",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="fullWidth"
          scrollButtons="auto"
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: "5px",
          }}
        >
          {classes.map((className, index) => (
            <Tab key={index} label={className} />
          ))}
        </Tabs>

        <div
          style={{
            border: "1px solid #e0e0e0",
          }}
        >
          {classes.map((className, index) => (
            <div
              key={index}
              style={{ display: selectedTab === index ? "block" : "none" }}
            >
              <AllStudentsTable Class={className} />
            </div>
          ))}
        </div>
      </Box>
      {accessPanelVisible && (
        <AccessPanel setAccessPanelVisible={setAccessPanelVisible} />
      )}
    </Box>
  );
};

export default AdminDashboard;
