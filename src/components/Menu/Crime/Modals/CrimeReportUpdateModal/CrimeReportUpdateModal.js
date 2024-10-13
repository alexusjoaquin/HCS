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

const CrimeReportUpdateModal = ({ isOpen, onClose, onSave, report }) => {
  const [formData, setFormData] = useState({
    ReportID: '',
    Description: '',
    Location: '',
    Date: '',
    OfficerInCharge: '',
    SuspectID: '',
    VictimID: '',
  });

  // State for suspects and victims
  const [suspects, setSuspects] = useState([]);
  const [victims, setVictims] = useState([]);
  const [loadingSuspects, setLoadingSuspects] = useState(false);
  const [loadingVictims, setLoadingVictims] = useState(false);
  const [suspectError, setSuspectError] = useState(false);
  const [victimError, setVictimError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        ReportID: report.ReportID || '',
        Description: report.Description || '',
        Location: report.Location || '',
        Date: report.Date || '',
        OfficerInCharge: report.OfficerInCharge || '',
        SuspectID: report.SuspectID || '',
        VictimID: report.VictimID || '',
      });
      fetchSuspects();
      fetchVictims();
    }
  }, [isOpen, report]);

  const fetchSuspects = async () => {
    setLoadingSuspects(true);
    try {
      const response = await axios.get(apiconfig.suspect.getAll);
      if (response.data.status === 'success') {
        setSuspects(response.data.data.suspects);
      }
    } catch (error) {
      console.error('Error fetching suspects:', error);
    } finally {
      setLoadingSuspects(false);
    }
  };

  const fetchVictims = async () => {
    setLoadingVictims(true);
    try {
      const response = await axios.get(apiconfig.victims.getAll);
      if (response.data.status === 'success') {
        setVictims(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching victims:', error);
    } finally {
      setLoadingVictims(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSuspectChange = (event, value) => {
    setFormData({ ...formData, SuspectID: value ? value.SuspectID : '' });
    setSuspectError(false); // Clear error if selected
  };

  const handleVictimChange = (event, value) => {
    setFormData({ ...formData, VictimID: value ? value.VictimID : '' });
    setVictimError(false); // Clear error if selected
  };

  const handleSave = (e) => {
    e.preventDefault();
    let hasError = false;

    if (!formData.SuspectID) {
      setSuspectError(true);
      hasError = true;
    }
    if (!formData.VictimID) {
      setVictimError(true);
      hasError = true;
    }

    if (hasError) return; // Prevent submission if errors exist

    onSave(formData); // Call the onSave prop function with the form data
    onClose(); // Close the modal after saving
  };

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
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: '100%' }}
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
              {/* Suspect Autocomplete */}
              <Grid item xs={12}>
                <Autocomplete
                  options={suspects}
                  getOptionLabel={(option) => `${option.FullName} (${option.SuspectID})`}
                  loading={loadingSuspects}
                  onChange={handleSuspectChange}
                  value={suspects.find(suspect => suspect.SuspectID === formData.SuspectID) || null} // Set the default value
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Suspect"
                      placeholder="Select Suspect"
                      variant="outlined"
                      error={suspectError}
                      helperText={suspectError ? 'Suspect is required' : ''}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loadingSuspects ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
              {/* Victim Autocomplete */}
              <Grid item xs={12}>
                <Autocomplete
                  options={victims}
                  getOptionLabel={(option) => `${option.FullName} (${option.VictimID})`}
                  loading={loadingVictims}
                  onChange={handleVictimChange}
                  value={victims.find(victim => victim.VictimID === formData.VictimID) || null} // Set the default value
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Victim"
                      placeholder="Select Victim"
                      variant="outlined"
                      error={victimError}
                      helperText={victimError ? 'Victim is required' : ''}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loadingVictims ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
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
