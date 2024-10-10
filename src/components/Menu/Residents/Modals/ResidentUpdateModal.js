import React, { useEffect, useState } from 'react';
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
  const [formData, setFormData] = useState({
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

  useEffect(() => {
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
        is_senior: resident.is_senior || false,
      });
    }
  }, [resident]);

  useEffect(() => {
    // Calculate Age based on Birthday
    if (formData.Birthday) {
      const birthdayDate = new Date(formData.Birthday);
      const today = new Date();
      const age = today.getFullYear() - birthdayDate.getFullYear();
      const monthDiff = today.getMonth() - birthdayDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdayDate.getDate())) {
        setFormData((prevData) => ({
          ...prevData,
          Age: age - 1,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          Age: age,
        }));
      }
    } else {
      setFormData((prevData) => ({ ...prevData, Age: '' }));
    }
  }, [formData.Birthday]);

  useEffect(() => {
    // Calculate BMI based on Height and Weight
    if (formData.Height > 0 && formData.Weight > 0) {
      const heightInMeters = formData.Height / 100; // Convert height from cm to m
      const bmi = (formData.Weight / (heightInMeters * heightInMeters)).toFixed(2); // Calculate BMI
      setFormData((prevData) => ({ ...prevData, BMI: bmi }));
    } else {
      setFormData((prevData) => ({ ...prevData, BMI: '' }));
    }
  }, [formData.Height, formData.Weight]);

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
                    {/* Disable the Age field */}
                    <TextField
                      type="number"
                      name="Age"
                      label="Age"
                      value={formData.Age}
                      disabled
                      placeholder="Auto-calculated"
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
                      inputProps={{ max: new Date().toISOString().split("T")[0] }} // Prevent future dates
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  name="Address"
                  value={formData.Address}
                  onChange={handleChange}
                  displayEmpty
                  required
                >
                  <MenuItem value="" disabled>Select Barangay</MenuItem>
                  <MenuItem value="Baloc">Baloc</MenuItem>
                  <MenuItem value="Buasao">Buasao</MenuItem>
                  <MenuItem value="Burgos">Burgos</MenuItem>
                  <MenuItem value="Cabugao">Cabugao</MenuItem>
                  <MenuItem value="Casulucan">Casulucan</MenuItem>
                  <MenuItem value="Comitang">Comitang</MenuItem>
                  <MenuItem value="Concepcion">Concepcion</MenuItem>
                  <MenuItem value="Dolores">Dolores</MenuItem>
                  <MenuItem value="General Luna">General Luna</MenuItem>
                  <MenuItem value="Hulo">Hulo</MenuItem>
                  <MenuItem value="Mabini">Mabini</MenuItem>
                  <MenuItem value="Malasin">Malasin</MenuItem>
                  <MenuItem value="Malayantoc">Malayantoc</MenuItem>
                  <MenuItem value="Mambarao">Mambarao</MenuItem>
                  <MenuItem value="Poblacion">Poblacion</MenuItem>
                  <MenuItem value="Malaya (Pook Malaya)">Malaya (Pook Malaya)</MenuItem>
                  <MenuItem value="Pulong Buli">Pulong Buli</MenuItem>
                  <MenuItem value="Sagaba">Sagaba</MenuItem>
                  <MenuItem value="San Agustin">San Agustin</MenuItem>
                  <MenuItem value="San Fabian">San Fabian</MenuItem>
                  <MenuItem value="San Francisco">San Francisco</MenuItem>
                  <MenuItem value="San Pascual">San Pascual</MenuItem>
                  <MenuItem value="Santa Rita">Santa Rita</MenuItem>
                  <MenuItem value="Santo Rosario">Santo Rosario</MenuItem>
                </Select>
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
                  disabled // Disable the BMI field
                  placeholder="Auto-calculated"
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
