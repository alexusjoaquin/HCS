import React from 'react';
import Sidebar from '../../templates/Sidebar';
import { useNavigate } from 'react-router-dom';

const SeniorCitizen = () => {
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
        <h2 style={{ marginBottom: '20px', fontSize: '30px', color: "#0B8769", marginLeft: '50px' }}>SENIOR CITIZEN</h2>
        
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
              { label: 'Senior Citizen', path: '/seniorcitizendata' },
              { label: 'Health Management', path: '/healthmanagement' },
              { label: 'Events & Activities', path: '/eventsandactivities' },
              { label: 'Social Service', path: '/socialservice' },
              { label: 'Benefits & Entitlements w/ Pension', path: '/benifitswithpension' },
              { label: 'Without Pension', path: '/benifitswithoutpension' },
              { label: 'Report and Analytics', path: '/seniorreportsandanalytics' }
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
            Welcome to the Senior Citizen section. Here, you'll find information and resources tailored specifically for senior citizens.
            Explore various services, benefits, and activities designed to support and enrich the lives of seniors in our community.
          </p>

          <section style={{ marginTop: '30px' }}>
            <h3 style={{ fontSize: '24px', color: "#0B8769", marginBottom: '10px' }}>Featured Resources</h3>
            <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
              <li><a href="/seniorcitizendata">Senior Citizen Data: Access information on senior citizen demographics and data.</a></li>
              <li><a href="/healthmanagement">Health Management: Resources for managing health and wellness.</a></li>
              <li><a href="/eventsandactivities">Events & Activities: Find upcoming events and activities for seniors.</a></li>
              <li><a href="/socialservice">Social Service: Access various social services available for seniors.</a></li>
              <li><a href="/benifitswithpension">Benefits & Entitlements w/ Pension: Information on benefits and entitlements for pensioners.</a></li>
              <li><a href="/benifitswithoutpension">Without Pension: Explore benefits and support options available for non-pensioners.</a></li>
              <li><a href="/seniorreportsandanalytics">Report and Analytics: Review reports and analytics related to senior citizens.</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SeniorCitizen;
