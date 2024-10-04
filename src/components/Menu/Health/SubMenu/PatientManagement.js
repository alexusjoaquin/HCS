import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios for API calls
import Sidebar from '../../../templates/Sidebar';
import apiconfig from '../../../../api/apiconfig';
import { toast } from 'react-toastify'; // For notifications
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const PatientManagement = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]); // State for storing patients
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [showViewModal, setShowViewModal] = useState(false); // State for view modal visibility
  const [showUpdateModal, setShowUpdateModal] = useState(false); // State for update modal visibility
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    DateOfBirth: '',
    ContactInfo: {
      Phone: '',
      Email: '',
      Address: ''
    },
    Gender: '',
    MedicalHistory: []
  });
  const [updateFormData, setUpdateFormData] = useState({
    FirstName: '',
    LastName: '',
    DateOfBirth: '',
    ContactInfo: {
      Phone: '',
      Email: '',
      Address: ''
    },
    Gender: '',
    MedicalHistory: []
  });
  const [patientId, setPatientId] = useState(''); // State for auto-generated Patient ID
  const [selectedPatient, setSelectedPatient] = useState(null); // State for selected patient details
  const [currentPatientId, setCurrentPatientId] = useState(''); // State for the patient being updated
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState(patients); // State for filtered patients


  useEffect(() => {
    const filterPatients = () => {
      if (searchQuery) {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = patients.filter(patient =>
          patient.FirstName.toLowerCase().includes(lowerCaseQuery) ||
          patient.LastName.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredPatients(filtered);
      } else {
        setFilteredPatients(patients); // Show all patients if search query is empty
      }
    };
    
    filterPatients();
  }, [searchQuery, patients]); // Run the effect when searchQuery or patients change
  
  // Fetch patients from the backend
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(apiconfig.patients.getAll);
        setPatients(response.data.data);

        // Generate the next patient ID based on existing patients
        const lastPatientId = response.data.data.length
          ? response.data.data[response.data.data.length - 1].PatientID
          : 'P-000000';
        const newId = `P-${(parseInt(lastPatientId.split('-')[1]) + 1)
          .toString()
          .padStart(6, '0')}`;
        setPatientId(newId);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('ContactInfo')) {
      const contactField = name.split('.')[1]; // Extract the field like Phone, Email, Address
      setFormData({
        ...formData,
        ContactInfo: {
          ...formData.ContactInfo,
          [contactField]: value
        }
      });
    } else if (name === 'MedicalHistory') {
      setFormData({ ...formData, MedicalHistory: value.split(',') }); // Assuming medical history is a comma-separated list
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handler for opening the update modal
  const handleUpdateClick = (patient) => {
    setCurrentPatientId(patient.PatientID);
    setUpdateFormData({
      FirstName: patient.FirstName || '',
      LastName: patient.LastName || '',
      DateOfBirth: patient.DateOfBirth || '',
      ContactInfo: {
        Phone: patient.ContactInfo?.Phone || '',
        Email: patient.ContactInfo?.Email || '',
        Address: patient.ContactInfo?.Address || ''
      },
      Gender: patient.Gender || '',
      MedicalHistory: Array.isArray(patient.MedicalHistory) ? patient.MedicalHistory.join(', ') : ''
    });
    setShowUpdateModal(true);
  };
  

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('ContactInfo')) {
      const contactField = name.split('.')[1];
      setUpdateFormData({
        ...updateFormData,
        ContactInfo: {
          ...updateFormData.ContactInfo,
          [contactField]: value
        }
      });
    } else if (name === 'MedicalHistory') {
      setUpdateFormData({ ...updateFormData, MedicalHistory: value.split(',').map(item => item.trim()) }); // Convert to array
    } else {
      setUpdateFormData({ ...updateFormData, [name]: value });
    }
  };
  

  const handleUpdateSubmit = async () => {
    try {
      // Initialize an array to collect error messages
      const errorMessages = [];
  
      // Example validation checks (add your specific validation rules as needed)
      if (!updateFormData.FirstName) errorMessages.push('First name is required.');
      if (!updateFormData.LastName) errorMessages.push('Last name is required.');
      if (!updateFormData.DateOfBirth) errorMessages.push('Date of birth is required.');
  
      // If there are any error messages, notify the user and return early
      if (errorMessages.length > 0) {
        errorMessages.forEach((message) => toast.error(message));
        return;
      }
  
      // Prepare the updated patient data
      const updatedPatient = {
        ...updateFormData, // Use the data from the update form
        PatientID: currentPatientId, // Ensure PatientID is included for identification
      };
  
      // Ensure MedicalHistory is an array
      updatedPatient.MedicalHistory = Array.isArray(updatedPatient.MedicalHistory)
        ? updatedPatient.MedicalHistory
        : [];
  
      // Update the patient on the backend
      await axios.put(apiconfig.patients.update, updatedPatient);
  
      // Update the state with the updated patient record
      setPatients(
        patients.map((patient) =>
          patient.PatientID === currentPatientId ? updatedPatient : patient
        )
      );
      setShowUpdateModal(false); // Close modal after submission
  
      // Show success notification
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Record updated successfully!',
        confirmButtonText: 'OK',
      });
  
      // Clear the update form
      setUpdateFormData({
        FirstName: '',
        LastName: '',
        DateOfBirth: '',
        ContactInfo: {
          Phone: '',
          Email: '',
          Address: '',
        },
        Gender: '',
        MedicalHistory: [],
      });
      setCurrentPatientId(''); // Clear currentPatientId
    } catch (error) {
      console.error('Error updating patient record:', error);
      toast.error('Failed to update patient record.');
    }
  };
  
  
  

  const handleSubmit = async () => {
    try {
      // Initialize an array to collect error messages
      const errorMessages = [];
  
  
      // If there are any error messages, notify the user and return early
      if (errorMessages.length > 0) {
        errorMessages.forEach(message => toast.error(message));
        return;
      }
  
      // Generate a new PatientID based on the current patients state
      const lastPatientId = patients.length
        ? patients[patients.length - 1].PatientID
        : 'P-000000';
      const newId = `P-${(parseInt(lastPatientId.split('-')[1]) + 1).toString().padStart(6, '0')}`;
  
      const newPatient = {
        ...formData,
        PatientID: newId // Include the newly generated PatientID
      };
  
      // Add the new patient to the backend
      await axios.post(apiconfig.patients.create, newPatient);
  
      // Notify success
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Patient record created successfully!',
        confirmButtonText: 'OK',
      });
  
      // Update the state with the new patient record without overwriting the existing ones
      setPatients([...patients, newPatient]);
      setShowModal(false); // Close modal after submission
  
      // Clear the form after submission
      setFormData({
        FirstName: '',
        LastName: '',
        DateOfBirth: '',
        ContactInfo: {
          Phone: '',
          Email: '',
          Address: ''
        },
        Gender: '',
        MedicalHistory: []
      });
  
      // Generate the next PatientID
      const newGeneratedId = `P-${(parseInt(newId.split('-')[1]) + 1).toString().padStart(6, '0')}`;
      setPatientId(newGeneratedId);
    } catch (error) {
      console.error("Error creating patient record:", error);
      toast.error('Failed to create patient record.');
    }
  };
  

  const handleView = (patient) => {
    setSelectedPatient({
      ...patient,
      MedicalHistory: Array.isArray(patient.MedicalHistory) ? patient.MedicalHistory : []
    });
    setShowViewModal(true);
  };
  

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedPatient(null);
  };

  const handleDelete = async (id) => {
    // Integrate SweetAlert2 confirm dialog
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this patient record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true,
    });
  
    if (result.isConfirmed) {
      try {
        await axios.delete(apiconfig.patients.delete, {
          data: { PatientID: id }, // Send the ID in the request body
        });
  
        // Remove the deleted patient from the state
        setPatients(patients.filter((patient) => patient.PatientID !== id));
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Patient record has been deleted.',
          confirmButtonText: 'OK',
        });
      } catch (error) {
        console.error('Error deleting patient record:', error);
        toast.error('Failed to delete patient record.');
      }
    }
    // If canceled, do nothing
  };
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setCurrentPatientId('');
    setUpdateFormData({
      FirstName: '',
      LastName: '',
      DateOfBirth: '',
      ContactInfo: {
        Phone: '',
        Email: '',
        Address: ''
      },
      Gender: '',
      MedicalHistory: []
    });
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
        <h2 style={{ marginBottom: '20px', fontSize: '30px', color: "#0B8769", marginLeft: '50px' }}>PATIENT MANAGEMENT</h2>
        
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
            {[{
              name: 'Patient Management', path: '/patientmanagement'
            }

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
                {tab.name}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <button 
            onClick={() => setShowModal(true)} // Show modal on click
            style={{ 
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Patient ID</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>First Name</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Last Name</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Date of Birth</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Gender</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient, index) => (
                  <tr key={index}>
                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{patient.PatientID}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{patient.FirstName}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{patient.LastName}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{patient.DateOfBirth}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                      {patient.Gender.charAt(0).toUpperCase() + patient.Gender.slice(1)}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
                      <button 
                        style={{
                          backgroundColor: '#4CAF50',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          padding: '5px 10px',
                          marginRight: '5px'
                        }}
                        onClick={() => handleView(patient)}>
                        View
                      </button>
                      <button 
                        style={{
                          backgroundColor: '#2196F3',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          padding: '5px 10px',
                          marginRight: '5px'
                        }}
                        onClick={() => handleUpdateClick(patient)}>
                        Update
                      </button>
                      <button 
                        onClick={() => handleDelete(patient.PatientID)} 
                        style={{ 
                          padding: '5px 10px', 
                          backgroundColor: '#DC3545', 
                          color: 'white', 
                          border: 'none', 
                          borderRadius: '3px', 
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '12px' }}>No patients found</td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
        {/* Modal for New Record */}
        {showModal && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevent default form submission
              handleSubmit(); // Call your handleSubmit function
            }}
            style={{
              backgroundColor: '#fff',
              padding: '30px',
              borderRadius: '5px',
              width: '500px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <h3>New Patient Record</h3>
            <label>Patient ID (Auto-generated)</label>
            <input
              type="text"
              value={patientId}
              readOnly
              style={{
                width: '480px',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <input
              required
              type="text"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleInputChange}
              placeholder="First Name"
              style={{
                width: '480px',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <input
              required
              type="text"
              name="LastName"
              value={formData.LastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              style={{
                width: '480px',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <input
              required
              type="date"
              name="DateOfBirth"
              value={formData.DateOfBirth}
              onChange={handleInputChange}
              style={{
                width: '480px',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <input
              required
              type="text"
              name="ContactInfo.Phone"
              value={formData.ContactInfo.Phone}
              onChange={handleInputChange}
              placeholder="Phone"
              style={{
                width: '480px',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <input
              required
              type="email"
              name="ContactInfo.Email"
              value={formData.ContactInfo.Email}
              onChange={handleInputChange}
              placeholder="Email"
              style={{
                width: '480px',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <input
              required
              type="text"
              name="ContactInfo.Address"
              value={formData.ContactInfo.Address}
              onChange={handleInputChange}
              placeholder="Address"
              style={{
                width: '480px',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <select
              required
              name="Gender"
              value={formData.Gender}
              onChange={handleInputChange}
              style={{
                width: '500px',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <textarea
              required
              name="MedicalHistory"
              value={formData.MedicalHistory}
              onChange={handleInputChange}
              placeholder="Medical History (comma separated)"
              style={{
                width: '480px',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '10px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

        {/* Modal for Viewing Patient */}
        {showViewModal && selectedPatient && (
          <div 
            style={{ 
              position: 'fixed', 
              top: '0', 
              left: '0', 
              right: '0', 
              bottom: '0', 
              backgroundColor: 'rgba(0,0,0,0.5)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
            <div style={{ 
              backgroundColor: '#fff', 
              padding: '30px', 
              borderRadius: '5px', 
              width: '500px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
            }}>
              <h3>Patient Details</h3>
              <label>Patient ID</label>
              <input 
                type="text" 
                value={selectedPatient.PatientID} 
                readOnly 
                style={{ width: '480px', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
              />
              <input 
                type="text" 
                value={selectedPatient.FirstName} 
                readOnly 
                style={{ width: '480px', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
              />
              <input 
                type="text" 
                value={selectedPatient.LastName} 
                readOnly 
                style={{ width: '480px', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
              />
              <input 
                type="date" 
                value={selectedPatient.DateOfBirth} 
                readOnly 
                style={{ width: '480px', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
              />
              <input 
                type="text" 
                value={selectedPatient.ContactInfo.Phone} 
                readOnly 
                style={{ width: '480px', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
              />
              <input 
                type="email" 
                value={selectedPatient.ContactInfo.Email} 
                readOnly 
                style={{ width: '480px', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
              />
              <input 
                type="text" 
                value={selectedPatient.ContactInfo.Address} 
                readOnly 
                style={{ width: '480px', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
              />
              <select 
                value={selectedPatient.Gender} 
                readOnly 
                style={{ width: '500px', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
              >
                <option value="Male" >Male</option>
                <option value="Female" >Female</option>
              </select>
              <textarea 
                value={selectedPatient.MedicalHistory.join(', ')} 
                readOnly 
                style={{ width: '480px', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
              />
              <button 
                onClick={handleCloseViewModal} 
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  backgroundColor: '#f44336', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer' 
                }}>
                Close
              </button>
            </div>
          </div>
        )}

        {/* Modal for Updating Patient */}
        {showUpdateModal && (
          <div 
            style={{ 
              position: 'fixed', 
              top: '0', 
              left: '0', 
              right: '0', 
              bottom: '0', 
              backgroundColor: 'rgba(0,0,0,0.5)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
            <div style={{ 
              backgroundColor: '#fff', 
              padding: '30px', 
              borderRadius: '5px', 
              width: '500px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
            }}>
              <h3>Update Patient Record</h3>
              <label>Patient ID (Read-only)</label>
              <input 
                type="text" 
                value={currentPatientId} 
                readOnly 
                style={{ width: '480px', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
              />
              <input 
                type="text" 
                name="FirstName" 
                value={updateFormData.FirstName} 
                onChange={handleUpdateInputChange} 
                placeholder="First Name" 
                style={{ width: '480px', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
              />
              <input 
                type="text" 
                name="LastName" 
                value={updateFormData.LastName} 
                onChange={handleUpdateInputChange} 
                placeholder="Last Name" 
                style={{ width: '480px', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
              />
              <input 
                type="date" 
                name="DateOfBirth" 
                value={updateFormData.DateOfBirth} 
                onChange={handleUpdateInputChange} 
                placeholder="Date of Birth" 
                style={{ width: '480px', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
              />
              <input 
                type="text" 
                name="ContactInfo.Phone" 
                value={updateFormData.ContactInfo.Phone} 
                onChange={handleUpdateInputChange} 
                placeholder="Phone" 
                style={{ width: '480px', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
              />
              <input 
                type="email" 
                name="ContactInfo.Email" 
                value={updateFormData.ContactInfo.Email} 
                onChange={handleUpdateInputChange} 
                placeholder="Email" 
                style={{ width: '480px', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
              />
              <input 
                type="text" 
                name="ContactInfo.Address" 
                value={updateFormData.ContactInfo.Address} 
                onChange={handleUpdateInputChange} 
                placeholder="Address" 
                style={{ width: '480px', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
              />
              <select 
                name="Gender" 
                value={updateFormData.Gender} 
                onChange={handleUpdateInputChange} 
                placeholder="Gender" 
                style={{ width: '500px', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
              >
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <textarea 
                name="MedicalHistory" 
                value={updateFormData.MedicalHistory} 
                onChange={handleUpdateInputChange} 
                placeholder="Medical History (comma separated)" 
                style={{ width: '480px', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
              />
              <button 
                onClick={handleUpdateSubmit} 
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  backgroundColor: '#4CAF50', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer' 
                }}>
                Save
              </button>
              <button 
                onClick={handleCloseUpdateModal} 
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  marginTop: '10px', 
                  backgroundColor: '#f44336', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer' 
                }}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientManagement;
