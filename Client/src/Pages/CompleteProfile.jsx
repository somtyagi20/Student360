import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import "./CompleteProfile.css";
import PersonalForm from "../Components/PersonalForm";

const steps = ["Form 1", "Form 2", "Form 3"]; // Add your form names here

const CompleteProfile = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="form-container">
      <h1>Complete Your Profile</h1>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <h2>All steps completed</h2>
          </div>
        ) : (
          <div
            style={{
              padding: "20px",
              paddingTop: "40px",
            }}
          >
            {activeStep == 0 ? (
              <PersonalForm />
            ) : (
              <h2>Form {activeStep + 1}</h2>
            )}
            <div className="button-container">
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompleteProfile;
