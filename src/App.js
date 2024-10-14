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

import Settings from './components/Menu/Settings/Settings';

function App() {
  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated() ? <Navigate to="/landing" /> : <Login />} />
        <Route path="/landing" element={isAuthenticated() ? <LandingPage /> : <Navigate to="/" />} />
        <Route path="/residents" element={isAuthenticated() ? <Residents /> : <Navigate to="/" />} />
        <Route path="/health" element={isAuthenticated() ? <Health /> : <Navigate to="/" />} />
        <Route path="/patientmanagement" element={isAuthenticated() ? <PatientManagement /> : <Navigate to="/" />} />
        <Route path="/healthrecords" element={isAuthenticated() ? <HealthRecords /> : <Navigate to="/" />} />
        <Route path="/medicine" element={isAuthenticated() ? <Medicine /> : <Navigate to="/" />} />
        <Route path="/vaccine" element={isAuthenticated() ? <Vaccine /> : <Navigate to="/" />} />
        <Route path="/patients" element={isAuthenticated() ? <Patients /> : <Navigate to="/" />} />

        <Route path="/crime" element={isAuthenticated() ? <Crime /> : <Navigate to="/" />} />
        <Route path="/crimereports" element={isAuthenticated() ? <CrimeReports /> : <Navigate to="/" />} />
        <Route path="/suspects" element={isAuthenticated() ? <Suspects /> : <Navigate to="/" />} />
        <Route path="/victims" element={isAuthenticated() ? <Victims /> : <Navigate to="/" />} />

        <Route path="/seniorcitizen" element={isAuthenticated() ? <SeniorCitizen /> : <Navigate to="/" />} />
        <Route path="/seniorcitizendata" element={isAuthenticated() ? <SeniorCitizenData /> : <Navigate to="/" />} />

        <Route path="/familyconcern" element={isAuthenticated() ? <FamilyConcern /> : <Navigate to="/" />} />
        <Route path="/familyprofiles" element={isAuthenticated() ? <FamilyProfiles /> : <Navigate to="/" />} />
        <Route path="/familyplanning" element={isAuthenticated() ? <FamilyPlanning /> : <Navigate to="/" />} />
        <Route path="/counsellingsupport" element={isAuthenticated() ? <CounsellingSupport /> : <Navigate to="/" />} />

        <Route path="/settings" element={isAuthenticated() ? <Settings /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
