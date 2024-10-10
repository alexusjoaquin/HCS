// src/components/Menu/Settings/Settings.js
import React from 'react';
import {
  Box,
  Typography,
  Divider,
} from '@mui/material';
import Sidebar from '../../templates/Sidebar'; // Adjust the path as necessary
import Register from '../../auth/Register'; // Adjust the path as necessary

const Settings = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          padding: '2rem',
          marginLeft: '250px', // Assuming Sidebar width is 250px
          overflowY: 'auto',
          paddingTop: '100px',
        }}
      >

        {/* Register Component */}
        <Register />
      </Box>
    </Box>
  );
};

export default Settings;
