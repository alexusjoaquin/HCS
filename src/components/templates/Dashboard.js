import React from 'react';
import { Typography, Box, Grid, Paper } from '@mui/material';

const Dashboard = () => {
  return (
    <Box
      sx={{
        padding: '2rem',
        flexGrow: 1,
        bgcolor: '#f0f4f8',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#00796b' }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              padding: '1.5rem',
              textAlign: 'center',
              color: '#00796b',
              fontWeight: 'bold',
              bgcolor: '#e0f7fa',
            }}
          >
            Total Patients
            <Typography variant="h3" sx={{ marginTop: '0.5rem' }}>
              1,234
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              padding: '1.5rem',
              textAlign: 'center',
              color: '#00796b',
              fontWeight: 'bold',
              bgcolor: '#e0f7fa',
            }}
          >
            Upcoming Appointments
            <Typography variant="h3" sx={{ marginTop: '0.5rem' }}>
              56
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              padding: '1.5rem',
              textAlign: 'center',
              color: '#00796b',
              fontWeight: 'bold',
              bgcolor: '#e0f7fa',
            }}
          >
            Available Doctors
            <Typography variant="h3" sx={{ marginTop: '0.5rem' }}>
              24
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            sx={{
              padding: '1.5rem',
              color: '#00796b',
              fontWeight: 'bold',
              bgcolor: '#ffffff',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Recent Patient Activity
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus
              ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
