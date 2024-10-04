import React from 'react';
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

const PatientUpdateModal = ({ isOpen, onClose, onSave, patient }) => {
  const [formData, setFormData] = React.useState({
    PatientID: patient?.PatientID || '',
    FirstName: patient?.FirstName || '',
    LastName: patient?.LastName || '',
    DateOfBirth: patient?.DateOfBirth || '',
    ContactNo: patient?.ContactNo || '', // Ensure this is correctly mapped
    Gender: patient?.Gender || '',
    MedicalHistory: patient?.MedicalHistory || '',
  });

  React.useEffect(() => {
    if (patient) {
      setFormData({
        PatientID: patient.PatientID || '',
        FirstName: patient.FirstName || '',
        LastName: patient.LastName || '',
        DateOfBirth: patient.DateOfBirth || '',
        ContactNo: patient.ContactNo || '', // Ensure this is correctly mapped
        Gender: patient.Gender || '',
        MedicalHistory: patient.MedicalHistory || '',
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (typeof onSave === 'function') { // Optional: Check if onSave is a function
      onSave(formData);
    } else {
      console.error('onSave is not a function:', onSave);
    }
    onClose();
  };
  

  if (!isOpen || !patient) return null; // Ensure both conditions are met

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
            Update Patient
          </Typography>
          <form onSubmit={handleSave}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="PatientID"
                  value={formData.PatientID}
                  readOnly
                  label="Patient ID"
                  sx={{ width: '100%' }}
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
                  type="date"
                  name="DateOfBirth"
                  label="Date of Birth"
                  value={formData.DateOfBirth}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }} // Ensure label stays visible
                  sx={{ width: '100%' }} // Ensure the field takes the full width
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="ContactNo" // Ensure this matches your state
                  label="Contact No"
                  value={formData.ContactNo} // Ensure this matches your state
                  onChange={handleChange} // Ensure this is correctly set up for editing
                  placeholder="Enter Contact No"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleChange}
                  displayEmpty
                  required
                >
                  <MenuItem value="" disabled>Select Gender</MenuItem>
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
                  Save
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

export default PatientUpdateModal;
