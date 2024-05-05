import * as React from 'react';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AdmindataDisplay() {
  const [age, setAge] = useState('');
  const [students, setStudents] = useState({});

  const handleChange = (event, year) => {
    const selectedSection = event.target.value;
    setAge(selectedSection);
    // Simulate fetching students data based on the selected section
    const fetchedStudents = fetchStudentsData(year, selectedSection);
    setStudents({ ...students, [year]: fetchedStudents });
  };

  // Simulated function to fetch students data
  const fetchStudentsData = (year, section) => {
    // Replace this with your actual logic to fetch students data from your backend
    // For now, let's just return a mock data
    return ['Student 1', 'Student 2', 'Student 3', 'Student 4'];
  };

  return (
    <div
      sx={{
        marginBottom: '20px',
        marginRight: '20px',
        marginLeft: '20px',
      }}
    >
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Second Year
        </AccordionSummary>
        <AccordionDetails>
          <Accordion>
            <AccordionSummary>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Section
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={age}
                  onChange={(event) => handleChange(event, 'secondYear')}
                  label="Select Section"
                >
                  <MenuItem value={10}>CS-1</MenuItem>
                  <MenuItem value={20}>CS-2</MenuItem>
                  <MenuItem value={30}>CS-3</MenuItem>
                  <MenuItem value={40}>CS-4</MenuItem>
                </Select>
              </FormControl>
            </AccordionSummary>
            <AccordionDetails>
              {students['secondYear'] &&
                students['secondYear'].map((student, index) => (
                  <div key={index}>{student}</div>
                ))}
            </AccordionDetails>
            <AccordionActions>
              <Button>Delete</Button>
              <Button>Add</Button>
            </AccordionActions>
          </Accordion>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Third Year
        </AccordionSummary>
        <AccordionDetails>
          <Accordion>
            <AccordionSummary>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Section
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={age}
                  onChange={(event) => handleChange(event, 'thirdyear')}
                  label="Select Section"
                >
                  <MenuItem value={10}>CS-1</MenuItem>
                  <MenuItem value={20}>CS-2</MenuItem>
                  <MenuItem value={30}>CS-3</MenuItem>
                  <MenuItem value={40}>CS-4</MenuItem>
                </Select>
              </FormControl>
            </AccordionSummary>
            <AccordionDetails>
              {students['thirdyear'] &&
                students['thirdyear'].map((student, index) => (
                  <div key={index}>{student}</div>
                ))}
            </AccordionDetails>
            <AccordionActions>
              <Button>Delete</Button>
              <Button>Add</Button>
            </AccordionActions>
          </Accordion>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        Fourth Year
        </AccordionSummary>
        <AccordionDetails>
          <Accordion>
            <AccordionSummary>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Section
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={age}
                  onChange={(event) => handleChange(event, 'fourthyear')}
                  label="Select Section"
                >
                  <MenuItem value={10}>CS-1</MenuItem>
                  <MenuItem value={20}>CS-2</MenuItem>
                  <MenuItem value={30}>CS-3</MenuItem>
                  <MenuItem value={40}>CS-4</MenuItem>
                </Select>
              </FormControl>
            </AccordionSummary>
            <AccordionDetails>
              {students['fourthyear'] &&
                students['fourthyear'].map((student, index) => (
                  <div key={index}>{student}</div>
                ))}
            </AccordionDetails>
            <AccordionActions>
              <Button>Delete</Button>
              <Button>Add</Button>
            </AccordionActions>
          </Accordion>
        </AccordionDetails>
      </Accordion>

      
    </div>
  );
}
