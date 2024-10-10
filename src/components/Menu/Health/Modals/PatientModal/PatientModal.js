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
    Fullname: '',
    Address: '',
    DateOfBirth: '',
    ContactNo: '',
    Gender: 'Male', // Default value
    MedicalHistory: '',
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      PatientID: '',
      Fullname: '',
      Address: '',
      DateOfBirth: '',
      ContactNo: '',
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
                  required
                  disabled // Disable input for PatientID
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="Fullname"
                  label="Full Name"
                  value={formData.Fullname}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="Address"
                  label="Address"
                  value={formData.Address}
                  onChange={handleChange}
                  placeholder="Enter Address"
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
                  name="ContactNo"
                  label="Contact No"
                  value={formData.ContactNo}
                  onChange={handleChange}
                  placeholder="Enter Contact Number"
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
                  Cancel
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
