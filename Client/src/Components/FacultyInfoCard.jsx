import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Stack } from '@mui/material';


const FacultyInfoCard = ({FacultyName="Default",assignedClass="Default"}) => {
  return (
    <>
      <Card sx={{ borderRadius: '5px', backgroundColor: '#F3F4F6FF' }}>
        {/* Use a container for content within the card with appropriate spacing */}
        <CardContent sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
          {/* Use Stack for vertical alignment and horizontal centering */}
          <Stack direction="column" spacing={2}>
            <Typography variant="h5" sx={{ fontFamily: 'Lexend', fontSize: '24px', fontWeight: 700, color: '#171A1FFF', textAlign: 'center' }}>
              Faculty Name - {FacultyName}
            </Typography>
            <Typography variant="h5" sx={{ fontFamily: 'Lexend', fontSize: '24px', fontWeight: 700, color: '#171A1FFF', textAlign: 'center' }}>
              Assigned Class - {assignedClass}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default FacultyInfoCard;
