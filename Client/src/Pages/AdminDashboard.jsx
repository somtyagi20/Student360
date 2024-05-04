import { Box } from '@mui/material';
import Navbar from '../Components/Navbar';
import AdminInfoCard from '../Components/AdminInfoCard';
import "./FacultyDashboard.css";
import AdmindataDisplay from '../Components/AdmindataDisplay';


const FacultyDashboard = () => {
    return ( <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '65px',gap:5 }}> {/* Container */}
    <Navbar/>
    <AdminInfoCard /> 
    <AdmindataDisplay/>
    <div
    style={{
        padding: '20px',
    }}
    > 
    </div>
  </Box> );
}
 
export default FacultyDashboard;