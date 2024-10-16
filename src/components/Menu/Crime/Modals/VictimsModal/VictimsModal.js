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
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';

const VictimsModal = ({ isOpen, onClose, onSubmit }) => {
  // Generate an auto-incremented VictimID based on timestamp
  const generateVictimID = () => `V-${Date.now()}`;

  const [formData, setFormData] = React.useState({
    VictimID: generateVictimID(), // Auto-generated
    FullName: '',
    LastKnownAddress: '',
    IncidentDate: '',
    CaseStatus: '',
  });

  const [errors, setErrors] = React.useState({
    FullName: '',
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        VictimID: generateVictimID(),
        FullName: '',
        LastKnownAddress: '',
        IncidentDate: '',
        CaseStatus: '',
      });
      setErrors({ FullName: '' }); // Reset errors when modal opens
    }
  }, [isOpen]);

  const validateFullName = (name) => {
    const regex = /^[a-zA-Z\s]*$/; // Accepts only letters and spaces
    return regex.test(name);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'FullName') {
      if (!validateFullName(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          FullName: 'Full Name can only contain letters and spaces.',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          FullName: '',
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check for errors before submitting
    if (errors.FullName) {
      return; // Prevent submission if there are errors
    }
    await onSubmit(formData); // Wait for the submission to complete
    setFormData({
      VictimID: generateVictimID(),
      FullName: '',
      LastKnownAddress: '',
      IncidentDate: '',
      CaseStatus: '',
    });
    onClose(); // Close only after successful submission
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
            New Victim Report
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="VictimID"
                  label="Victim ID"
                  value={formData.VictimID}
                  required
                  disabled // Auto-generated, so it's read-only
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
                  error={!!errors.FullName}
                  helperText={errors.FullName} // Display error message
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="LastKnownAddress"
                  label="Last Known Address"
                  value={formData.LastKnownAddress}
                  onChange={handleChange}
                  placeholder="Enter Last Known Address"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="date"
                  name="IncidentDate"
                  value={formData.IncidentDate}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required error={!formData.CaseStatus}>
                  <InputLabel id="case-status-label">Case Status</InputLabel>
                  <Select
                    labelId="case-status-label"
                    name="CaseStatus"
                    value={formData.CaseStatus}
                    onChange={handleChange}
                  >
                    <MenuItem value="Resolved">Resolved</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Escalated">Escalated</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                    <MenuItem value="On Hold">On Hold</MenuItem>
                  </Select>
                  {!formData.CaseStatus && <FormHelperText>Case Status is required</FormHelperText>}
                </FormControl>
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

export default VictimsModal;
