import "./StudentDashboard.css";
import image from "../assets/Avatar 5.png";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Navbar from "../Components/Navbar";
import { useState } from "react";

const user = {
  name: "Active Panda",
  enrollment: "0827CS231233",
  class: "CS-4",
  img: image,
};
const StudentDashboard = () => {
  const [value, setValue] = useState(0);
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

  return (
    <div className="student-container">
      <Navbar />
      <div className="Student-header">
        <img src={user.img} alt="" className="user-image" />
        <div className="st-background">
          <div className="st-details">
            <div className="details">
              <div className="detail-item">
                <b className="detail-label">Name: </b>
                <span className="detail-value">{user.name}</span>
              </div>

              <div className="detail-item">
                <b className="detail-label">Enrollment: </b>
                <span className="detail-value">{user.enrollment}</span>
              </div>

              <div className="detail-item">
                <b className="detail-label">Class: </b>
                <span className="detail-value">{user.class}</span>
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
          <Tab label="Acadmic Document" {...a11yProps(1)} className="tabs" />
          <Tab label="Achievements" {...a11yProps(2)} className="tabs" />
          <Tab label="Projects" {...a11yProps(3)} className="tabs" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <>
            <img src="../src/assets/doc-img.png" alt="Document" />
            <img src="../src/assets/doc-img.png" alt="Document" />
            <img src="../src/assets/doc-img.png" alt="Document" />
          </>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <img src="../src/assets/doc-img.png" alt="Document" />
          <img src="../src/assets/doc-img.png" alt="Document" />
          <img src="../src/assets/doc-img.png" alt="Document" />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <img src="../src/assets/doc-img.png" alt="Document" />
          <img src="../src/assets/doc-img.png" alt="Document" />
          <img src="../src/assets/doc-img.png" alt="Document" />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <img src="../src/assets/doc-img.png" alt="Document" />
          <img src="../src/assets/doc-img.png" alt="Document" />
          <img src="../src/assets/doc-img.png" alt="Document" />
        </TabPanel>
      </div>
    </div>
  );
};
export default StudentDashboard;
