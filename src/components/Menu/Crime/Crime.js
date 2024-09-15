import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from '../../templates/Sidebar';

const Crime = () => {
  const navigate = useNavigate(); // Create navigate function

  // Handler function for tab clicks
  const handleTabClick = (path) => {
    navigate(path); // Navigate to the specified path
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
        <h2 style={{ marginBottom: '20px', fontSize: '30px', color: "#0B8769", marginLeft: '50px' }}>CRIME</h2>
        
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
              { label: 'Crime Reports', path: '/crimereports' },
              { label: 'Incident Management', path: '/incidentmanagement' },
              { label: 'Investigation', path: '/investigation' },
              { label: 'Suspects', path: '/suspects' },
              { label: 'Victims', path: '/victims' },
              { label: 'Court Cases', path: '/courtcases' },
              { label: 'Report and Analytics', path: '/crimereportsandanalytics' }
            ].map((tab, index) => (
              <li 
                key={index} 
                onClick={() => handleTabClick(tab.path)} // Attach click handler
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
            Welcome to the Crime section. Here, you'll find comprehensive information and resources related to crime management and reporting.
            Explore various features including crime reports, incident management, investigations, and more.
          </p>

          <section style={{ marginTop: '30px' }}>
            <h3 style={{ fontSize: '24px', color: "#0B8769", marginBottom: '10px' }}>Featured Resources</h3>
            <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
              <li><a href="/crimereports">Crime Reports: View detailed reports on various crime incidents.</a></li>
              <li><a href="/incidentmanagement">Incident Management: Tools for managing and tracking incidents.</a></li>
              <li><a href="/investigation">Investigation: Access resources and tools for crime investigations.</a></li>
              <li><a href="/suspects">Suspects: Information on suspects involved in crimes.</a></li>
              <li><a href="/victims">Victims: Support and resources for crime victims.</a></li>
              <li><a href="/courtcases">Court Cases: Track ongoing and past court cases.</a></li>
              <li><a href="/crimereportsandanalytics">Report and Analytics: Review crime data and analytics reports.</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Crime;
