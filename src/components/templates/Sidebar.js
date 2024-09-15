import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setOpen(true);
  };

  const handleConfirmLogout = () => {
    setOpen(false);
    // Perform logout logic here, like clearing authentication tokens
    navigate('/'); // Redirect to the login page
  };

  const handleCancelLogout = () => {
    setOpen(false);
  };

  // Function to handle navigation on menu item click
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        bgcolor: '#00796b',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '1rem', color: '#e0f7fa' }}>
        Healthcare System
      </Typography>
      <List component="nav" sx={{ flexGrow: 1 }}>
        <ListItem button onClick={() => handleNavigation('/dashboard')}>
          <ListItemIcon sx={{ color: '#e0f7fa' }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/health')}>
          <ListItemIcon sx={{ color: '#e0f7fa' }}>
            <LocalHospitalIcon />
          </ListItemIcon>
          <ListItemText primary="Health" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/crime')}>
          <ListItemIcon sx={{ color: '#e0f7fa' }}>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="Crime" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/seniorcitizen')}>
          <ListItemIcon sx={{ color: '#e0f7fa' }}>
            <LocalHospitalIcon />
          </ListItemIcon>
          <ListItemText primary="Senior Citizen" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/familyconcern')}>
          <ListItemIcon sx={{ color: '#e0f7fa' }}>
            <FamilyRestroomIcon />
          </ListItemIcon>
          <ListItemText primary="Family Concern" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/settings')}>
          <ListItemIcon sx={{ color: '#e0f7fa' }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
      <Divider sx={{ bgcolor: '#e0f7fa', margin: '1rem 0' }} />
      <Box sx={{ padding: '1rem' }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<LogoutIcon />}
          sx={{ width: '100%', bgcolor: '#d32f2f', '&:hover': { bgcolor: '#b71c1c' } }}
          onClick={handleLogoutClick}
        >
          Logout
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={handleCancelLogout}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="secondary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Sidebar;
