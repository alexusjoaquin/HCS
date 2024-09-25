// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, Paper, CircularProgress, Alert } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import apiconfig from '../../api/apiconfig';
import axios from 'axios';

const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28', '#FF6384'];

const Dashboard = () => {
  const [totalPatients, setTotalPatients] = useState(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState(null);
  const [availableDoctors, setAvailableDoctors] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
  
        // Fetch Total Patients
        const patientsResponse = await axios.get(apiconfig.patients.getAll);
        console.log('Patients Response:', patientsResponse.data);
        if (!patientsResponse.data || !Array.isArray(patientsResponse.data.data)) {
          throw new Error('Invalid patients response');
        }
        setTotalPatients(patientsResponse.data.data.length);
  
        // Fetch Upcoming Appointments
        const appointmentsResponse = await axios.get(apiconfig.appointments.getAll);
        console.log('Appointments Response:', appointmentsResponse.data);
        if (!appointmentsResponse.data || !Array.isArray(appointmentsResponse.data.data)) {
          throw new Error('Invalid appointments response');
        }
        const upcoming = appointmentsResponse.data.data.filter((appointment) => {
          // Convert to valid date format if necessary
          const appointmentDate = new Date(appointment.Date);
          if (isNaN(appointmentDate.getTime())) {
            console.error('Invalid Date:', appointment.Date);
            return false; // Skip invalid dates
          }
          return appointmentDate >= new Date();
        });
        setUpcomingAppointments(upcoming.length);
  
        // Fetch Available Doctors
        const doctorsResponse = await axios.get(apiconfig.users.getUsers);
        console.log('Doctors Response:', doctorsResponse.data);
        const doctorsUsernames = doctorsResponse.data.usernames || [];
        // Assuming all doctors in `usernames` array are available
        setAvailableDoctors(doctorsUsernames.length);
  
        // Fetch Recent Patient Activities
        const activitiesResponse = await axios.get(apiconfig.medical.getAll);
        console.log('Activities Response:', activitiesResponse.data);
        if (!activitiesResponse.data || !Array.isArray(activitiesResponse.data.data)) {
          throw new Error('Invalid activities response');
        }
  
        // Process recent activities and handle date formatting
        const recentActivitiesData = activitiesResponse.data.data.slice(0, 5).map(activity => {
          // Convert to valid date format or handle invalid dates
          const activityDate = new Date(activity.date);
          if (isNaN(activityDate.getTime())) {
            console.error('Invalid Date:', activity.date);
            return {
              ...activity,
              date: 'Invalid Date', // Handle invalid date
            };
          }
          return {
            ...activity,
            date: activityDate.toLocaleString(), // Convert date to a readable format
          };
        });
        
        setRecentActivities(recentActivitiesData);
  
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err.response ? err.response.data : err.message);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  

  // Sample data for charts (Replace with actual data as needed)
  const patientAgeDistribution = [
    { ageGroup: '0-18', count: 200 },
    { ageGroup: '19-35', count: 500 },
    { ageGroup: '36-50', count: 300 },
    { ageGroup: '51+', count: 234 },
  ];

  const doctorAvailability = [
    { name: 'Available', value: availableDoctors },
    { name: 'Busy', value: 24 - availableDoctors }, // Assuming total doctors = 24; adjust as necessary
  ];

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          bgcolor: '#f0f4f8',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          bgcolor: '#f0f4f8',
          padding: '2rem',
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

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
        {/* Total Patients */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              padding: '1.5rem',
              textAlign: 'center',
              color: '#00796b',
              fontWeight: 'bold',
              bgcolor: '#e0f7fa',
              boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
              borderRadius: '12px',
            }}
          >
            <Typography variant="h6">Total Patients</Typography>
            <Typography variant="h3" sx={{ marginTop: '0.5rem' }}>
              {totalPatients}
            </Typography>
          </Paper>
        </Grid>
        {/* Upcoming Appointments */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              padding: '1.5rem',
              textAlign: 'center',
              color: '#00796b',
              fontWeight: 'bold',
              bgcolor: '#e0f7fa',
              boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
              borderRadius: '12px',
            }}
          >
            <Typography variant="h6">Upcoming Appointments</Typography>
            <Typography variant="h3" sx={{ marginTop: '0.5rem' }}>
              {upcomingAppointments}
            </Typography>
          </Paper>
        </Grid>
        {/* Available Doctors */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              padding: '1.5rem',
              textAlign: 'center',
              color: '#00796b',
              fontWeight: 'bold',
              bgcolor: '#e0f7fa',
              boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
              borderRadius: '12px',
            }}
          >
            <Typography variant="h6">Available Doctors</Typography>
            <Typography variant="h3" sx={{ marginTop: '0.5rem' }}>
              {availableDoctors}
            </Typography>
          </Paper>
        </Grid>
        {/* Recent Patient Activity */}
        <Grid item xs={12}>
          <Paper
            sx={{
              padding: '1.5rem',
              color: '#00796b',
              fontWeight: 'bold',
              bgcolor: '#ffffff',
              boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
              borderRadius: '12px',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Recent Patient Activity
            </Typography>
            {recentActivities.length > 0 ? (
              <Grid container spacing={2}>
                {recentActivities.map((activity, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Paper
                      sx={{
                        padding: '1rem',
                        bgcolor: '#f9f9f9',
                        borderRadius: '8px',
                        boxShadow: '0px 2px 5px rgba(0,0,0,0.05)',
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {activity.patientName}
                      </Typography>
                      <Typography variant="body2">{activity.activityType}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(activity.date).toLocaleString()}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1">No recent activities.</Typography>
            )}
          </Paper>
        </Grid>
        {/* Patient Distribution Chart */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: '1.5rem',
              bgcolor: '#ffffff',
              boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
              borderRadius: '12px',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Patient Distribution by Age Group
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={patientAgeDistribution}>
                <XAxis dataKey="ageGroup" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#00796b" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        {/* Doctor Availability Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: '1.5rem',
              bgcolor: '#ffffff',
              boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
              borderRadius: '12px',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Doctor Availability
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={doctorAvailability}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#82ca9d"
                  label
                >
                  {doctorAvailability.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
