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
  Grid,
  Paper,
  useTheme,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

// Validation schema with enhanced validation for username and password
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .matches(
      /^[a-zA-Z0-9_]{3,}$/,
      'Username must be at least 3 characters and contain only letters, numbers, and underscores'
    ),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password should be at least 6 characters')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/,
      'Password must contain at least one letter and one number'
    ),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const Register = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // 'success' | 'error' | 'warning' | 'info'
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Exclude confirmPassword from the payload
      const { username, password } = values;
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/createUser`,
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('User registered:', response.data);
      setSnackbar({
        open: true,
        message: 'Registration successful! Redirecting to landing page...',
        severity: 'success',
      });
      // Optionally, reset the form
      resetForm();
      // Redirect after a short delay to allow users to see the success message
      setTimeout(() => {
        navigate('/landing');
      }, 2000);
    } catch (error) {
      console.error('There was an error registering the user:', error);
      const errorMsg =
        error.response?.data?.message ||
        'An unknown error occurred. Please try again.';
      setSnackbar({
        open: true,
        message: errorMsg,
        severity: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1580281657524-7e2897e8a53f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        padding: theme.spacing(2),
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            padding: theme.spacing(4),
            borderRadius: '16px',
            backgroundColor: 'white',
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.3)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0px 15px 40px rgba(0, 0, 0, 0.35)',
            },
          }}
        >
          <Grid container spacing={2} alignItems="center" direction="column">
            <Grid item>
              <Box
                component="img"
                src="/logo.jpg"
                alt="Logo"
                sx={{
                  width: 100,
                  height: 100,
                  objectFit: 'contain',
                }}
              />
            </Grid>
            <Grid item>
              <Typography
                variant="h4"
                component="h1"
                align="center"
                sx={{
                  fontWeight: 'bold',
                  color: '#333',
                }}
              >
                Create Account
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                sx={{
                  color: '#666',
                }}
              >
                Join our healthcare system today
              </Typography>
            </Grid>
            <Grid item sx={{ width: '100%' }}>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  confirmPassword: '',
                  agreeToTerms: false,
                }}
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
                  <Form>
                    {errors.general && (
                      <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                        {errors.general}
                      </Typography>
                    )}
                    <Field
                      as={TextField}
                      variant="filled"
                      margin="normal"
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      autoFocus
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.username && errors.username}
                      error={touched.username && Boolean(errors.username)}
                      sx={{
                        '& .MuiFilledInput-root': {
                          borderRadius: '8px',
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        },
                        '& .MuiFilledInput-root:before': {
                          borderBottom: 'none',
                        },
                        '& .MuiFilledInput-root:hover:before': {
                          borderBottom: 'none',
                        },
                        '& .MuiFilledInput-root:after': {
                          borderBottom: 'none',
                        },
                      }}
                    />
                    <Field
                      as={TextField}
                      variant="filled"
                      margin="normal"
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      autoComplete="new-password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.password && errors.password}
                      error={touched.password && Boolean(errors.password)}
                      sx={{
                        '& .MuiFilledInput-root': {
                          borderRadius: '8px',
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        },
                        '& .MuiFilledInput-root:before': {
                          borderBottom: 'none',
                        },
                        '& .MuiFilledInput-root:hover:before': {
                          borderBottom: 'none',
                        },
                        '& .MuiFilledInput-root:after': {
                          borderBottom: 'none',
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
                    <Field
                      as={TextField}
                      variant="filled"
                      margin="normal"
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      autoComplete="new-password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                      error={
                        touched.confirmPassword && Boolean(errors.confirmPassword)
                      }
                      sx={{
                        '& .MuiFilledInput-root': {
                          borderRadius: '8px',
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        },
                        '& .MuiFilledInput-root:before': {
                          borderBottom: 'none',
                        },
                        '& .MuiFilledInput-root:hover:before': {
                          borderBottom: 'none',
                        },
                        '& .MuiFilledInput-root:after': {
                          borderBottom: 'none',
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowConfirmPassword}
                              edge="end"
                              aria-label="toggle password visibility"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
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
                          checked={values.agreeToTerms}
                          onChange={(e) =>
                            setFieldValue(
                              'agreeToTerms',
                              e.target.checked
                            )
                          }
                        />
                      }
                      label="I agree to the Terms and Conditions"
                      sx={{ mt: 1 }}
                    />
                    {touched.agreeToTerms && !values.agreeToTerms && (
                      <Typography color="error" variant="body2">
                        You must agree to the terms and conditions
                      </Typography>
                    )}
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
                      {isSubmitting ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        'Register'
                      )}
                    </Button>
                    <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                      <Grid item>
                        <Link
                          component="button"
                          variant="body2"
                          onClick={() => navigate('/login')}
                          underline="hover"
                          sx={{
                            color: '#00796b',
                            '&:hover': {
                              color: '#004d40',
                            },
                          }}
                        >
                          Already have an account? Back to Login
                        </Link>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;
