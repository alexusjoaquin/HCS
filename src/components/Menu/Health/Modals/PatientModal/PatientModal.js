import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  Autocomplete,
} from '@mui/material';
import apiconfig from '../../../../../api/apiconfig';

const PatientModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    PatientID: '',
    Fullname: '',
    Address: '',
    DateOfBirth: '',
    ContactNo: '',
    Gender: 'Male',
    MedicalHistory: '',
  });

  const [residents, setResidents] = useState([]); // State for residents
  const [contactError, setContactError] = useState(''); // Error state for contact number validation

  useEffect(() => {
    if (isOpen) {
      const generatedID = `PID-${Date.now()}`;
      setFormData((prevState) => ({
        ...prevState,
        PatientID: generatedID,
      }));

      // Fetch residents data when modal opens
      fetchResidents();
    }
  }, [isOpen]);

  const fetchResidents = async () => {
    try {
      const response = await fetch(apiconfig.residents.getAll);
      const result = await response.json();
      if (result.status === 'success') {
        setResidents(result.data); // Set the resident data
      } else {
        console.error('Failed to fetch residents:', result.message);
      }
    } catch (error) {
      console.error('Error fetching residents:', error);
    }
  };

  const handleResidentChange = (event, value) => {
    const resident = residents.find((r) => r.Name === value);

    if (resident) {
      setFormData({
        PatientID: formData.PatientID,
        Fullname: resident.Name,
        Address: resident.Address,
        DateOfBirth: resident.Birthday,
        ContactNo: '', // Assuming contact number is not available
        Gender: resident.Gender,
        MedicalHistory: '', // Assuming medical history is not available
      });
    } else {
      // Clear form fields if no resident is selected
      setFormData((prevState) => ({
        ...prevState,
        Fullname: '',
        Address: '',
        DateOfBirth: '',
        Gender: 'Male',
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate contact number field
    if (name === 'ContactNo') {
      const contactRegex = /^[0-9-]*$/; // Accepts only numbers or numbers with dashes
      if (!contactRegex.test(value)) {
        setContactError('Contact number can only contain numbers and dashes.');
      } else {
        setContactError('');
      }
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (contactError) {
      alert('Please fix the errors before submitting.');
      return;
    }

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
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  options={residents.map((resident) => resident.Name)}
                  onChange={handleResidentChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Full Name" required />
                  )}
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
                  disabled // Disable input for Address
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
                  disabled // Disable input for DateOfBirth
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
                  error={Boolean(contactError)} // Display error if validation fails
                  helperText={contactError} // Display error message
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="Gender"
                  label="Gender"
                  value={formData.Gender}
                  onChange={handleChange}
                  required
                  disabled // Disable input for Gender
                />
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
