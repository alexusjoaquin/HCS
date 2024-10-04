import React from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  TextField,
} from '@mui/material';

const ResidentViewModal = ({ isOpen, onClose, resident }) => {
  if (!isOpen || !resident) return null;

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
        <Paper elevation={10} sx={{ padding: 4, borderRadius: '16px', position: 'relative' }}>
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            Resident Details
          </Typography>
          <span
            style={{
              cursor: 'pointer',
              position: 'absolute',
              top: '10px',
              right: '20px',
              fontSize: '1.5em',
            }}
            onClick={onClose}
          >
            &times;
          </span>
          <Grid container spacing={2} sx={{ marginTop: '10px' }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={resident.Name}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Age"
                value={resident.Age}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Birthday"
                value={resident.Birthday}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                value={resident.Address}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Gender"
                value={resident.Gender}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Status"
                value={resident.Status}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="BMI"
                value={resident.BMI}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Height"
                value={resident.Height}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Weight"
                value={resident.Weight}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Blood Type"
                value={resident.BloodType}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Is Senior"
                value={resident.is_senior ? 'Yes' : 'No'}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            onClick={onClose}
            sx={{ marginTop: '20px', width: '100%' }}
          >
            Close
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default ResidentViewModal;
