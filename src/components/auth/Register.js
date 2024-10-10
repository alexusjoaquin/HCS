import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Box,
  Snackbar,
  Alert,
  Grid,
  Paper,
  CircularProgress,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

// List of locations
const locations = [
  'Baloc',
  'Buasao',
  'Burgos',
  'Cabugao',
  'Casulucan',
  'Comitang',
  'Concepcion',
  'Dolores',
  'General Luna',
  'Hulo',
  'Mabini',
  'Malasin',
  'Malayantoc',
  'Mambarao',
  'Poblacion',
  'Malaya (Pook Malaya)',
  'Pulong Buli',
  'Sagaba',
  'San Agustin',
  'San Fabian',
  'San Francisco',
  'San Pascual',
  'Santa Rita',
  'Santo Rosario',
];

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    brgy: '',
    agreeToTerms: false
  });
  const [generatedUsername, setGeneratedUsername] = useState('');

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
        setSnackbar({
            open: true,
            message: 'Passwords do not match!',
            severity: 'error',
        });
        return;
    }
    if (!formData.agreeToTerms) {
        setSnackbar({
            open: true,
            message: 'You must agree to the terms and conditions!',
            severity: 'error',
        });
        return;
    }

    setIsSubmitting(true);

    try {
        const payload = {
            username: generatedUsername,
            password: formData.password,
            brgy: formData.brgy,
        };

        const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/createUser`,
            payload,
            { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.status === 200) {
            setSnackbar({
                open: true,
                message: 'Registration successful! Redirecting to landing page...',
                severity: 'success',
            });
            setTimeout(() => {
                // Clear form data
                setFormData({
                    username: '',
                    password: '',
                    confirmPassword: '',
                    brgy: '',
                    agreeToTerms: false
                });
                // Log out the user by clearing local storage
                localStorage.removeItem('username'); // Assuming username is stored here
                navigate('/'); // Redirect to login page
            }, 2000);
        }
    } catch (error) {
        setSnackbar({
            open: true,
            message: error.response?.data?.message || 'An unknown error occurred. Please try again.',
            severity: 'error',
        });
    } finally {
        setIsSubmitting(false);
    }
};


  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleLocationChange = (e) => {
    const location = e.target.value;
    setFormData({ ...formData, brgy: location });
    setGeneratedUsername(`LGU_${location.replace(/\s+/g, '_')}`);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        overflow: 'hidden',
        padding: '2rem',
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: 4,
          borderRadius: '16px',
          backgroundColor: 'white',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.3)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <Grid container spacing={2} alignItems="center" direction="column">
          <Grid item>
            <Box
              component="img"
              src="/logo.jpg"
              alt="Logo"
              sx={{ width: 100, height: 100, objectFit: 'contain' }}
            />
          </Grid>
          <Grid item>
            <Typography
              variant="h4"
              component="h1"
              align="center"
              sx={{ fontWeight: 'bold', color: '#333' }}
            >
              Create Account
            </Typography>
            <Typography variant="subtitle1" align="center" sx={{ color: '#666' }}>
              Join our healthcare system today
            </Typography>
          </Grid>
          <Grid item sx={{ width: '100%' }}>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={generatedUsername}
                disabled
                sx={{
                  '& .MuiFilledInput-root': {
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  },
                }}
              />
              <FormControl fullWidth variant="filled" sx={{ marginY: 1 }}>
                <InputLabel id="location-label">Select Barangay</InputLabel>
                <Select
                  labelId="location-label"
                  id="brgy"
                  name="brgy"
                  value={formData.brgy}
                  onChange={handleLocationChange}
                  required
                  sx={{
                    '& .MuiFilledInput-root': {
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    },
                  }}
                >
                  {locations.map((location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                variant="filled"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="filled"
                margin="normal"
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                  />
                }
                label="I agree to the Terms and Conditions"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{
                  marginTop: '1.5rem',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  backgroundColor: '#00796b',
                  '&:hover': {
                    backgroundColor: '#004d40',
                  },
                  textTransform: 'none',
                  fontWeight: 'bold',
                  position: 'relative',
                  transition: 'background-color 0.3s',
                }}
              >
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Register'}
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;
