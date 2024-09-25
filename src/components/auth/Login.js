import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Checkbox,
  FormControlLabel,
  Link,
  CircularProgress,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  identifier: Yup.string()
    .required('Username or Email is required')
    .test(
      'is-valid-identifier',
      'Must be a valid email or username (minimum 3 characters)',
      function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
        return emailRegex.test(value) || usernameRegex.test(value);
      }
    ),
  password: Yup.string()
    .min(6, 'Password should be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // 'success' | 'error' | 'warning' | 'info'
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/loginUser`,
        {
          username: values.identifier,
          password: values.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: 'Login successful',
          severity: 'success',
        });
        navigate('/landing');
      } else {
        setSnackbar({
          open: true,
          message: 'Invalid credentials',
          severity: 'error',
        });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setSnackbar({
          open: true,
          message: error.response.data.message,
          severity: 'error',
        });
      } else {
        setSnackbar({
          open: true,
          message: 'An error occurred during login',
          severity: 'error',
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage:
          'url(https://images.unsplash.com/photo-1580281657524-7e2897e8a53f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional dark overlay
          backdropFilter: 'blur(5px)', // Blur effect
        },
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'white', // Semi-transparent white background
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.3)',
          borderRadius: '16px',
          padding: '3rem 2rem',
        }}
      >
        <Box
          component="img"
          src="/logo.jpg"
          alt="Logo"
          sx={{
            width: 80,
            height: 80,
            marginBottom: '1rem',
          }}
        />
        <Typography
          variant="h5"
          component="h1"
          sx={{
            marginBottom: '1.5rem',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          Healthcare System Login
        </Typography>
        <Formik
          initialValues={{ identifier: '', password: '', remember: false }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
            values,
            setFieldValue,
          }) => (
            <Form
              style={{
                width: '100%',
                marginTop: '1rem',
              }}
            >
              {errors.general && (
                <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                  {errors.general}
                </Typography>
              )}
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="identifier"
                label="Username or Email"
                name="identifier"
                autoComplete="username"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.identifier && errors.identifier}
                error={touched.identifier && Boolean(errors.identifier)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              />
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.password && errors.password}
                error={touched.password && Boolean(errors.password)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
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
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    name="remember"
                    checked={values.remember}
                    onChange={(e) => setFieldValue('remember', e.target.checked)}
                  />
                }
                label="Remember me"
                sx={{ mt: 1 }}
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
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Sign In'
                )}
              </Button>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '1rem',
                }}
              >
                <Link href="#" variant="body2" underline="hover">
                  Forgot password?
                </Link>
                <Link href="#" variant="body2" underline="hover">
                  Don't have an account? Sign Up
                </Link>
              </Box>
            </Form>
          )}
        </Formik>
      </Container>

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

export default Login;
