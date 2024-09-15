import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from '../../../templates/Sidebar';

const CounsellingSupport = () => {
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
        <h2 style={{ marginBottom: '20px', fontSize: '30px', color: "#0B8769", marginLeft: '50px' }}>COUNSELLING AND SUPPORT</h2>
        
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
            marginRight: 'auto', // Push tabs to the left
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
                  whiteSpace: 'normal' // Ensures text wraps instead of overflowing
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0A6B5F'} // Hover effect
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0B8769'} // Reset hover effect
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <button style={{ 
            marginLeft: 'auto', // Aligns button to the right
            padding: '10px 20px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}>
            + New Record
          </button>
          <input 
            type="text" 
            placeholder="Search records" 
            style={{ padding: '10px', width: '200px', borderRadius: '5px', border: '1px solid #ccc', marginLeft: '20px' }} 
          />
        </div>
        
        <div style={{ 
          overflowX: 'auto', 
          backgroundColor: '#fff', 
          borderRadius: '5px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
          maxWidth: 'calc(100% - 30px)', // Adjusted to prevent overflow
          marginLeft: '50px' // Align with tabs and header
        }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse', 
            minWidth: '600px', // Ensures the table is not too narrow
            marginLeft: '0' // Align the table with its container
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Case ID</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Client Name</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Counselor</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Date of Session</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(8)].map((_, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px' }}>C-000000{index + 1}</td>
                  <td style={{ padding: '12px' }}>Jane Doe</td>
                  <td style={{ padding: '12px' }}>Dr. Smith</td>
                  <td style={{ padding: '12px' }}>2024-09-0{index + 1}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button 
                      style={{ 
                        padding: '8px 12px', 
                        backgroundColor: '#4CAF50', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px', 
                        marginRight: '8px', 
                        cursor: 'pointer' 
                      }}>
                      Update
                    </button>
                    <button 
                      style={{ 
                        padding: '8px 12px', 
                        backgroundColor: '#f44336', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: 'pointer' 
                      }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CounsellingSupport;
