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
    Fullname: patient?.Fullname || '',
    Address: patient?.Address || '',
    DateOfBirth: patient?.DateOfBirth || '',
    ContactNo: patient?.ContactNo || '',
    Gender: patient?.Gender || '',
    MedicalHistory: patient?.MedicalHistory || '',
  });

  React.useEffect(() => {
    if (patient) {
      setFormData({
        PatientID: patient.PatientID || '',
        Fullname: patient?.Fullname || '',
        Address: patient.Address || '',
        DateOfBirth: patient.DateOfBirth || '',
        ContactNo: patient.ContactNo || '',
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
    if (typeof onSave === 'function') {
      onSave(formData);
    } else {
      console.error('onSave is not a function:', onSave);
    }
    onClose();
  };

  if (!isOpen || !patient) return null;

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
                  type="date"
                  name="DateOfBirth"
                  label="Date of Birth"
                  value={formData.DateOfBirth}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="ContactNo"
                  label="Contact No"
                  value={formData.ContactNo}
                  onChange={handleChange}
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
                  <MenuItem value="" disabled>
                    Select Gender
                  </MenuItem>
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
