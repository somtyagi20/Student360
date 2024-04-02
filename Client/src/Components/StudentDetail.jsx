import React, { useState } from 'react';
import { InputAdornment, TextField, IconButton, Typography, Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';

function StudentDetail() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDownload = (event) => {
    // Handle download functionality
  };

  const handleAddmarks = (event) => {
    // Handle add marks functionality
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: 4}}>
      <Typography variant="body1" color="black" fontSize={32} fontWeight={500} fontFamily="Lexend">
        Student Details
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 3 }}>
        <TextField
          
          id="outlined-start-adornment"
          sx={{ width: { xs: '100%', sm: '400px' }, height: '30px', marginRight: 2 }}
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                sx={{ 
                '&:hover': {
                  color: '#171A1FFF',
                }
              }}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            placeholder: 'Search...',
          }}
        />

        <Box sx={{ display: 'flex',marginRight:4 }}>
          <Button
            variant="text"
            sx={{
              border: 0,
              marginLeft: 2,
              backgroundColor: 'inherit',
              height: '36px',
              color: '#171A1FFF',
            }}
            onClick={handleDownload}
            startIcon={<DownloadIcon />}
          >
            Download Student List
          </Button>
          <Button
            variant="text"
            sx={{
              border: 0,
              marginLeft: 2,
              backgroundColor: 'inherit',
              height: '36px',
              color: '#171A1FFF',
            }}
            onClick={handleAddmarks}
            startIcon={<AddIcon />}
          >
            Add marks
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default StudentDetail;
