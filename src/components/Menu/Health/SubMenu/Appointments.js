import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import AppointmentModal from '../Modals/AppointmentModal/AppointmentModal';
import AppointmentViewModal from '../Modals/AppointmentViewModal/AppointmentViewModal';
import AppointmentUpdateModal from '../Modals/AppointmentUpdateModal/AppointmentUpdateModal'; // Import the update modal
import '../CssFiles/Appointment.css';

const Appointments = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const navigate = useNavigate();

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleNewRecord = () => {
    setSelectedAppointment(null);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setViewModalOpen(false);
  };

  const handleModalSubmit = (data) => {
    console.log('New Appointment Data:', data);
    setModalOpen(false);
  };

  const handleUpdate = (appointment) => {
    setSelectedAppointment(appointment);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    console.log(`Deleting appointment with id ${id}`);
  };

  const handleView = (appointment) => {
    setSelectedAppointment(appointment);
    setViewModalOpen(true);
  };

  const handleSave = (data) => {
    console.log('Updated Appointment Data:', data);
    setModalOpen(false);
    // Implement further logic to update the appointment in your data store
  };

  const appointments = [
    { id: 1, fullname: 'Jonard Matados', contactNumber: '1234567890', date: '2024-01-01', doctor: 'Dr. Smith' },
    // Add more sample appointments as needed
  ];

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h2 className="header">APPOINTMENTS</h2>

        <div className="tabs">
          <ul className="tab-list">
            {[ 
              { name: 'Patient Management', path: '/patientmanagement' },
              { name: 'Appointments', path: '/appointment' },
              { name: 'Medical Records', path: '/medicalrecords' },
              { name: 'Laboratory Test', path: '/laboratorytest' },
              { name: 'Bills and Payments', path: '/billspayment' },
              { name: 'Report and Analytics', path: '/reportsandanalytics' },
            ].map((tab, index) => (
              <li key={index} onClick={() => handleTabClick(tab.path)} className="tab">
                {tab.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="button-container">
          <button className="new-record-button" onClick={handleNewRecord}>
            + New Record
          </button>
          <input type="text" placeholder="Search records" className="search-input" />
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Fullname</th>
                <th>Contact no.</th>
                <th>Appointment Date</th>
                <th>Doctor</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.fullname}</td>
                  <td>{appointment.contactNumber}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.doctor}</td>
                  <td className="actions">
                    <button className="view-button" onClick={() => handleView(appointment)}>
                      View
                    </button>
                    <button className="update-button" onClick={() => handleUpdate(appointment)}>
                      Update
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(appointment.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for New Record */}
      <AppointmentModal
        isOpen={isModalOpen && selectedAppointment === null}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />

      {/* Modal for Viewing Appointment */}
      <AppointmentViewModal
        isOpen={isViewModalOpen}
        onClose={handleModalClose}
        appointment={selectedAppointment}
      />

      {/* Modal for Updating Appointment */}
      <AppointmentUpdateModal
        isOpen={isModalOpen && selectedAppointment !== null} // Only show when there's a selected appointment
        onClose={handleModalClose}
        onSave={handleSave}
        appointment={selectedAppointment || {}} // Pass an empty object if null
      />
    </div>
  );
};

export default Appointments;
