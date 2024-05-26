import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Projects.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [updateProjectVisible, setUpdateProjectVisible] = useState(false);
  const [uploadProjectVisible, setUploadProjectVisible] = useState(false);
  const [projectID, setProjectID] = useState("");
  const [files, setFiles] = useState([]);
  const fileInput = useRef();
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    setFiles(selectedFiles);
  };

  const deleteProject = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/student/deleteProject?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        console.log(response.data.message);
        getProjects();
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  const uploadProject = async (project) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/student/uploadProject`,
        project,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        console.log(response.data.message);
        setUploadProjectVisible(false);
        setFiles([]);
        getProjects();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateProject = async (project) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/student/updateProject?id=${projectID}`,
        project,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        console.log(response.data.message);
        setUpdateProjectVisible(false);
        setFiles([]);
        setProjectID("");
        getProjects();
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
          flexWrap: "wrap",
          padding: "20px",
          minWidth: "300px",
        }}
      >
        {projects &&
          projects.map((project) => (
            <div
              key={project._id}
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                margin: "10px",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                width: "fit-content",
                border: "1px solid #e0e0e0",
                borderStyle: "groove",
              }}
            >
              <IconButton
                sx={{
                  marginLeft: "auto",
                }}
              >
                <DeleteIcon
                  onClick={() => {
                    deleteProject(project._id);
                  }}
                  sx={{ color: "lightgrey" }}
                />
              </IconButton>
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
              <button
                style={{
                  backgroundColor: "#634dd1",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  display: "block",
                  margin: "10px auto",
                }}
                onClick={() => {
                  setUpdateProjectVisible(true);
                  setProjectID(project._id);
                }}
              >
                Update
              </button>
            </div>
          ))}
      </div>
      <button
        onClick={() => setUploadProjectVisible(true)}
        style={{
          backgroundColor: "#634dd1",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "1rem",
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
      >
        Upload Project
      </button>
      {uploadProjectVisible && (
        <form
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            mt: "50px",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e0e0e0",
            borderStyle: "groove",
            width: "fit-content",
            minWidth: "300px",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            files &&
              files.forEach((file, index) => {
                formData.append("documentation", file);
              });
            uploadProject(formData);
          }}
        >
          <input type="text" name="title" placeholder="Title" />
          <input type="text" name="description" placeholder="Description" />
          <input type="text" name="github_link" placeholder="GitHub Link" />
          <input type="text" name="hosted_link" placeholder="Hosted Link" />
          <label htmlFor="1" className="file-label">
            Upload Documentation {files.length > 0 && `(${files.length})`}
          </label>
          <input
            type="file"
            id="1"
            onChange={(e) => {
              handleFileChange(e);
            }}
            ref={fileInput}
            multiple
          />
          <div>
            {files.map((file, index) => (
              <p key={index}>{file.name}</p>
            ))}
          </div>

          <input
            style={{
              display: "block",
              margin: "10px auto",
              padding: "10px 20px",
              backgroundColor: "#634dd1",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
            type="submit"
            value="Submit"
          />
        </form>
      )}
      {updateProjectVisible && (
        <form
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            mt: "50px",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e0e0e0",
            borderStyle: "groove",
            width: "fit-content",
            minWidth: "300px",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            files &&
              files.forEach((file, index) => {
                formData.append("documentation", file);
              });

            updateProject(formData);
          }}
        >
          <input type="text" name="title" placeholder="Title" />
          <input type="text" name="description" placeholder="Description" />
          <input type="text" name="github_link" placeholder="GitHub Link" />
          <input type="text" name="hosted_link" placeholder="Hosted Link" />
          <label htmlFor="1" className="file-label">
            Upload Documentation {files.length > 0 && `(${files.length})`}
          </label>
          <input
            type="file"
            id="1"
            onChange={(e) => {
              handleFileChange(e);
            }}
            ref={fileInput}
            multiple
          />
          <div>
            {files.map((file, index) => (
              <p key={index}>{file.name}</p>
            ))}
          </div>

          <input
            style={{
              display: "block",
              margin: "10px auto",
              padding: "10px 20px",
              backgroundColor: "#634dd1",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
            type="submit"
            value="Submit"
          />
        </form>
      )}
    </div>
  );
};

export default Projects;
