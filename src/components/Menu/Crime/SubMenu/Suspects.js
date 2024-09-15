import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Sidebar from '../../../templates/Sidebar';

const Suspects = () => {
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
        <h2 style={{ marginBottom: '20px', fontSize: '30px', color: "#0B8769", marginLeft: '50px' }}>SUSPECTS</h2>
        
        {/* Tabs Section */}
        <div style={{ 
          marginBottom: '20px', 
          display: 'flex', 
          alignItems: 'center', 
          marginLeft: '50px' 
        }}>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            margin: 0, 
            display: 'flex', 
            alignItems: 'center',
            marginRight: 'auto' 
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
                onClick={() => handleTabClick(tab.path)} 
                style={{ 
                  marginRight: '10px', 
                  cursor: 'pointer', 
                  padding: '10px 20px', 
                  borderRadius: '5px', 
                  backgroundColor: '#0B8769', 
                  color: 'white', 
                  textAlign: 'center', 
                  transition: 'background-color 0.3s, transform 0.3s', 
                  fontWeight: 'bold',
                  minWidth: '150px', 
                  textOverflow: 'ellipsis', 
                  whiteSpace: 'nowrap', 
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0A6B5F'} 
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0B8769'} 
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <button style={{ 
            marginLeft: 'auto', 
            padding: '10px 20px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}>
            + New Suspect
          </button>
          <input 
            type="text" 
            placeholder="Search suspects" 
            style={{ padding: '10px', width: '200px', borderRadius: '5px', border: '1px solid #ccc', marginLeft: '20px' }} 
          />
        </div>
        
        <div style={{ 
          overflowX: 'auto', 
          backgroundColor: '#fff', 
          borderRadius: '5px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
          maxWidth: 'calc(100% - 30px)', 
          marginLeft: '50px' 
        }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse', 
            minWidth: '600px', 
            marginLeft: '0' 
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Suspect ID</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Full Name</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Alias</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Last Known Address</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Status</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(8)].map((_, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px' }}>S-0000001</td>
                  <td style={{ padding: '12px' }}>Jonard Matados</td>
                  <td style={{ padding: '12px' }}>Johnny M</td>
                  <td style={{ padding: '12px' }}>Quezon City</td>
                  <td style={{ padding: '12px' }}>Wanted</td>
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
                      View
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

export default Suspects;
