import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Projects.css";
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const getProjects = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/student/getProject`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        console.log(response.data.data);
        setProjects(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProjects();
  }, []);
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {projects &&
          projects.map((project) => (
            <div
              key={project._id}
              style={{
                backgroundColor: "#fff",
                padding: "14px",
                margin: "10px",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                width: "fit-content",
                border: "1px solid #e0e0e0",
                borderStyle: "groove",
              }}
            >
              <h2
                style={{
                  color: "#634dd1",
                  textTransform: "capitalize",
                }}
              >
                {project.title}
              </h2>
              <p>
                <b>Description - </b>
                {project.description}
              </p>
              <p>
                <b>GitHub Link - </b>
                {project.github_link}
              </p>
              <p>
                <b>Hosted Link - </b>
                {project.hosted_link}
              </p>
              <p
                style={{
                  display: "inline",
                }}
              >
                <b>Documentation - </b>
              </p>
              <ol>
                {project.documentation &&
                  project.documentation.map((doc, index) => (
                    <li key={index}>
                      <a href={doc} target="_blank">
                        Link
                      </a>
                    </li>
                  ))}
              </ol>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Projects;
