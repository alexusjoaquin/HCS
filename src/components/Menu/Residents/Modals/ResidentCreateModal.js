import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
} from '@mui/material';

const ResidentCreateModal = ({ isOpen, onClose, onSubmit }) => {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData); // Wait for the submission to complete
    // Reset form fields after successful submission
    setFormData({
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
    onClose(); // Close modal after submission and reset
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
            New Resident Record
          </Typography>
          <form onSubmit={handleSubmit}>
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
                </Select>
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
                  inputProps={{ min: 0 }} // Ensure the field only accepts positive numbers
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
                  inputProps={{ min: 0 }} // Ensure the field only accepts positive numbers
                />
              </Grid>

              <Grid item xs={12}>
                <Select
                  fullWidth
                  name="Status"
                  value={formData.Status}
                  onChange={handleChange}
                  displayEmpty
                  required
                >
                  <MenuItem value="" disabled>Select Status</MenuItem>
                  <MenuItem value="single">Single</MenuItem>
                  <MenuItem value="married">Married</MenuItem>
                  <MenuItem value="widowed">Widowed</MenuItem>
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

export default ResidentCreateModal;
