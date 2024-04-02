import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// Assuming you're using an icon for settings, like 'SettingsIcon' from Material UI icons

import LogoutIcon from '@mui/icons-material/Logout';

const Logosvg = ( // Assuming Logosvg is a valid SVG content ) => (
  <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    {/* ... Your SVG content here ... */}
  </svg>
);

const TextStyle = {
  fontWeight: 'bold',
  color: '#379AE6FF',
  fontSize: '16px',
  fontFamily: 'Lexend',
};

function Navbar() {
  return (
    <>
      <AppBar position="fixed" style={{ width: '100%', top: 0, backgroundColor: '#FFFFFFFF' }}>
        <Toolbar style={{ minHeight: 64, display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <Toolbar>
            <img src="src/assets/Image 116.png" alt="" width={"30px"} />
            <img src="src/assets/स्टूडेंट360.png" alt="" height={"25px"} />
          </Toolbar>
          </div>
          <IconButton color="black" aria-label="Settings">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
