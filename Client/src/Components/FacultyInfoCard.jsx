import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UpdateFaculty from "./UpdateFaculty";

const FacultyInfoCard = () => {
  const { user, setUser } = useContext(UserContext);
  const [formVisible, setFormVisible] = useState(false);
  return (
    <>
      <Card
        sx={{
          borderRadius: "5px",
          background: "linear-gradient(to right, #f5f5f5, #cdacff, #6716e1)",
          boxShadow: "0 0 8px 0 #000",
          padding: "10px",
        }}
      >
        {/* Use a container for content within the card with appropriate spacing */}
        <CardContent
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {/* Use Stack for vertical alignment and horizontal centering */}
          {/* <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "130px",
              height: "130px",
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: "0 0 8px 0 #000",
            }}
          >
            <img src={user && user.profile_pic} alt="no" />
          </div> */}
          <Stack direction="column" spacing={1.5}>
            <Typography
              variant="h5"
              sx={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#171A1FFF",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  color: "#6716e1",
                }}
              >
                Faculty Name
              </span>{" "}
              - {user && user.name}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#171A1FFF",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  color: "#6716e1",
                }}
              >
                Department
              </span>{" "}
              - {user && user.department}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#171A1FFF",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  color: "#6716e1",
                }}
              >
                Assigned Class
              </span>{" "}
              -{" "}
              {user && user.accessed_class?.length > 0
                ? user.accessed_class
                : "No Class Assigned"}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
      <IconButton
        sx={{
          position: "fixed",
          top: "70px",
          right: "10px",
          color: "black",

          background: "#f5f5f5",
          borderRadius: "50%",

          ":hover": {
            color: "white",
            background: "#171A1FFF",
            boxShadow: "0 0 4px 0 #000",
          },

          zIndex: 1,
        }}
        onClick={() => {
          setFormVisible(true);
        }}
      >
        <EditIcon />
      </IconButton>
      {formVisible && <UpdateFaculty setFormVisible={setFormVisible} />}
    </>
  );
};

export default FacultyInfoCard;
