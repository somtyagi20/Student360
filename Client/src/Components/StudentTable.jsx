import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  InputAdornment,
  TextField,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";

// function createData(EnrollmentNo, StudentName, Class) {
//   return { EnrollmentNo, StudentName, Class };
// }

// const rows = [
//   {
//     EnrollmentNo: "123456",
//     StudentName: "John Doe",
//     Class: "10th",
//   },
//   {
//     EnrollmentNo: "123457",
//     StudentName: "Jane Doe",
//     Class: "10th",
//   },
// ];

export default function StudentTable({ Class }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleDownload = (event) => {
    // Handle download functionality
  };

  const handleAddmarks = (event) => {
    // Handle add marks functionality
  };
  const [rows, setRows] = useState([]);

  const getStudent = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/faculty/getstudent?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getStudents = async (Class) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/faculty/studentsbyclass?class=${Class}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data.data);
      setRows(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term === "") {
      getStudents(Class);
      setRows(rows);
    } else {
      setRows(
        rows.filter((row) =>
          row.name.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    getStudents(Class);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft: 4,
      }}
    >
      <Typography variant="body1" color="black" fontSize={30} fontWeight={500}>
        Student Details
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginTop: 3,
        }}
      >
        <TextField
          id="outlined-start-adornment"
          sx={{
            width: { xs: "100%", sm: "400px" },
            height: "30px",
            marginRight: 2,
          }}
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  sx={{
                    "&:hover": {
                      color: "#171A1FFF",
                    },
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            placeholder: "Search...",
          }}
        />

        <Box sx={{ display: "flex", marginRight: 4 }}>
          <Button
            variant="contained"
            sx={{
              border: 0,
              marginLeft: 2,
            }}
            onClick={handleDownload}
            startIcon={<DownloadIcon />}
          >
            Download Student List
          </Button>
          <Button
            variant="contained"
            sx={{
              border: 0,
              marginLeft: 2,
            }}
            onClick={handleAddmarks}
            startIcon={<AddIcon />}
          >
            Add marks
          </Button>
          <Button variant="contained" sx={{ marginLeft: 2 }}>
            Send Update Notification
          </Button>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          marginTop: 5,
        }}
      >
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "650" }}>
                Enrollment Number
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "650" }}>
                Student Name
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "650" }}>
                Class
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "650" }}>
                Click to view details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{row.enrollment_no}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.class}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          console.log(row);
                          getStudent(row._id);
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
//   ** Use this code while integrating backend **

// export default function StudentTable() {
//     const [rows, setRows] = useState([]);

//     useEffect(() => {
//       // Fetch data from backend API
//       fetch('your-backend-api-endpoint') // Replace 'your-backend-api-endpoint' with your actual backend API endpoint
//         .then(response => response.json())
//         .then(data => {
//           // Assuming data is an array of objects with properties: EnrollmentNo, StudentName, and Class
//           setRows(data);
//         })
//         .catch(error => {
//           console.error('Error fetching data:', error);
//         });
//     }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

//     return (
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Enrollment Number</TableCell>
//               <TableCell align="right">Student Name</TableCell>
//               <TableCell align="right">Class</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row, index) => (
//               <TableRow key={index}>
//                 <TableCell component="th" scope="row">
//                   {row.EnrollmentNo}
//                 </TableCell>
//                 <TableCell align="right">{row.StudentName}</TableCell>
//                 <TableCell align="right">{row.Class}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   }
