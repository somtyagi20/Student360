import { Box } from '@mui/material';
import Navbar from '../Components/Navbar';
import FacultyInfoCard from '../Components/FacultyInfoCard';
import StudentDetail from '../Components/StudentDetail';
import StudentTable from '../Components/StudentTable';
import "./FacultyDashboard.css";

const FacultyDashboard = () => {
    return ( <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '65px',gap:5 }}> {/* Container */}
    <Navbar/>
    <FacultyInfoCard /> 
    <div
    style={{
        padding: '20px',
    }}
    > 
    <StudentDetail />
    <StudentTable/>
    </div>
  </Box> );
}
 
export default FacultyDashboard;