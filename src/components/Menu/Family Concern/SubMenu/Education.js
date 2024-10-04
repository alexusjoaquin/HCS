import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../templates/Sidebar';
import educationService from '../../../services/educationService';
import EducationModal from '../Modals/EducationModal/EducationModal';
import EducationViewModal from '../Modals/EducationViewModal/EducationViewModal';
import EducationUpdateModal from '../Modals/EducationUpdateModal/EducationUpdateModal';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Education = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await educationService.getAllEducationRecords();
      if (response && Array.isArray(response)) {
        setStudents(response);
      } else {
        console.warn('Fetched data is not an array:', response);
        setStudents([]);
      }
    } catch (error) {
      console.error('Failed to fetch students:', error);
      toast.error('Failed to fetch students. ' + error.message);
    }
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleNewRecord = () => {
    setSelectedStudent(null);
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleCreateSubmit = async (data) => {
    try {
      await educationService.createEducationRecord(data);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Student record created successfully!',
        confirmButtonText: 'OK',
      });
      setCreateModalOpen(false);
      fetchStudents();
    } catch (error) {
      console.error('Error creating student record:', error);
      toast.error('Failed to create student record: ' + error.message);
    }
  };

  const handleView = (student) => {
    setSelectedStudent(student);
    setViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedStudent(null);
  };

  const handleUpdate = (student) => {
    if (student) {
      setSelectedStudent(student);
      setUpdateModalOpen(true);
    }
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedStudent(null);
  };

  const handleUpdateSubmit = async (data) => {
    try {
      await educationService.updateEducationRecord({ ...selectedStudent, ...data });
      MySwal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Student record updated successfully!',
        confirmButtonText: 'OK',
      });
      setUpdateModalOpen(false);
      fetchStudents();
    } catch (error) {
      console.error('Error updating student record:', error);
      toast.error('Failed to update student record: ' + error.message);
    }
  };

  const handleDelete = async (studentID) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this student record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await educationService.deleteEducationRecord(studentID);
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Student record has been deleted.',
          confirmButtonText: 'OK',
        });
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student record:', error);
        toast.error('Failed to delete student record: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h2 className="header">EDUCATION</h2>

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
          <button className="new-record-button" onClick={handleNewRecord}>
            + New Record
          </button>
          <input
            type="text"
            placeholder="Search records"
            className="search-input"
          />
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Full Name</th>
                <th>Course</th>
                <th>Enrollment Status</th>
                <th>School Name</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(students) && students.length > 0 ? (
                students.map((student) => (
                  <tr key={student.StudentID}>
                    <td>{student.StudentID}</td>
                    <td>{student.FullName}</td>
                    <td>{student.Course}</td>
                    <td>{student.EnrollmentStatus}</td>
                    <td>{student.SchoolName}</td>
                    <td className="actions">
                      <button className="view-button" onClick={() => handleView(student)}>
                        View
                      </button>
                      <button className="update-button" onClick={() => handleUpdate(student)}>
                        Update
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(student.StudentID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    No student records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for New Student Record */}
      {isCreateModalOpen && (
        <EducationModal
          isOpen={isCreateModalOpen}
          onClose={handleCreateModalClose}
          onSubmit={handleCreateSubmit}
        />
      )}

      {/* Modal for Viewing Student Record */}
      {isViewModalOpen && (
        <EducationViewModal
          isOpen={isViewModalOpen}
          onClose={handleViewModalClose}
          student={selectedStudent}
        />
      )}

      {/* Modal for Updating Student Record */}
      {isUpdateModalOpen && (
        <EducationUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={handleUpdateModalClose}
          onSave={handleUpdateSubmit}
          student={selectedStudent}
        />
      )}
    </div>
  );
};

export default Education;
