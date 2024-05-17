import "./StudentDashboard.css";
import image from "../assets/Avatar 5.png";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Navbar from "../Components/Navbar";
import { useEffect, useState, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import PersonalForm from "../Components/PersonalForm";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import AcademicDetails from "../Components/AcademicDetails";
import Achievements from "../Components/Achievements";
import axios from "axios";
import { formatDate } from "../Config/logics";
import Projects from "../Components/Projects";
const StudentDashboard = () => {
  const [value, setValue] = useState(0);
  const [student, setStudent] = useState({});
  const { user, setUser } = useContext(UserContext);
  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        style={{
          padding: "20px",
        }}
      >
        {value === index && <div>{children}</div>}
      </div>
    );
  }
  const [isFormVisible, setFormVisible] = useState(false);

  const fileInput = useRef();

  const handleAddIconClick = () => {
    fileInput.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file); // Log the selected file

    try {
      const formData = new FormData();
      formData.append("profile_pic", file);
      axios
        .post(
          "http://localhost:3000/api/v1/student/updateProfilePicture",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data.message);
          getUserDetails();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getUserDetails = () => {
    try {
      axios
        .get("http://localhost:3000/api/v1/student/getUserDetails", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          const data = response.data.data;
          setStudent(data);
          setUser(data);
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateClick = () => {
    setFormVisible(true);
  };

  useEffect(() => {
    getUserDetails();
  }, [isFormVisible]);

  return (
    <div className="student-container">
      <Navbar />
      <div className="Student-header">
        <div className="st-background">
          <div className="st-details">
            <div
              className="user-image-container"
              style={{
                position: "relative",
                display: "flex",
              }}
            >
              {student && student.profile_pic ? (
                <img
                  src={student.profile_pic}
                  alt="student"
                  className="user-image"
                />
              ) : (
                <img
                  src="../src/assets/students2.jpg"
                  alt="student"
                  className="user-image"
                />
              )}
              <IconButton
                sx={{
                  color: "#634dd1",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  padding: "5px",
                  cursor: "pointer",
                  zIndex: "1001",
                  width: "40px",
                  height: "40px",
                  position: "absolute",
                  top: "150px",
                  left: "170px",
                }}
                onClick={handleAddIconClick}
              >
                <AddIcon />
              </IconButton>
              <input
                type="file"
                ref={fileInput}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
            <div className="details">
              <div className="detail-item">
                <b className="detail-label">Name: </b>
                <span className="detail-value">
                  {student ? student.name : ""}
                </span>
              </div>

              <div className="detail-item">
                <b className="detail-label">Enrollment no: </b>
                <span className="detail-value">
                  {student ? student.enrollment_no : ""}
                </span>
              </div>

              <div className="detail-item">
                <b className="detail-label">Class: </b>
                <span className="detail-value">
                  {student ? student.class : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab label="Personal Details" {...a11yProps(0)} className="tabs" />
          <Tab label="Academic Details" {...a11yProps(1)} className="tabs" />
          <Tab label="Achievements" {...a11yProps(2)} className="tabs" />
          <Tab label="Projects" {...a11yProps(3)} className="tabs" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <div className="personal-details">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr className="personal-item">
                  <th>Contact:</th>
                  <td>{student ? student.contact_no : ""}</td>
                </tr>
                <tr className="personal-item">
                  <th>Department:</th>
                  <td>{student ? student.department : ""}</td>
                </tr>
                <tr className="personal-item">
                  <th>DOB:</th>
                  <td>{student ? formatDate(student.dob) : ""}</td>
                </tr>
                <tr className="personal-item">
                  <th>Current Address:</th>
                  <td>{student ? student.current_address : ""}</td>
                </tr>
                <tr className="personal-item">
                  <th>Permanent Address:</th>
                  <td>{student ? student.permanent_address : ""}</td>
                </tr>
                <tr className="personal-item">
                  <th>Career Goals:</th>
                  <td>{student ? student.career_goals : ""}</td>
                </tr>
                <tr className="personal-item">
                  <th>Skills:</th>
                  <td>{student ? student.skills : ""}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: "100",
            }}
          >
            {!isFormVisible && (
              <button
                style={{
                  backgroundColor: "#634dd1",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
                onClick={handleUpdateClick}
              >
                Update
              </button>
            )}
          </div>
          {isFormVisible && <PersonalForm setFormVisible={setFormVisible} />}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AcademicDetails />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Achievements />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Projects />
        </TabPanel>
      </div>
    </div>
  );
};
export default StudentDashboard;
