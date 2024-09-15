import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from '../../templates/Sidebar';

const FamilyConcern = () => {
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
        <h2 style={{ marginBottom: '20px', fontSize: '30px', color: "#0B8769", marginLeft: '50px' }}>FAMILY CONCERN</h2>
        
        {/* Tabs Section */}
        <div style={{ 
          marginBottom: '20px', 
          display: 'flex', 
          alignItems: 'center', 
          marginLeft: '50px', 
          flexWrap: 'wrap' // Wrap tabs to the next line if they overflow
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
              { label: 'Family Profiles', path: '/familyprofiles' },
              { label: 'Member Management', path: '/membermanagement' },
              { label: 'Health and Well Being', path: '/healthandwellbeing' },
              { label: 'Education', path: '/education' },
              { label: 'Financial Assistance', path: '/financialassistance' },
              { label: 'Social Services', path: '/familysocialservices' },
              { label: 'Counselling and Support', path: '/counsellingsupport' },
              { label: 'Events and Activities', path: '/familyeventsandactivities' },
              { label: 'Report and Analytics', path: '/familyreportsandanalytics' }
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
                  fontWeight: 'bold',
                  minHeight: '50px', // Ensures a minimum height for the tabs
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexBasis: '120px', // Ensures the width is consistent
                  wordWrap: 'break-word', // Allows text to wrap within the tab
                  textOverflow: 'ellipsis',
                  whiteSpace: 'normal', // Ensures text wraps instead of overflowing
                  transition: 'background-color 0.3s, transform 0.3s', // Transition effect
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
            Welcome to the Family Concern section. Here you can explore various aspects related to family support and management.
            Each tab provides detailed information and resources relevant to different areas of family care.
          </p>

          <section style={{ marginTop: '30px' }}>
            <h3 style={{ fontSize: '24px', color: "#0B8769", marginBottom: '10px' }}>Featured Resources</h3>
            <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
              <li><a href="/familyprofiles">Family Profiles: Learn about family backgrounds and histories.</a></li>
              <li><a href="/membermanagement">Member Management: Tools for managing family members.</a></li>
              <li><a href="/healthandwellbeing">Health and Well Being: Access resources for maintaining health.</a></li>
              <li><a href="/education">Education: Information about educational resources and programs.</a></li>
              <li><a href="/financialassistance">Financial Assistance: Get help with financial support.</a></li>
              <li><a href="/familysocialservices">Social Services: Access to various social services.</a></li>
              <li><a href="/counsellingsupport">Counselling and Support: Find support and counselling services.</a></li>
              <li><a href="/familyeventsandactivities">Events and Activities: Upcoming family events and activities.</a></li>
              <li><a href="/familyreportsandanalytics">Report and Analytics: Review reports and analytics on family data.</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FamilyConcern;
