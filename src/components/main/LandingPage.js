import React from 'react';
import Sidebar from '../templates/Sidebar';
import Dashboard from '../templates/Dashboard';
import { Box } from '@mui/material';

const LandingPage = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f0f4f8' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, padding: '2rem', marginLeft: '250px', overflow: 'auto' }}>
        <Dashboard />
      </Box>
    </Box>
  );
};

export default LandingPage;
