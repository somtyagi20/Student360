import { useState } from "react";
import { Button } from "@mui/material";
import "./PersonalForm.css";
const PersonalForm = () => {
  return (
    <div className="personal-form">
      <h1>Enter Your Personal Details</h1>
      <form>
        <label htmlFor="Contact">Contact</label>
        <input type="number" name="Contact" id="Contact" />

        <label htmlFor="Department">Department</label>
        <select name="Department" id="">
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="ME">ME</option>
          <option value="CE">CE</option>
          <option value="EE">EE</option>
        </select>

        <label htmlFor="DOB">DOB</label>
        <input type="date" name="DOB" id="DOB" />

        <label htmlFor="CurrentAddress">Current Address</label>
        <input type="text" name="CurrentAddress" id="CurrentAddress" />

        <label htmlFor="PermanentAddress">Permanent Address</label>
        <input type="text" name="PermanentAddress" id="PermanentAddress" />

        <label htmlFor="CareerGoals">Career Goals</label>
        <input type="text" name="CareerGoals" id="CareerGoals" />

        <label htmlFor="Skills">Skills</label>
        <input type="text" name="Skills" id="Skills" />

        <Button
          variant="contained"
          color="primary"
          className="submit-button"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PersonalForm;
