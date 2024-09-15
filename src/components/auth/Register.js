import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography, Container, Box, Avatar, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const Register = () => {
  const navigate = useNavigate();
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/createUser`,
        values,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('User registered:', response.data);
      navigate('/landing');
    } catch (error) {
      console.error('There was an error registering the user:', error);
      setErrorMessage(error.response?.data?.message || 'An unknown error occurred. Please try again.');
      setErrorDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setErrorDialogOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage: 'url(https://www.google.com/url?sa=i&url=https%3A%2F%2Fwallpapers.com%2Fhealthcare&psig=AOvVaw1S8n2NJMry-xFYvRnZpasR&ust=1722607881613000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIi01cj804cDFQAAAAAdAAAAABAI)',
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
          bgcolor: 'rgba(255, 255, 255, 0.85)', // Semi-transparent white background
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
          borderRadius: '12px',
          padding: '2rem',
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: '#00796b', // A teal color, often associated with healthcare
          }}
        >
          <LockOpenIcon />
        </Avatar>
        <Typography
          variant="h5"
          component="h1"
          sx={{
            marginBottom: '1.5rem',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          Register
        </Typography>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, handleBlur }) => (
            <Form
              style={{
                width: '100%',
                marginTop: '1rem',
              }}
            >
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.username ? errors.username : ''}
                error={touched.username && Boolean(errors.username)}
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
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.password ? errors.password : ''}
                error={touched.password && Boolean(errors.password)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
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
                }}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Container>

      {/* Error Dialog */}
      <Dialog
        open={errorDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="error-dialog-title"
        aria-describedby="error-dialog-description"
      >
        <DialogTitle id="error-dialog-title">Registration Error</DialogTitle>
        <DialogContent>
          <Typography>{errorMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Register;
