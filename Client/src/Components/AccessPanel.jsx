import React from "react";
import axios from "axios";
import { useState } from "react";
import { Icon, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { Button } from "@mui/material";

const AccessPanel = ({ setAccessPanelVisible }) => {
  const [faculty, setFaculty] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [facultyID, setFacultyID] = useState("");
  const [Class, setClass] = useState("");
  const getFaculty = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/admin/getFaculty`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setFaculty(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const giveAccess = async (id, Class) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/admin/giveAccess?id=${id}`,
        {
          class: Class,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setFormVisible(false);
      getFaculty();
      setClass("");
      setFacultyID("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFaculty();
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        zIndex: 1000,
        width: "content-width",
        minWidth: "300px",
        padding: "30px",
        marginTop: "65px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
        }}
        onClick={() => setAccessPanelVisible(false)}
      >
        <CloseIcon />
      </IconButton>
      <h1>Manage Access</h1>
      <table>
        <tr>
          <th>
            <h3>Faculty Name</h3>
          </th>
          <th>
            <h3>Current Class</h3>
          </th>
          <th>
            <h3>Access</h3>
          </th>
        </tr>

        {faculty &&
          faculty.map((faculty) => (
            <tr key={faculty._id}>
              <td>
                <h3>{faculty.name}</h3>
              </td>
              <td>
                <h3>{faculty.accessed_class.join(", ")}</h3>
              </td>
              <td>
                <Button
                  variant="contained"
                  onClick={() => {
                    setFormVisible(true);
                    setFacultyID(faculty._id);
                  }}
                >
                  Give Access
                </Button>
              </td>
            </tr>
          ))}
      </table>
      {formVisible && (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            zIndex: 1000,
            width: "content-width",
            minWidth: "200px",
            padding: "30px",
            marginTop: "65px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <input
            value={Class}
            onChange={(e) => {
              setClass(e.target.value);
            }}
            type="text"
            placeholder="Enter class"
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              giveAccess(facultyID, Class);
            }}
          >
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};

export default AccessPanel;
