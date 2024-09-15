import React from 'react';
import Sidebar from '../../templates/Sidebar';
import { useNavigate } from 'react-router-dom';

const Health = () => {
  const navigate = useNavigate();

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ 
        flex: 1, 
        padding: '20px', 
        marginLeft: '250px', 
        boxSizing: 'border-box', 
        overflow: 'hidden' 
      }}>
        <h2 style={{ marginBottom: '20px', fontSize: '30px', color: "#0B8769", marginLeft: '50px' }}>HEALTH</h2>
        
        {/* Tabs Section */}
        <div style={{ 
          marginBottom: '20px', 
          display: 'flex', 
          alignItems: 'center', 
          marginLeft: '50px' // Align with header
        }}>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            margin: 0, 
            display: 'flex', 
            alignItems: 'center',
            marginRight: 'auto' // Push tabs to the left
          }}>
            {[
              { label: 'Patient Management', path: '/patientmanagement' },
              { label: 'Appointments', path: '/appointment' },
              { label: 'Medical Records', path: '/medicalrecords' },
              { label: 'Laboratory Test', path: '/laboratorytest' },
              { label: 'Bills and Payments', path: '/billspayment' },
              { label: 'Report and Analytics', path: '/reportsandanalytics' }
            ].map((tab, index) => (
              <li 
                key={index} 
                onClick={() => handleTabClick(tab.path)} 
                style={{ 
                  marginRight: '10px', 
                  cursor: 'pointer', 
                  padding: '10px 20px', 
                  borderRadius: '5px', 
                  backgroundColor: '#0B8769', // Updated background color
                  color: 'white', // Updated text color
                  textAlign: 'center', 
                  transition: 'background-color 0.3s, transform 0.3s', 
                  fontWeight: 'bold',
                  minWidth: '150px', // Uniform width
                  textOverflow: 'ellipsis', 
                  whiteSpace: 'nowrap', 
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0A6B5F'} // Hover effect
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0B8769'} // Reset hover effect
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Content Below Tabs */}
        <div style={{ marginLeft: '50px' }}>
          <h3 style={{ fontSize: '24px', color: "#0B8769", marginBottom: '10px' }}>Overview</h3>
          <p>
            Welcome to the Health section. Here, you can manage patient data, schedule appointments, access medical records, and handle billing and payments.
            Explore the features designed to support and streamline health management processes.
          </p>

          <section style={{ marginTop: '30px' }}>
            <h3 style={{ fontSize: '24px', color: "#0B8769", marginBottom: '10px' }}>Featured Resources</h3>
            <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
              <li><a href="/patientmanagement">Patient Management: Manage patient information and medical histories.</a></li>
              <li><a href="/appointment">Appointments: Schedule and manage patient appointments.</a></li>
              <li><a href="/medicalrecords">Medical Records: Access and update patient medical records.</a></li>
              <li><a href="/laboratorytest">Laboratory Test: View and manage laboratory test results.</a></li>
              <li><a href="/billspayment">Bills and Payments: Handle billing and payment processes.</a></li>
              <li><a href="/reportsandanalytics">Report and Analytics: Generate and view reports and analytics related to health data.</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Health;
