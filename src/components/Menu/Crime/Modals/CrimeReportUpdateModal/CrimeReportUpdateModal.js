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

const CrimeReportUpdateModal = ({ isOpen, onClose, onSave, report }) => {
  // Initialize the form data state based on the report prop
  const [formData, setFormData] = React.useState({
    ReportID: '',
    Description: '',
    Location: '',
    Date: '',
    OfficerInCharge: '',
  });

  // Update the form data state when the report prop changes
  React.useEffect(() => {
    if (report) {
      setFormData({
        ReportID: report.ReportID || '',
        Description: report.Description || '',
        Location: report.Location || '',
        Date: report.Date || '',
        OfficerInCharge: report.OfficerInCharge || '',
      });
    }
  }, [report]);

  // Handle changes to form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData); // Call the onSave prop function with the form data
    onClose(); // Close the modal after saving
  };

  // Prevent rendering if the modal is not open or report is null
  if (!isOpen || !report) return null;

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
            Update Crime Report
          </Typography>
          <form onSubmit={handleSave}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="ReportID"
                  value={formData.ReportID}
                  readOnly
                  label="Report ID"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="Description"
                  label="Description"
                  value={formData.Description}
                  onChange={handleChange}
                  placeholder="Enter Report Description"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="date"
                  name="Date"
                  label="Date"
                  value={formData.Date}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }} // Ensure label stays visible
                  sx={{ width: '100%' }} // Ensure the field takes the full width
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
                  name="OfficerInCharge"
                  label="Officer In Charge"
                  value={formData.OfficerInCharge}
                  onChange={handleChange}
                  placeholder="Enter Officer's Name"
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

export default CrimeReportUpdateModal;
