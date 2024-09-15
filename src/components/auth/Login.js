import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography, Container, Box, Avatar } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/loginUser`,
        {
          username: values.email,
          password: values.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        alert('Login successful');
        navigate('/landing');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred during login');
    } finally {
      setSubmitting(false);
    }
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
          <MedicalServicesIcon />
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
          Healthcare System Login
        </Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
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
                id="email"
                label="Username"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.email ? errors.email : ''}
                error={touched.email && Boolean(errors.email)}
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
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default Login;
