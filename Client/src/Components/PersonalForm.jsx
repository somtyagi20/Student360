import { useState, useContext } from "react";
import { Button } from "@mui/material";
import "./PersonalForm.css";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const PersonalForm = ({ setFormVisible }) => {
  const { user } = useContext(UserContext);
  const [contact, setContact] = useState(user.contact_no);
  const [department, setDepartment] = useState(user.department);
  const [classs, setClass] = useState(user.class);
  const [dob, setDob] = useState(user.dob);
  const [currentAddress, setCurrentAddress] = useState(user.current_address);
  const [permanentAddress, setPermanentAddress] = useState(
    user.permanent_address
  );
  const [careerGoals, setCareerGoals] = useState(user.career_goals);
  const [skills, setSkills] = useState(user.skills);

  const handleSubmit = (event) => {
    event.preventDefault();
    // axios.post(
    //   "http://localhost:3000/api/v1/student/update",
    //   {
    //     contact_no: contact,
    //     department,
    //     class: classs,
    //     dob,
    //     current_address: currentAddress,
    //     permanent_address: permanentAddress,
    //     career_goals: careerGoals,
    //     skills,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //   }
    // );
    console.log(user);
    setFormVisible(false);
  };

  return (
    <div className="personal-form">
      <h1>Enter Your Personal Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Contact">Contact</label>
          <input
            type="number"
            name="Contact"
            id="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <label htmlFor="Department">Department</label>
          <select
            name="Department"
            id=""
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="ME">ME</option>
            <option value="CE">CE</option>
            <option value="EE">EE</option>
          </select>

          <label htmlFor="Class">Class</label>
          <input
            type="text"
            name="Class"
            id="Class"
            value={classs}
            onChange={(e) => setClass(e.target.value)}
          />

          <label htmlFor="DOB">DOB</label>
          <input
            type="date"
            name="DOB"
            id="DOB"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="CurrentAddress">Current Address</label>
          <input
            type="text"
            name="CurrentAddress"
            id="CurrentAddress"
            value={currentAddress}
            onChange={(e) => setCurrentAddress(e.target.value)}
          />

          <label htmlFor="PermanentAddress">Permanent Address</label>
          <input
            type="text"
            name="PermanentAddress"
            id="PermanentAddress"
            value={permanentAddress}
            onChange={(e) => setPermanentAddress(e.target.value)}
          />

          <label htmlFor="CareerGoals">Career Goal</label>
          <select
            name="CareerGoals"
            id="CareerGoals"
            value={careerGoals}
            onChange={(e) => setCareerGoals(e.target.value)}
          >
            <option value="Placement">Placement</option>
            <option value="Higher Studies">Higher Studies</option>
            <option value="Entrepreneur">Entrepreneur</option>
          </select>

          <label htmlFor="Skills">Skills</label>
          <input
            type="text"
            name="Skills"
            id="Skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PersonalForm;
