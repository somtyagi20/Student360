import axios from "axios";
import { useEffect, useState } from "react";
import "./AcademicDetails.css";
import { CircularProgress } from "@mui/material";
const AcademicDetails = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [highSchoolData, setHighSchoolData] = useState({});
  const [intermediateData, setIntermediateData] = useState({});
  const [graduationData, setGraduationData] = useState({});
  const [loading, setLoading] = useState(false);
  const getAcademicDetails = () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/api/v1/student/getAcademicInfo", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        setHighSchoolData(data.highSchool);
        setIntermediateData(data.intermediate);
        setGraduationData(data.graduation);
        setSGPA(data.sgpa);
        setLoading(false);
        console.log(data);
      });
  };
  useEffect(() => {
    getAcademicDetails();
  }, [isFormVisible]);

  const [SGPA, setSGPA] = useState([]);
  const [semesterSGPA, setSemesterSGPA] = useState("");
  const [currentSemester, setCurrentSemester] = useState("");
  const [highSchoolName, setHighSchoolName] = useState(
    highSchoolData ? highSchoolData.name : ""
  );
  const [highSchoolAddress, setHighSchoolAddress] = useState(
    highSchoolData ? highSchoolData.address : ""
  );
  const [highSchoolBoard, setHighSchoolBoard] = useState(
    highSchoolData ? highSchoolData.board_of_education : ""
  );
  const [highSchoolPercentage, setHighSchoolPercentage] = useState(
    highSchoolData ? highSchoolData.percentage : ""
  );
  const [highSchoolYear, setHighSchoolYear] = useState(
    highSchoolData ? highSchoolData.passing_year : ""
  );
  const [intermediateName, setIntermediateName] = useState(
    intermediateData.name ? intermediateData.name : ""
  );
  const [intermediateAddress, setIntermediateAddress] = useState(
    intermediateData.address ? intermediateData.address : ""
  );
  const [intermediateBoard, setIntermediateBoard] = useState(
    intermediateData.board_of_education
      ? intermediateData.board_of_education
      : ""
  );
  const [intermediatePercentage, setIntermediatePercentage] = useState(
    intermediateData.percentage ? intermediateData.percentage : ""
  );
  const [intermediateYear, setIntermediateYear] = useState(
    intermediateData.passing_year ? intermediateData.passing_year : ""
  );
  const [CurrentYear, setCurrentYear] = useState(
    graduationData.current_year ? graduationData.current_year : ""
  );
  const [CGPA, setCGPA] = useState(
    graduationData.cgpa ? graduationData.cgpa : ""
  );

  useEffect(() => {
    if (highSchoolData) {
      setHighSchoolName(highSchoolData.name || "");
      setHighSchoolAddress(highSchoolData.address || "");
      setHighSchoolBoard(highSchoolData.board_of_education || "");
      setHighSchoolPercentage(highSchoolData.percentage || "");
      setHighSchoolYear(highSchoolData.passing_year || "");
    }
  }, [highSchoolData]);

  useEffect(() => {
    if (intermediateData) {
      setIntermediateName(intermediateData.name || "");
      setIntermediateAddress(intermediateData.address || "");
      setIntermediateBoard(intermediateData.board_of_education || "");
      setIntermediatePercentage(intermediateData.percentage || "");
      setIntermediateYear(intermediateData.passing_year || "");
    }
  }, [intermediateData]);

  useEffect(() => {
    if (graduationData) {
      setCurrentYear(graduationData.current_year || "");
      setCGPA(graduationData.cgpa || "");
    }
  }, [graduationData]);

  const handleUpdateClick = () => {
    setFormVisible(true);
  };

  const handleGraduationSubmit = (e) => {
    e.preventDefault();
    axios.post(
      "http://localhost:3000/api/v1/student/updateGraduationDetails",
      {
        current_year: CurrentYear,
        cgpa: CGPA,
        sgpa: semesterSGPA,
        current_semester: currentSemester,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setFormVisible(false);
    getAcademicDetails();
  };

  const handleHighSchoolSubmit = (e) => {
    e.preventDefault();
    axios.post(
      "http://localhost:3000/api/v1/student/updateHighSchoolDetails",
      {
        name: highSchoolName,
        address: highSchoolAddress,
        board_of_education: highSchoolBoard,
        percentage: highSchoolPercentage,
        passing_year: highSchoolYear,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setFormVisible(false);
    getAcademicDetails();
  };

  const handleIntermediateSubmit = (e) => {
    e.preventDefault();
    axios.post(
      "http://localhost:3000/api/v1/student/updateIntermediateDetails",
      {
        name: intermediateName,
        address: intermediateAddress,
        board_of_education: intermediateBoard,
        percentage: intermediatePercentage,
        passing_year: intermediateYear,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setFormVisible(false);
    getAcademicDetails();
  };

  return (
    <div>
      {loading ? (
        <CircularProgress
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            mt: "50px",
          }}
        />
      ) : (
        <div>
          <div>
            <h2>High School Details:</h2>
            {highSchoolData && (
              <table>
                <tr>
                  <th>High School Name</th>
                  <th>Address</th>
                  <th>Board</th>
                  <th>Percentage</th>
                  <th>Year</th>
                </tr>
                <tr>
                  <td>{highSchoolData.name}</td>
                  <td>{highSchoolData.address}</td>
                  <td>{highSchoolData.board_of_education}</td>
                  <td>{highSchoolData.percentage}</td>
                  <td>{highSchoolData.passing_year}</td>
                </tr>
              </table>
            )}
          </div>
          <div>
            <h2>Intermediate School Details:</h2>
            {intermediateData && (
              <table>
                <tr>
                  <th>Intermediate School Name</th>
                  <th>Address</th>
                  <th>Board</th>
                  <th>Percentage</th>
                  <th>Year</th>
                </tr>
                <tr>
                  <td>{intermediateData.name}</td>
                  <td>{intermediateData.address}</td>
                  <td>{intermediateData.board_of_education}</td>
                  <td>{intermediateData.percentage}</td>
                  <td>{intermediateData.passing_year}</td>
                </tr>
              </table>
            )}
          </div>
          <div>
            <h2>Graduation Details:</h2>
            {graduationData && (
              <div>
                <table>
                  <tr>
                    <th>Current Year</th>
                    <th>CGPA</th>
                  </tr>
                  <tr>
                    <td>{graduationData.current_year}</td>
                    <td>{graduationData.cgpa}</td>
                  </tr>
                </table>
                <h2>SGPA:</h2>
                <table>
                  <tr>
                    <th>Semester</th>
                    <th>SGPA</th>
                  </tr>
                  {SGPA?.map((data) => (
                    <tr key={data._id}>
                      <td>{data.current_semester}</td>
                      <td>{data.sgpa}</td>
                    </tr>
                  ))}
                </table>
              </div>
            )}
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
        </div>
      )}
      {isFormVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Update Academic Details</h2>
            <form>
              <label>High School Name:</label>
              <input
                type="text"
                value={highSchoolName}
                onChange={(e) => setHighSchoolName(e.target.value)}
              />
              <label>Address:</label>
              <input
                type="text"
                value={highSchoolAddress}
                onChange={(e) => setHighSchoolAddress(e.target.value)}
              />
              <label>Board:</label>
              <input
                type="text"
                value={highSchoolBoard}
                onChange={(e) => setHighSchoolBoard(e.target.value)}
              />
              <label>Percentage:</label>
              <input
                type="text"
                value={highSchoolPercentage}
                onChange={(e) => setHighSchoolPercentage(e.target.value)}
              />
              <label>Year:</label>
              <input
                type="text"
                value={highSchoolYear}
                onChange={(e) => setHighSchoolYear(e.target.value)}
              />
              <button onClick={handleHighSchoolSubmit}>Submit</button>
            </form>

            <form>
              <label>Intermediate School Name:</label>
              <input
                type="text"
                value={intermediateName}
                onChange={(e) => setIntermediateName(e.target.value)}
              />
              <label>Address:</label>
              <input
                type="text"
                value={intermediateAddress}
                onChange={(e) => setIntermediateAddress(e.target.value)}
              />
              <label>Board:</label>
              <input
                type="text"
                value={intermediateBoard}
                onChange={(e) => setIntermediateBoard(e.target.value)}
              />
              <label>Percentage:</label>
              <input
                type="text"
                value={intermediatePercentage}
                onChange={(e) => setIntermediatePercentage(e.target.value)}
              />
              <label>Year:</label>
              <input
                type="text"
                value={intermediateYear}
                onChange={(e) => setIntermediateYear(e.target.value)}
              />
              <button onClick={handleIntermediateSubmit}>Submit</button>
            </form>

            <form>
              <label>Current Year:</label>
              <input
                type="text"
                value={CurrentYear}
                onChange={(e) => setCurrentYear(e.target.value)}
              />
              <label>CGPA:</label>
              <input
                type="text"
                value={CGPA}
                onChange={(e) => setCGPA(e.target.value)}
              />
              <label>Current Semester:</label>
              <input
                type="text"
                value={currentSemester}
                onChange={(e) => setCurrentSemester(e.target.value)}
              />
              <label>SGPA:</label>
              <input
                type="text"
                value={semesterSGPA}
                onChange={(e) => setSemesterSGPA(e.target.value)}
              />
              <button onClick={handleGraduationSubmit}>Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicDetails;
