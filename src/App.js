import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import LandingPage from './components/main/LandingPage';

import Health from './components/Menu/Health/Health';
import Appointment from './components/Menu/Health/SubMenu/Appointments';
import BillsPayment from './components/Menu/Health/SubMenu/BillsPayment';
import PatientManagement from './components/Menu/Health/SubMenu/PatientManagement';
import LaboratoryTest from './components/Menu/Health/SubMenu/LaboratoryTest';
import MedicalRecords from './components/Menu/Health/SubMenu/MedicalRecord';
import ReportAnalytics from './components/Menu/Health/SubMenu/ReportAnalytics';

import Crime from './components/Menu/Crime/Crime'
import CourtCases from './components/Menu/Crime/SubMenu/CourtCases'
import CrimeReports from './components/Menu/Crime/SubMenu/CrimeReports'
import IncidentManagement from './components/Menu/Crime/SubMenu/IncidentManagement'
import Investigation from './components/Menu/Crime/SubMenu/Investigation'
import CrimeReportAnalytics from './components/Menu/Crime/SubMenu/CrimeReportAnalytics'
import Suspects from './components/Menu/Crime/SubMenu/Suspects'
import Victims from './components/Menu/Crime/SubMenu/Victims'

import SeniorCitizen from './components/Menu/SeniorCitizen/SeniorCitizen'
import Benifitswithoutpension from './components/Menu/SeniorCitizen/SubMenu/Benifitswithoutpension'
import Benifitswithpension from './components/Menu/SeniorCitizen/SubMenu/Benifitswithpension'
import EventsandActivities from './components/Menu/SeniorCitizen/SubMenu/EventsandActivities'
import HealthManagement from './components/Menu/SeniorCitizen/SubMenu/HealthManagement'
import SeniorCitizenData from './components/Menu/SeniorCitizen/SubMenu/SeniorCitizenData'
import SeniorsReportsandAnalytics from './components/Menu/SeniorCitizen/SubMenu/SeniorsReportsandAnalytics'
import SocialService from './components/Menu/SeniorCitizen/SubMenu/SocialService'

import FamilyConcern from './components/Menu/Family Concern/FamilyConcern'
import CounsellingSupport from './components/Menu/Family Concern/SubMenu/CounsellingSupport'
import Education from './components/Menu/Family Concern/SubMenu/Education'
import FamilyEventsandActivities from './components/Menu/Family Concern/SubMenu/FamilyEventsandActivities'
import FamilyProfiles from './components/Menu/Family Concern/SubMenu/FamilyProfiles'
import FamilyReportsandAnalytics from './components/Menu/Family Concern/SubMenu/FamilyReportsandAnalytics'
import FamilySocialServices from './components/Menu/Family Concern/SubMenu/FamilySocialServices'
import FinancialAssistance from './components/Menu/Family Concern/SubMenu/FinancialAssistance'
import HealthandWellbeing from './components/Menu/Family Concern/SubMenu/HealthandWellbeing'
import MemberManagement from './components/Menu/Family Concern/SubMenu/MemberManagement'



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/health" element= {<Health />} />
          <Route path="/appointment" element= {<Appointment />} />
          <Route path="/billspayment" element= {<BillsPayment />} />
          <Route path="/patientmanagement" element= {<PatientManagement />} />
          <Route path="/laboratorytest" element= {<LaboratoryTest />} />
          <Route path="/medicalrecords" element= {<MedicalRecords />} />
          <Route path="/reportsandanalytics" element= {<ReportAnalytics />} />
        <Route path="/crime" element= {<Crime />} />
          <Route path="/courtcases" element= {<CourtCases />} />
          <Route path="/crimereports" element= {<CrimeReports />} />
          <Route path="/incidentmanagement" element= {< IncidentManagement />} />
          <Route path="/investigation" element= {<Investigation />} />
          <Route path="/crimereportsandanalytics" element= {<CrimeReportAnalytics />} />
          <Route path="/suspects" element= {<Suspects />} />
          <Route path="/victims" element= {<Victims />} />
        <Route path="/seniorcitizen" element= {<SeniorCitizen />} />
          <Route path="/benifitswithpension" element= {<Benifitswithpension />} />
          <Route path="/benifitswithoutpension" element= {<Benifitswithoutpension />} />
          <Route path="/eventsandactivities" element= {< EventsandActivities />} />
          <Route path="/healthmanagement" element= {< HealthManagement />} />
          <Route path="/seniorcitizendata" element= {<SeniorCitizenData/>} />
          <Route path="/socialservice" element= {<SocialService />} />
          <Route path="/seniorreportsandanalytics" element= {<SeniorsReportsandAnalytics />} />
        <Route path="/familyconcern" element= {<FamilyConcern />} />
          <Route path="/education" element= {<Education />} />
          <Route path="/familyeventsandactivities" element= {<FamilyEventsandActivities />} />
          <Route path="/familyprofiles" element= {< FamilyProfiles />} />
          <Route path="/familyreportsandanalytics" element= {< FamilyReportsandAnalytics />} />
          <Route path="/familysocialservices" element= {<FamilySocialServices/>} />
          <Route path="/financialassistance" element= {<FinancialAssistance />} />
          <Route path="/healthandwellbeing" element= {<HealthandWellbeing />} />
          <Route path="/membermanagement" element= {<MemberManagement />} />
          <Route path="/counsellingsupport" element= {<CounsellingSupport />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
