import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';

const BillsPayment = () => {
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
        <h2 style={{ marginBottom: '20px', fontSize: '30px', color: "#0B8769", marginLeft: '50px' }}>BILLS AND PAYMENTS</h2>
        
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
              { name: 'Patient Management', path: '/patientmanagement' },
              { name: 'Appointments', path: '/appointment' },
              { name: 'Medical Records', path: '/medicalrecords' },
              { name: 'Laboratory Test', path: '/laboratorytest' },
              { name: 'Bills and Payments', path: '/billspayment' },
              { name: 'Report and Analytics', path: '/reportsandanalytics' }
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
                {tab.name}
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
            + New Bill
          </button>
          <input 
            type="text" 
            placeholder="Search bills" 
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
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Bill ID</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Patient Name</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Amount Due</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Due Date</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Payment Status</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(8)].map((_, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px' }}>B-0000001</td>
                  <td style={{ padding: '12px' }}>Jonard Matados</td>
                  <td style={{ padding: '12px' }}>$500.00</td>
                  <td style={{ padding: '12px' }}>2024-09-15</td>
                  <td style={{ padding: '12px', color: 'red' }}>Pending</td>
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

export default BillsPayment;
