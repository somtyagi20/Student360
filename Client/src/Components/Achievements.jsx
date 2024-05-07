import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Achievements.css";
import { CircularProgress } from "@mui/material";
import { formatDate } from "../Config/logics";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleUpdateClick = () => {
    setFormVisible(true);
  };

  const updateAchievement = (id, data) => {
    try {
      axios
        .post(
          `http://localhost:3000/api/v1/student/updateExtraCurricular?id=${id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data.message);
          setUpdate(false);
          getAchievements();
        });
    } catch (error) {
      setUpdate(false);
      console.log(error);
    }
  };
  const getAchievements = () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/api/v1/student/getExtraCurricular", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.statusCode === 200) {
          const data = response.data.data;
          setAchievements(data);
          setLoading(false);
          console.log(data);
        } else {
          console.log(response.data.message);
        }
      });
  };

  const addAchievements = (data) => {
    console.log(data);
    axios
      .post(
        "http://localhost:3000/api/v1/student/uploadExtraCurricular",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.data.statusCode === 200) {
          console.log(response.data.message);
          getAchievements();
          setFormVisible(false);
        } else {
          console.log(response.data.message);
        }
      });
  };
  useEffect(() => {
    getAchievements();
  }, []);
  return (
    <div>
      {loading ? (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            mt: "50px",
          }}
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          {achievements ? (
            achievements.map((achievement) => (
              <div
                key={achievement._id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "20px",
                  padding: "10px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "5px",
                  boxShadow: "0 0 10px #e0e0e0",
                  width: "300px",
                }}
              >
                <a href={achievement.certificate} target="_blank">
                  <img src="../src/assets/doc-img.png" alt="Certificate" />
                </a>

                <h3>Title: {achievement.title}</h3>
                <p>Issued Date: {formatDate(achievement.issue_date)}</p>
                <button
                  onClick={() => {
                    setUpdate(true);
                  }}
                  style={{
                    backgroundColor: "#634dd1",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  Update
                </button>
                {update && (
                  <div className="modal">
                    <div className="modal-content">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const data = new FormData(e.target);
                          for (let pair of data.entries()) {
                            console.log(pair[0] + ", " + pair[1]);
                          }
                          updateAchievement(achievement._id, data);
                        }}
                      >
                        <label className="file-label" htmlFor="certificate">
                          Upload File
                        </label>
                        <input
                          name="certificate"
                          type="file"
                          id="certificate"
                        />

                        <label htmlFor="title">Title:</label>
                        <input
                          name="title"
                          type="text"
                          placeholder="Title"
                          id="title"
                        />

                        <label htmlFor="issue_date">Date:</label>
                        <input name="issue_date" type="date" id="issue_date" />

                        <button type="submit">Submit</button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <h2>Loading...</h2>
          )}
          {achievements.length === 0 && <h2>No Achievements</h2>}
        </div>
      )}
      {isFormVisible ? (
        <div className="modal">
          <div className="modal-content">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.target);
                addAchievements(data);
              }}
            >
              <label className="file-label" htmlFor="certificate">
                Upload File
              </label>
              <input name="certificate" type="file" id="certificate" />

              <label htmlFor="title">Title:</label>
              <input name="title" type="text" placeholder="Title" id="title" />

              <label htmlFor="issue_date">Date:</label>
              <input name="issue_date" type="date" id="issue_date" />

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      ) : (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: "100",
          }}
        >
          <button
            onClick={handleUpdateClick}
            style={{
              backgroundColor: "#634dd1",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            + Add Achievements
          </button>
        </div>
      )}
    </div>
  );
};

export default Achievements;
