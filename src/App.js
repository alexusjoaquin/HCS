// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import LandingPage from './components/main/LandingPage';

import Residents from './components/Menu/Residents/Residents';
import Health from './components/Menu/Health/Health';
import PatientManagement from './components/Menu/Health/SubMenu/PatientManagement';
import HealthRecords from './components/Menu/Health/HealthRecords';
import Medicine from './components/Menu/Health/SubMenu/Medicine';
import Vaccine from './components/Menu/Health/SubMenu/Vaccine';
import Patients from './components/Menu/Health/SubMenu/Patients';

import Crime from './components/Menu/Crime/Crime';
import CrimeReports from './components/Menu/Crime/SubMenu/CrimeReports';
import Suspects from './components/Menu/Crime/SubMenu/Suspects';
import Victims from './components/Menu/Crime/SubMenu/Victims';

import SeniorCitizen from './components/Menu/SeniorCitizen/SeniorCitizen';
import SeniorCitizenData from './components/Menu/SeniorCitizen/SubMenu/SeniorCitizenData';

import FamilyConcern from './components/Menu/Family Concern/FamilyConcern';
import CounsellingSupport from './components/Menu/Family Concern/SubMenu/CounsellingSupport';
import FamilyProfiles from './components/Menu/Family Concern/SubMenu/FamilyProfiles';
import FamilyPlanning from './components/Menu/Family Concern/SubMenu/FamilyPlanning';

import Settings from './components/Menu/Settings/Settings'; // Import Settings component

function App() {
  //added
  const login = localStorage.getItem('username')
  return (
    <Router>
      <Routes>
        <Route path="/" element={login ? <LandingPage /> : <Login />} />
        {/* Removed the /register route */}
        <Route path="/residents" element={<Residents />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/health" element={<Health />} />
        <Route path="/patientmanagement" element={<PatientManagement />} />
        <Route path="/healthrecords" element={<HealthRecords />} />
        <Route path="/medicine" element={<Medicine />} />
        <Route path="/vaccine" element={<Vaccine />} />
        <Route path="/patients" element={<Patients />} />

        <Route path="/crime" element={<Crime />} />
        <Route path="/crimereports" element={<CrimeReports />} />
        <Route path="/suspects" element={<Suspects />} />
        <Route path="/victims" element={<Victims />} />

        <Route path="/seniorcitizen" element={<SeniorCitizen />} />
        <Route path="/seniorcitizendata" element={<SeniorCitizenData />} />

        <Route path="/familyconcern" element={<FamilyConcern />} />
        <Route path="/familyprofiles" element={<FamilyProfiles />} />
        <Route path="/familyplanning" element={<FamilyPlanning />} />
        <Route path="/counsellingsupport" element={<CounsellingSupport />} />

        <Route path="/settings" element={<Settings />} /> {/* Route for settings */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
