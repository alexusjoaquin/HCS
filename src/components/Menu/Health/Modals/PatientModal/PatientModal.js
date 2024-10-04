import React, { useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  Select,
  MenuItem,
} from '@mui/material';

const PatientModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    PatientID: '',
    FirstName: '',
    LastName: '',
    DateOfBirth: '',
    ContactInfo: {
      Phone: '',
      Email: '',
    },
    Gender: 'Male', // Default value
    MedicalHistory: '',
  });

  // Generate a unique Patient ID whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      const generatedID = `PID-${Date.now()}`; // Example ID generation logic
      setFormData((prevState) => ({
        ...prevState,
        PatientID: generatedID,
      }));
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      ContactInfo: {
        ...prevState.ContactInfo,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form after submission
    setFormData({
      PatientID: '',
      FirstName: '',
      LastName: '',
      DateOfBirth: '',
      ContactInfo: {
        Phone: '',
        Email: '',
      },
      Gender: 'Male',
      MedicalHistory: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={10} sx={{ padding: 4, borderRadius: '16px' }}>
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            New Patient
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="PatientID"
                  label="Patient ID"
                  value={formData.PatientID}
                  onChange={handleChange}
                  placeholder="Enter Patient ID"
                  required
                  disabled // Disable input for PatientID
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="FirstName"
                  label="First Name"
                  value={formData.FirstName}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="LastName"
                  label="Last Name"
                  value={formData.LastName}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="date"
                  name="DateOfBirth"
                  label="Date of Birth"
                  value={formData.DateOfBirth}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="tel"
                  name="Phone"
                  label="Phone"
                  value={formData.ContactInfo.Phone}
                  onChange={handleContactChange}
                  placeholder="Enter Phone Number"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="email"
                  name="Email"
                  label="Email"
                  value={formData.ContactInfo.Email}
                  onChange={handleContactChange}
                  placeholder="Enter Email"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="MedicalHistory"
                  label="Medical History"
                  value={formData.MedicalHistory}
                  onChange={handleChange}
                  placeholder="Enter Medical History"
                  required
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button type="submit" variant="contained" color="primary" sx={{ width: '48%' }}>
                  Submit
                </Button>
                <Button
                  type="button"
                  onClick={onClose}
                  variant="contained"
                  color="secondary"
                  sx={{ width: '48%' }}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default PatientModal;
