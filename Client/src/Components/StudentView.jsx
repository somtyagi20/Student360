import React, { useEffect, useState } from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { formatDate } from "../Config/logics";
import "./StudentView.css";
const StudentView = ({ id, setStudentView, role }) => {
  const [value, setValue] = useState(0);
  const [student, setStudent] = useState({});
  const [highSchool, setHighSchool] = useState({});
  const [intermediate, setIntermediate] = useState({});
  const [graduation, setGraduation] = useState({});
  const [achievements, setAchievements] = useState([]);
  const [projects, setProjects] = useState([]);
  const getStudent = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/${role}/getstudent?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data.data);
      setStudent(response.data.data.student);
      setHighSchool(response.data.data.highSchool);
      setIntermediate(response.data.data.intermediate);
      setGraduation(response.data.data.graduation);
      setAchievements(response.data.data.extracurricularActivity);
      setProjects(response.data.data.project);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getStudent(id);
  }, []);
  return (
    <div
      style={{
        width: "70%",
        height: "70%",
        overflowY: "auto",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        zIndex: "1000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid #634dd1",
        boxShadow: "0px 0px 5px 0px #ccc",
      }}
    >
      <IconButton
        style={{ position: "absolute", top: "10px", right: "10px" }}
        onClick={() => {
          setStudentView(false);
        }}
      >
        <CloseIcon />
      </IconButton>
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <div
          className="student-profile"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div>
            <img
              src={
                student.profile_pic
                  ? student.profile_pic
                  : "../src/assets/students2.jpg"
              }
              alt="profile"
              style={{
                width: "130px",
                height: "130px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #634dd1",
                boxShadow: "0px 0px 10px 0px #634dd1",
              }}
            />
          </div>
          <div className="student-profile-details">
            <h2>{student && student.name}</h2>
            <h4>{student && student.email}</h4>
            <h4>{student && student.enrollment_no}</h4>
          </div>
        </div>
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab label="Personal Details" />
          <Tab label="Academic Details" />
          <Tab label="Achievements" />
          <Tab label="Projects" />
        </Tabs>
        {value === 0 && (
          <div>
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
          </div>
        )}
        {value === 1 && (
          <div>
            <div className="academic-details">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  <tr className="academic-item">
                    <th>High School:</th>
                    <td>
                      {highSchool
                        ? `${highSchool.name} - ${highSchool.passing_year} - ${highSchool.board_of_education} - ${highSchool.percentage}%`
                        : ""}
                    </td>
                  </tr>
                  <tr className="academic-item">
                    <th>Intermediate:</th>
                    <td>
                      {intermediate
                        ? `${intermediate.name} - ${intermediate.passing_year} - ${intermediate.board_of_education} - ${intermediate.percentage}%`
                        : ""}
                    </td>
                  </tr>
                  <tr className="academic-item">
                    <th>Graduation:</th>
                    <td>
                      {graduation
                        ? `Current Year - ${graduation.current_year} (CGPA ${graduation.cgpa})`
                        : ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {value === 2 && (
          <div>
            <div className="achievements">
              {achievements &&
                achievements.map((achievement) => (
                  <div className="achievement-item">
                    <a href={achievement.certificate} target="_blank">
                      <img src="../src/assets/doc-img.png" alt="certificate" />
                    </a>
                    <h4>{achievement.title}</h4>
                    <p>{formatDate(achievement.issue_date)}</p>
                  </div>
                ))}
            </div>
          </div>
        )}
        {value === 3 && (
          <div>
            <div className="projects">
              {projects &&
                projects.map((project) => (
                  <div className="project-item">
                    <h3>
                      <b>Title</b> - {project.title}
                    </h3>
                    <p>
                      <b>Description</b> - {project.description}
                    </p>
                    <p>
                      <b>GitHub Link</b> - {project.github_link}
                    </p>
                    <p>
                      <b>Hosted Link</b> - {project.hosted_link}
                    </p>
                    <p>
                      <b>Documentation</b> -{" "}
                      <ol>
                        {project.documentation.map((doc, index) => (
                          <li>
                            <a
                              href={doc}
                              target="_blank"
                              style={{ marginRight: "10px" }}
                            >
                              Document {index + 1}
                            </a>
                          </li>
                        ))}
                      </ol>
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentView;
