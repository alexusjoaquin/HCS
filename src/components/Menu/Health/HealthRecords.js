import React from 'react';
import Sidebar from '../../templates/Sidebar';
import { useNavigate } from 'react-router-dom';

const HealthRecords = () => {
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
        <h2 style={{ marginBottom: '20px', fontSize: '30px', color: "#0B8769", marginLeft: '50px' }}>HEALTH RECORDS</h2>
        
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
              { label: 'Medicine', path: '/medicine' },
              { label: 'Vaccine', path: '/vaccine' },
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
            In the Health Records section, you can manage and track patient medicine prescriptions and vaccine records.
            Navigate between the tabs to view and update health information.
          </p>

          <section style={{ marginTop: '30px' }}>
            <h3 style={{ fontSize: '24px', color: "#0B8769", marginBottom: '10px' }}>Featured Resources</h3>
            <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
              <li><a href="/medicine">Medicine: View and manage patient medicine prescriptions.</a></li>
              <li><a href="/vaccine">Vaccine: View and manage patient vaccine records.</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HealthRecords;
