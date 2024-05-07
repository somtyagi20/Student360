import { useState } from "react";
const AcademicDetails = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  return (
    <div>
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
      {isFormVisible && <div></div>}
    </div>
  );
};

export default AcademicDetails;
