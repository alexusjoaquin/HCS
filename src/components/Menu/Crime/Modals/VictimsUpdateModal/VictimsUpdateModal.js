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

const VictimsUpdateModal = ({ isOpen, onClose, onSave, victim }) => {
  // Initialize form data state based on the victim prop
  const [formData, setFormData] = React.useState({
    VictimID: '',
    FullName: '',
    LastKnownAddress: '',
    IncidentDate: '',
    CaseStatus: '',
  });

  // Update form data state when victim prop changes
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

  // Handle changes to form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData); // Call the onSave function with the form data
    onClose(); // Close the modal after saving
  };

  // Prevent rendering if the modal is not open or victim is null
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
                  type="text"
                  name="VictimID"
                  value={formData.VictimID}
                  readOnly
                  label="Victim ID"
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
                <TextField
                  fullWidth
                  name="CaseStatus"
                  label="Case Status"
                  value={formData.CaseStatus}
                  onChange={handleChange}
                  placeholder="Enter Case Status"
                  required
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

export default VictimsUpdateModal;
