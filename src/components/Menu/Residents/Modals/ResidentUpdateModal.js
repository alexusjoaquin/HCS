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
  FormControlLabel,
  Checkbox,
} from '@mui/material';

const ResidentUpdateModal = ({ isOpen, onClose, onSave, resident }) => {
  const [formData, setFormData] = React.useState({
    Name: '',
    Age: '',
    Birthday: '',
    Address: '',
    Gender: '',
    Status: '',
    BMI: '',
    Height: '',
    Weight: '',
    BloodType: '',
    is_senior: false,
  });

  React.useEffect(() => {
    if (resident) {
      setFormData({
        Name: resident.Name || '',
        Age: resident.Age || '',
        Birthday: resident.Birthday || '',
        Address: resident.Address || '',
        Gender: resident.Gender || '',
        Status: resident.Status || '',
        BMI: resident.BMI || '',
        Height: resident.Height || '',
        Weight: resident.Weight || '',
        BloodType: resident.BloodType || '',
        is_senior: resident.IsSenior || false,
      });
    }
  }, [resident]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen || !resident) return null; // Prevent rendering if modal is closed or resident is null

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
            Update Resident
          </Typography>
          <form onSubmit={handleSave}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="Name"
                  label="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      type="number"
                      name="Age"
                      label="Age"
                      value={formData.Age}
                      onChange={handleChange}
                      placeholder="Enter age in years"
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type="date"
                      name="Birthday"
                      label="Birthday"
                      value={formData.Birthday}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }} // Ensure label stays visible
                      required
                      sx={{ width: '100%' }} // Ensure the field takes the full width
                    />
                  </Grid>
                </Grid>
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
                <Select
                  fullWidth
                  name="Status"
                  value={formData.Status}
                  onChange={handleChange}
                  displayEmpty
                  required
                >
                  <MenuItem value="" disabled>Select Status</MenuItem>
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married">Married</MenuItem>
                  <MenuItem value="Widowed">Widowed</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  name="BMI"
                  label="BMI"
                  value={formData.BMI}
                  onChange={handleChange}
                  placeholder="Enter BMI"
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  name="Height"
                  label="Height (cm)"
                  value={formData.Height}
                  onChange={handleChange}
                  placeholder="Enter Height"
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  name="Weight"
                  label="Weight (kg)"
                  value={formData.Weight}
                  onChange={handleChange}
                  placeholder="Enter Weight"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <Select
                  fullWidth
                  name="BloodType"
                  value={formData.BloodType}
                  onChange={handleChange}
                  displayEmpty
                  required
                >
                  <MenuItem value="" disabled>Select Blood Type</MenuItem>
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A−">A−</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B−">B−</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="AB−">AB−</MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="O−">O−</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="is_senior"
                      checked={formData.is_senior}
                      onChange={handleChange}
                    />
                  }
                  label="Check if Senior"
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

export default ResidentUpdateModal;
