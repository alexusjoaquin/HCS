import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  CircularProgress,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import apiconfig from '../../../../../api/apiconfig'; // Adjust the path as necessary

const CrimeReportModal = ({ isOpen, onClose, onSubmit }) => {
  // Form data state
  const [formData, setFormData] = useState({
    ReportID: '',
    Location: '',
    Date: '',
    Description: '',
    OfficerInCharge: '',
    SuspectID: '', // Added SuspectID
    VictimID: '',  // Added VictimID
  });

  // Suspects state
  const [suspects, setSuspects] = useState([]);
  const [loadingSuspects, setLoadingSuspects] = useState(false);
  const [suspectsError, setSuspectsError] = useState(null);

  // Victims state
  const [victims, setVictims] = useState([]);
  const [loadingVictims, setLoadingVictims] = useState(false);
  const [victimsError, setVictimsError] = useState(null);

  // Effect to initialize form and fetch data when modal opens
  useEffect(() => {
    if (isOpen) {
      // Generate a unique Report ID
      const generatedID = `RID-${Date.now()}`;
      setFormData({
        ReportID: generatedID,
        Location: '',
        Date: '',
        Description: '',
        OfficerInCharge: '',
        SuspectID: '',
        VictimID: '',
      });

      // Fetch Suspects and Victims
      fetchSuspects();
      fetchVictims();
    }
  }, [isOpen]);

  // Fetch Suspects
  const fetchSuspects = async () => {
    setLoadingSuspects(true);
    setSuspectsError(null);
    try {
      const response = await axios.get(apiconfig.suspect.getAll);
      if (response.data.status === 'success') {
        setSuspects(response.data.data.suspects);
      } else {
        setSuspectsError('Failed to fetch suspects');
      }
    } catch (error) {
      setSuspectsError(error.message || 'Error fetching suspects');
    } finally {
      setLoadingSuspects(false);
    }
  };

  // Fetch Victims
  const fetchVictims = async () => {
    setLoadingVictims(true);
    setVictimsError(null);
    try {
      const response = await axios.get(apiconfig.victims.getAll);
      if (response.data.status === 'success') {
        setVictims(response.data.data);
      } else {
        setVictimsError('Failed to fetch victims');
      }
    } catch (error) {
      setVictimsError(error.message || 'Error fetching victims');
    } finally {
      setLoadingVictims(false);
    }
  };

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Autocomplete changes
  const handleSuspectChange = (event, value) => {
    if (value) {
      setFormData({ ...formData, SuspectID: value.SuspectID });
    } else {
      setFormData({ ...formData, SuspectID: '' });
    }
  };

  const handleVictimChange = (event, value) => {
    if (value) {
      setFormData({ ...formData, VictimID: value.VictimID });
    } else {
      setFormData({ ...formData, VictimID: '' });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Only include SuspectID and VictimID if they are selected
      const submissionData = { ...formData };
      if (!submissionData.SuspectID) {
        delete submissionData.SuspectID;
      }
      if (!submissionData.VictimID) {
        delete submissionData.VictimID;
      }

      await onSubmit(submissionData); // Ensure onSubmit handles the data correctly
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error submitting crime report:', error);
      // Optionally, display an error message to the user
    }
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
              {/* Report ID */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="ReportID"
                  label="Report ID"
                  value={formData.ReportID}
                  onChange={handleChange}
                  placeholder="Enter Report ID"
                  required
                  disabled
                />
              </Grid>

              {/* Location */}
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

              {/* Date */}
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

              {/* Description */}
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

              {/* Officer In Charge */}
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

              {/* Suspect Autocomplete */}
              <Grid item xs={12}>
                <Autocomplete
                  options={suspects}
                  getOptionLabel={(option) =>
                    `${option.FullName} (${option.SuspectID})`
                  }
                  loading={loadingSuspects}
                  onChange={handleSuspectChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Suspect"
                      placeholder="Select Suspect"
                      variant="outlined"
                      error={!!suspectsError}
                      helperText={suspectsError}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loadingSuspects ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                  // Optional: allow clearing the selection
                  clearOnEscape
                />
              </Grid>

              {/* Victim Autocomplete */}
              <Grid item xs={12}>
                <Autocomplete
                  options={victims}
                  getOptionLabel={(option) =>
                    `${option.FullName} (${option.VictimID})`
                  }
                  loading={loadingVictims}
                  onChange={handleVictimChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Victim"
                      placeholder="Select Victim"
                      variant="outlined"
                      error={!!victimsError}
                      helperText={victimsError}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loadingVictims ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                  clearOnEscape
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Submit Report
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
