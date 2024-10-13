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
  FormControl,
  InputLabel,
} from '@mui/material';

const VictimsUpdateModal = ({ isOpen, onClose, onSave, victim }) => {
  const [formData, setFormData] = React.useState({
    VictimID: '',
    FullName: '',
    LastKnownAddress: '',
    IncidentDate: '',
    CaseStatus: '',
  });

  const [errors, setErrors] = React.useState({
    FullName: '',
  });

  React.useEffect(() => {
    if (victim) {
      setFormData({
        VictimID: victim.VictimID || '',
        FullName: victim.FullName || '',
        LastKnownAddress: victim.LastKnownAddress || '',
        IncidentDate: victim.IncidentDate || '',
        CaseStatus: victim.CaseStatus || '',
      });
    }
  }, [victim]);

  const validateFullName = (name) => {
    const regex = /^[a-zA-Z\s]*$/; // Letters and spaces only
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

  const handleSave = (e) => {
    e.preventDefault();
    if (!errors.FullName) {
      onSave(formData); // Pass updated data
      onClose(); // Close modal after save
    }
  };

  if (!isOpen || !victim) return null;

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
            Update Victim
          </Typography>
          <form onSubmit={handleSave}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="VictimID"
                  label="Victim ID"
                  value={formData.VictimID}
                  readOnly
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="FullName"
                  label="Full Name"
                  value={formData.FullName}
                  onChange={handleChange}
                  error={!!errors.FullName}
                  helperText={errors.FullName}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="LastKnownAddress"
                  label="Last Known Address"
                  value={formData.LastKnownAddress}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="date"
                  name="IncidentDate"
                  label="Incident Date"
                  value={formData.IncidentDate}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="case-status-label">Case Status</InputLabel>
                  <Select
                    labelId="case-status-label"
                    name="CaseStatus"
                    value={formData.CaseStatus}
                    onChange={handleChange}
                    required
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
                </FormControl>
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

export default VictimsUpdateModal;
