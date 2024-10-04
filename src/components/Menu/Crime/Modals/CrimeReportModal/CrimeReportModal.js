import React, { useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
} from '@mui/material';

const CrimeReportModal = ({ isOpen, onClose, onSubmit }) => {
  // Ensure all initial values are defined
  const [formData, setFormData] = React.useState({
    ReportID: '', // Add Report ID
    Location: '',
    Date: '',
    Description: '',
    OfficerInCharge: '',
  });

  // Generate a unique Report ID whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      const generatedID = `RID-${Date.now()}`; // Example ID generation logic
      setFormData({
        ReportID: generatedID,
        Location: '',
        Date: '',
        Description: '',
        OfficerInCharge: '',
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData); // Wait for the submission to complete
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
            New Crime Report
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="ReportID"
                  label="Report ID"
                  value={formData.ReportID}
                  onChange={handleChange}
                  placeholder="Enter Report ID"
                  required
                  disabled // Disable input for Report ID
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="Location"
                  label="Location"
                  value={formData.Location}
                  onChange={handleChange}
                  placeholder="Enter Location"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="date"
                  name="Date"
                  value={formData.Date}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="Description"
                  label="Description"
                  value={formData.Description}
                  onChange={handleChange}
                  placeholder="Enter Description"
                  required
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="OfficerInCharge"
                  label="Officer In Charge"
                  value={formData.OfficerInCharge}
                  onChange={handleChange}
                  placeholder="Enter Officer In Charge"
                  required
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

export default CrimeReportModal;
