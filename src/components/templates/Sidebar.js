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
import CrimeReportIcon from '@mui/icons-material/Report'; // Icon for Crime Reports
import SuspectIcon from '@mui/icons-material/PersonSearch'; // Icon for Suspects
import VictimIcon from '@mui/icons-material/AccessibilityNew'; // Icon for Victims

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [openHealthMenu, setOpenHealthMenu] = useState(false); // State for Health dropdown
  const [openCrimeMenu, setOpenCrimeMenu] = useState(false); // State for Crime dropdown
  const [openFamilyMenu, setOpenFamilyMenu] = useState(false); // State for Family Concern dropdown
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

  // Function to toggle the Crime dropdown
  const handleCrimeMenuClick = () => {
    setOpenCrimeMenu(!openCrimeMenu);
  };

  // Function to toggle the Family Concern dropdown
  const handleFamilyMenuClick = () => {
    setOpenFamilyMenu(!openFamilyMenu);
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
            <ListItem button sx={{ pl: 4 }} onClick={() => handleNavigation('/patients')}>
              <ListItemIcon sx={{ color: '#e0f7fa' }}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Patient Managements" />
            </ListItem>

            {/* New Submenu for Health Records */}
            <ListItem button sx={{ pl: 4 }} onClick={() => handleNavigation('/medicine')}>
              <ListItemIcon sx={{ color: '#e0f7fa' }}>
                <HealthRecordsIcon />
              </ListItemIcon>
              <ListItemText primary="Health Records" />
            </ListItem>
          </List>
        </Collapse>

        {/* Crime Menu with Dropdown */}
        <ListItem button onClick={handleCrimeMenuClick}>
          <ListItemIcon sx={{ color: '#bbbbbb' }}>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="Crime" />
          {openCrimeMenu ? <ExpandLessIcon sx={{ color: '#e0f7fa' }} /> : <ExpandMoreIcon sx={{ color: '#e0f7fa' }} />}
        </ListItem>

        <Collapse in={openCrimeMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleNavigation('/crimereports')}>
              <ListItemIcon sx={{ color: '#e0f7fa' }}>
                <CrimeReportIcon />
              </ListItemIcon>
              <ListItemText primary="Crime Reports" />
            </ListItem>

            <ListItem button sx={{ pl: 4 }} onClick={() => handleNavigation('/suspects')}>
              <ListItemIcon sx={{ color: '#e0f7fa' }}>
                <SuspectIcon />
              </ListItemIcon>
              <ListItemText primary="Suspects" />
            </ListItem>

            <ListItem button sx={{ pl: 4 }} onClick={() => handleNavigation('/victims')}>
              <ListItemIcon sx={{ color: '#e0f7fa' }}>
                <VictimIcon />
              </ListItemIcon>
              <ListItemText primary="Victims" />
            </ListItem>
          </List>
        </Collapse>

        {/* Family Concern Menu with Dropdown */}
        <ListItem button onClick={handleFamilyMenuClick}>
          <ListItemIcon sx={{ color: '#bbbbbb' }}>
            <FamilyRestroomIcon />
          </ListItemIcon>
          <ListItemText primary="Family Concern" />
          {openFamilyMenu ? <ExpandLessIcon sx={{ color: '#e0f7fa' }} /> : <ExpandMoreIcon sx={{ color: '#e0f7fa' }} />}
        </ListItem>

        <Collapse in={openFamilyMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} onClick={() => handleNavigation('/familyprofiles')}>
              <ListItemIcon sx={{ color: '#e0f7fa' }}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Family Profiles" />
            </ListItem>

            <ListItem button sx={{ pl: 4 }} onClick={() => handleNavigation('/counsellingsupport')}>
              <ListItemIcon sx={{ color: '#e0f7fa' }}>
                <FamilyRestroomIcon />
              </ListItemIcon>
              <ListItemText primary="Family Counseling" />
            </ListItem>

            <ListItem button sx={{ pl: 4 }} onClick={() => handleNavigation('/familyplanning')}>
              <ListItemIcon sx={{ color: '#e0f7fa' }}>
                <FamilyRestroomIcon />
              </ListItemIcon>
              <ListItemText primary="Family Planning" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={() => handleNavigation('/seniorcitizendata')}>
          <ListItemIcon sx={{ color: '#bbbbbb' }}>
            <LocalHospitalIcon />
          </ListItemIcon>
          <ListItemText primary="Senior Citizen" />
        </ListItem>

        <ListItem button onClick={() => handleNavigation('/settings')}>
          <ListItemIcon sx={{ color: '#bbbbbb' }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>

      <Divider sx={{ bgcolor: '#555555' }} />

      {/* Logout Button */}
      <ListItem button onClick={handleLogoutClick}>
        <ListItemIcon sx={{ color: '#bbbbbb' }}>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>

      {/* Logout Confirmation Dialog */}
      <Dialog open={open} onClose={handleCancelLogout}>
        <DialogTitle>Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to logout?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Sidebar;
