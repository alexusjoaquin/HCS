import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Collapse,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home'; // Icon for Residents
import HealthRecordsIcon from '@mui/icons-material/Folder'; // Icon for Health Records

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [openHealthMenu, setOpenHealthMenu] = useState(false); // State for Health dropdown
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setOpen(true);
  };

  const handleConfirmLogout = () => {
    setOpen(false);
    navigate('/'); // Redirect to the login page
  };

  const handleCancelLogout = () => {
    setOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Function to toggle the Health dropdown
  const handleHealthMenuClick = () => {
    setOpenHealthMenu(!openHealthMenu);
  };

  return (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        bgcolor: '#333333', // Dark gray background
        color: '#ffffff', // White text color
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo Container */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        {/* Use the logo from the public directory */}
        <img src={`${process.env.PUBLIC_URL}/logo.jpg`} alt="Healthcare System Logo" style={{ width: 100, height: 100, borderRadius: '50%' }} />
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '1rem', color: '#ffffff' }}>
        Healthcare System
      </Typography>
      <List component="nav" sx={{ flexGrow: 1 }}>
        <ListItem button onClick={() => handleNavigation('/landing')}>
          <ListItemIcon sx={{ color: '#bbbbbb' }}> {/* Light gray icon color */}
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        {/* Residents Menu */}
        <ListItem button onClick={() => handleNavigation('/residents')}>
          <ListItemIcon sx={{ color: '#e0f7fa' }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Residents" />
        </ListItem>

        {/* Health Menu with Dropdown */}
        <ListItem button onClick={handleHealthMenuClick}>
          <ListItemIcon sx={{ color: '#bbbbbb' }}>
            <LocalHospitalIcon />
          </ListItemIcon>
          <ListItemText primary="Health" />
          {openHealthMenu ? <ExpandLessIcon sx={{ color: '#e0f7fa' }} /> : <ExpandMoreIcon sx={{ color: '#e0f7fa' }} />}
        </ListItem>

        <Collapse in={openHealthMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleNavigation('/patientmanagement')}>
              <ListItemIcon sx={{ color: '#e0f7fa' }}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Patient Managements" />
            </ListItem>

            {/* New Submenu for Health Records */}
            <ListItem button sx={{ pl: 4 }} onClick={() => handleNavigation('/healthrecords')}>
              <ListItemIcon sx={{ color: '#e0f7fa' }}>
                <HealthRecordsIcon />
              </ListItemIcon>
              <ListItemText primary="Health Records" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={() => handleNavigation('/crime')}>
          <ListItemIcon sx={{ color: '#bbbbbb' }}>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="Crime" />
        </ListItem>

        <ListItem button onClick={() => handleNavigation('/seniorcitizen')}>
          <ListItemIcon sx={{ color: '#bbbbbb' }}>
            <LocalHospitalIcon />
          </ListItemIcon>
          <ListItemText primary="Senior Citizen" />
        </ListItem>

        <ListItem button onClick={() => handleNavigation('/familyconcern')}>
          <ListItemIcon sx={{ color: '#bbbbbb' }}>
            <FamilyRestroomIcon />
          </ListItemIcon>
          <ListItemText primary="Family Concern" />
        </ListItem>

        <ListItem button onClick={() => handleNavigation('/settings')}>
          <ListItemIcon sx={{ color: '#bbbbbb' }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>

      <Divider sx={{ bgcolor: '#444444', margin: '1rem 0' }} /> {/* Darker gray divider */}

      <Box sx={{ padding: '1rem' }}>
        <Button
          variant="contained"
          startIcon={<LogoutIcon />}
          sx={{ 
            width: '100%', 
            bgcolor: '#555555', // Medium gray button color
            color: '#ffffff', // White text color
            '&:hover': { bgcolor: '#444444' } // Darker gray on hover
          }}
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
          <Button onClick={handleCancelLogout} sx={{ color: '#333333' }}> {/* Dark gray text */}
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} sx={{ color: '#555555' }} autoFocus> {/* Medium gray text */}
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Sidebar;
