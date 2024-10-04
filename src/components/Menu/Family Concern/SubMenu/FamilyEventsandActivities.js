import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import FamilyEventsModal from '../Modals/FamilyEventsModal/FamilyEventsModal';
import FamilyEventsViewModal from '../Modals/FamilyEventsViewModal/FamilyEventsViewModal';
import FamilyEventsUpdateModal from '../Modals/FamilyEventsUpdateModal/FamilyEventsUpdateModal';
import familyeventService from '../../../services/familyeventService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const FamilyEventsandActivities = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [familyEvents, setFamilyEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFamilyEvents();
  }, []);

  const fetchFamilyEvents = async () => {
    try {
      const response = await familyeventService.getAllFamilyEvents();
      if (response && Array.isArray(response)) {
        setFamilyEvents(response);
      } else {
        console.warn('Fetched data is not an array:', response);
        setFamilyEvents([]);
      }
    } catch (error) {
      console.error('Failed to fetch family events:', error);
      toast.error('Failed to fetch family events. ' + error.message);
    }
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleNewEvent = () => {
    setSelectedEvent(null);
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleCreateSubmit = async (data) => {
    try {
      const eventData = {
        EventID: `EVT-${Math.floor(Date.now() / 1000)}`,
        EventName: data.EventName,
        Date: data.Date,
        Location: data.Location,
        Description: data.Description,
      };

      await familyeventService.createFamilyEvent(eventData);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Event created successfully!',
        confirmButtonText: 'OK',
      });
      setCreateModalOpen(false);
      fetchFamilyEvents();
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to create event: ' + error.message);
    }
  };

  const handleView = (event) => {
    setSelectedEvent(event);
    setViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedEvent(null);
  };

  const handleUpdate = (event) => {
    if (event) {
      setSelectedEvent(event);
      setUpdateModalOpen(true);
    }
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedEvent(null);
  };

  const handleUpdateSubmit = async (data) => {
    try {
      const updatedEvent = {
        EventID: selectedEvent.EventID,
        EventName: data.EventName,
        Date: data.Date,
        Location: data.Location,
        Description: data.Description,
      };

      await familyeventService.updateFamilyEvent(updatedEvent);
      MySwal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Event updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false);
      fetchFamilyEvents();
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Failed to update event: ' + error.message);
    }
  };

  const handleDelete = async (eventID) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this event?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await familyeventService.deleteFamilyEvent(eventID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Event has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchFamilyEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
        toast.error('Failed to delete event: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h2 className="header">FAMILY EVENTS AND ACTIVITIES</h2>

        <div className="tabs">
          <ul className="tab-list">
            {[
              { label: <><span>Family</span><br /><span>Profiles</span></>, path: '/familyprofiles' },
              { label: <><span>Member</span><br /><span>Management</span></>, path: '/membermanagement' },
              { label: <><span>Health</span><br /><span>& Well Being</span></>, path: '/healthandwellbeing' },
              { label: <><span>Member</span><br /><span>Education</span></>, path: '/education' },
              { label: <><span>Financial</span><br /><span>Assistance</span></>, path: '/financialassistance' },
              { label: <><span>Social</span><br /><span>Services</span></>, path: '/familysocialservices' },
              { label: <><span>Counselling</span><br /><span>& Support</span></>, path: '/counsellingsupport' },
              { label: <><span>Events</span><br /><span>& Activities</span></>, path: '/familyeventsandactivities' },
              { label: <><span>Report</span><br /><span>& Analytics</span></>, path: '/familyreportsandanalytics' },
            ].map((tab, index) => (
              <li key={index} onClick={() => handleTabClick(tab.path)} className="tab">
                {tab.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="button-container">
          <button className="new-record-button" onClick={handleNewEvent}>
            + New Event
          </button>
          <input
            type="text"
            placeholder="Search events"
            className="search-input"
          />
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Event ID</th>
                <th>Event Name</th>
                <th>Date</th>
                <th>Location</th>
                <th>Description</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(familyEvents) && familyEvents.length > 0 ? (
                familyEvents.map((event) => (
                  <tr key={event.EventID}>
                    <td>{event.EventID}</td>
                    <td>{event.EventName}</td>
                    <td>{event.Date}</td>
                    <td>{event.Location}</td>
                    <td>{event.Description}</td>
                    <td className="actions">
                      <button className="view-button" onClick={() => handleView(event)}>
                        View
                      </button>
                      <button className="update-button" onClick={() => handleUpdate(event)}>
                        Update
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(event.EventID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    No events found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for New Event */}
      {isCreateModalOpen && (
        <FamilyEventsModal
          isOpen={isCreateModalOpen}
          onClose={handleCreateModalClose}
          onSubmit={handleCreateSubmit}
        />
      )}

      {/* Modal for Viewing Event */}
      {isViewModalOpen && (
        <FamilyEventsViewModal
          isOpen={isViewModalOpen}
          onClose={handleViewModalClose}
          event={selectedEvent}
        />
      )}

      {/* Modal for Updating Event */}
      {isUpdateModalOpen && (
        <FamilyEventsUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={handleUpdateModalClose}
          onSave={handleUpdateSubmit}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default FamilyEventsandActivities;
