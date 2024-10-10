// src/components/templates/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Paper,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ElderlyIcon from '@mui/icons-material/Elderly';
import SecurityIcon from '@mui/icons-material/Security';
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, Legend, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';
import axios from 'axios';
import apiconfig from '../../api/apiconfig';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#D32F2F', '#1976D2'];

const Dashboard = () => {
  const theme = useTheme();

  // State variables
  const [totalResidents, setTotalResidents] = useState(null);
  const [totalSeniors, setTotalSeniors] = useState(null);
  const [totalCrimes, setTotalCrimes] = useState(null);
  const [uniqueAddresses, setUniqueAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('All');
  const [residentsData, setResidentsData] = useState([]);
  const [crimeData, setCrimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const username = localStorage.getItem('username'); // Get username from localStorage
  const isAdmin = username && username.startsWith('admin'); // Check if the user is an admin
  const barangay = isAdmin ? null : username.split('_')[1]; // Extract barangay from username (e.g., 'LGU_Malayantoc' => 'Malayantoc')

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch Residents Data
        const residentsResponse = await axios.get(apiconfig.residents.getAll);
        if (
          residentsResponse.status === 200 &&
          residentsResponse.data.status === 'success' &&
          Array.isArray(residentsResponse.data.data)
        ) {
          const residents = residentsResponse.data.data;
          
          // If user is not admin, filter residents by barangay
          const filteredResidents = isAdmin ? residents : residents.filter(resident => resident.Address === barangay);
          setResidentsData(filteredResidents);

          // Extract unique addresses
          const addresses = [...new Set(filteredResidents.map(resident => resident.Address))];
          setUniqueAddresses(addresses);
        } else {
          throw new Error('Failed to fetch residents data');
        }

        // Fetch Crime Reports Data
        const crimeResponse = await axios.get(apiconfig.crime.getAll);
        if (
          crimeResponse.status === 200 &&
          crimeResponse.data.status === 'success' &&
          crimeResponse.data.data &&
          typeof crimeResponse.data.data.totalRecords === 'number' &&
          Array.isArray(crimeResponse.data.data.crimeReports)
        ) {
          const crimes = crimeResponse.data.data.crimeReports;

          // If user is not admin, filter crimes by barangay
          const filteredCrimes = isAdmin ? crimes : crimes.filter(crime => crime.Location === barangay);
          setCrimeData(filteredCrimes);
        } else {
          throw new Error('Failed to fetch crime reports data');
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [isAdmin, barangay]);

  // Handle address filter change
  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  // Filter residents based on selected address
  const filteredResidents = selectedAddress === 'All'
    ? residentsData
    : residentsData.filter(resident => resident.Address === selectedAddress);

  // Filter crimes based on selected address
  const filteredCrimes = selectedAddress === 'All'
    ? crimeData
    : crimeData.filter(crime => crime.Location === selectedAddress);

  // Calculate metrics based on filtered data
  useEffect(() => {
    setTotalResidents(filteredResidents.length);
    setTotalSeniors(filteredResidents.filter(resident => resident.is_senior).length);
    setTotalCrimes(filteredCrimes.length);
  }, [filteredResidents, filteredCrimes]);

  // Prepare data for Residents Distribution by Address Bar Chart
  const residentsByAddress = uniqueAddresses.map(address => ({
    address,
    count: residentsData.filter(resident => resident.Address === address).length,
  }));

  // Prepare data for Crime Distribution by Address Pie Chart
  const crimesByAddress = uniqueAddresses.map(address => ({
    address,
    count: crimeData.filter(crime => crime.Location === address).length,
  })).filter(item => item.count > 0); // Remove addresses with zero crimes

  // Prepare data for Age Distribution Histogram
  const ageDistribution = [];
  const ageBins = Array.from({ length: 11 }, (_, i) => i * 10); // 0-10, 10-20, ..., 100-110

  ageBins.forEach(bin => {
    const count = filteredResidents.filter(resident => resident.Age >= bin && resident.Age < bin + 10).length;
    ageDistribution.push({ ageRange: `${bin}-${bin + 9}`, count });
  });

  // Define card data
  const cardData = [
    {
      title: 'Total Residents',
      value: totalResidents,
      icon: <PeopleIcon fontSize="large" />,
      color: '#1976d2', // Blue
    },
    {
      title: 'Total Seniors',
      value: totalSeniors,
      icon: <ElderlyIcon fontSize="large" />,
      color: '#388e3c', // Green
    },
    {
      title: 'Total Crimes',
      value: totalCrimes,
      icon: <SecurityIcon fontSize="large" />,
      color: '#d32f2f', // Red
    },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
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
          minHeight: '80vh',
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
        bgcolor: '#f5f5f5',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333333' }}>
        Dashboard
      </Typography>

      {/* Address Filter */}
      {isAdmin && (
        <Box sx={{ marginBottom: '2rem' }}>
          <FormControl sx={{ minWidth: 200 }} variant="outlined">
            <InputLabel id="address-filter-label">Filter by Address</InputLabel>
            <Select
              labelId="address-filter-label"
              id="address-filter"
              value={selectedAddress}
              label="Filter by Address"
              onChange={handleAddressChange}
            >
              <MenuItem value="All">All</MenuItem>
              {uniqueAddresses.map((address, index) => (
                <MenuItem key={index} value={address}>
                  {address}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {/* Metrics Cards */}
      <Grid container spacing={4} sx={{ marginBottom: '2rem' }}>
        {cardData.map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '1.5rem',
                backgroundColor: card.color,
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                borderRadius: '12px',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                },
              }}
            >
              <Box sx={{ marginRight: '1rem' }}>{card.icon}</Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {card.title}
                </Typography>
                <Typography variant="h5">{card.value}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Graphs */}
      <Grid container spacing={4}>
        {/* Residents Distribution by Address */}
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
              Residents Distribution by Address
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={residentsByAddress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="address" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#1976d2" name="Residents" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Crime Distribution by Address */}
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
              Crime Distribution by Address
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={crimesByAddress}
                  dataKey="count"
                  nameKey="address"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#d32f2f"
                  label
                >
                  {crimesByAddress.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Age Distribution of Residents */}
        <Grid item xs={12}>
          <Paper
            sx={{
              padding: '1.5rem',
              bgcolor: '#ffffff',
              boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
              borderRadius: '12px',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Age Distribution of Residents
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ageRange" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#388e3c" name="Residents" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
