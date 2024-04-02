import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(EnrollmentNo, StudentName, Class) {
  return { EnrollmentNo, StudentName, Class};
}

const rows = [
  createData('Student Name 1', 159, 6.0),
  
];

export default function StudentTable() {
  return (
    <TableContainer component={Paper} sx={{
      marginTop: 5,
    }
    }>
      <Table sx={{width:'100%' }} aria-label="simple table">
        <TableHead>
          <TableRow
          sx={{
            backgroundColor: 'grey',
          }}>
            <TableCell style={{ fontWeight: '650' }}>Enrollment Number</TableCell>
<TableCell align="right" style={{ fontWeight: '650' }}>Student Name</TableCell>
<TableCell align="right" style={{ fontWeight: '650' }}>Class</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.EnrollmentNo}
              </TableCell>
              <TableCell align="right">{row.StudentName}</TableCell>
              <TableCell align="right">{row.Class}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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