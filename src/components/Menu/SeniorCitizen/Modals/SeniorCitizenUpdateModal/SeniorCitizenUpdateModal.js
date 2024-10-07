import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
} from '@mui/material';

const SeniorCitizenUpdateModal = ({ isOpen, onClose, onSave, seniorCitizen }) => {
  const [formData, setFormData] = React.useState({
    SeniorID: '',
    FullName: '',
    Address: '',
    DateOfBirth: '',
    ContactInfo: { Phone: '', Email: '' },
    Gender: '',
    MedicalHistory: '',
  });

  // Update form data when seniorCitizen prop changes
  React.useEffect(() => {
    if (seniorCitizen) {
      setFormData({
        SeniorID: seniorCitizen.SeniorID || '',
        FullName: seniorCitizen.FullName || '',
        Address: seniorCitizen.Address || '',
        DateOfBirth: seniorCitizen.DateOfBirth || '',
        ContactInfo: seniorCitizen.ContactInfo || { Phone: '', Email: '' },
        Gender: seniorCitizen.Gender || '',
        MedicalHistory: seniorCitizen.MedicalHistory || '',
      });
    }
  }, [seniorCitizen]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'ContactInfo.Phone') {
      setFormData({ ...formData, ContactInfo: { ...formData.ContactInfo, Phone: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData); // Call onSave with form data
    onClose(); // Close the modal after saving
  };

  // Don't render if modal isn't open
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
            Update Senior Citizen
          </Typography>
          <form onSubmit={handleSave}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="SeniorID"
                  value={formData.SeniorID}
                  readOnly
                  label="Senior ID"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="FullName"
                  label="Full Name"
                  value={formData.FullName}
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
                  type="date"
                  name="DateOfBirth"
                  label="Date of Birth"
                  value={formData.DateOfBirth}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }} // Ensure label stays visible
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="ContactInfo.Phone"
                  label="Contact No."
                  value={formData.ContactInfo.Phone}
                  onChange={handleChange}
                  placeholder="Enter Contact No."
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="Gender"
                  label="Gender"
                  value={formData.Gender}
                  onChange={handleChange}
                  placeholder="Enter Gender"
                  required
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
                  rows={3}
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

export default SeniorCitizenUpdateModal;
