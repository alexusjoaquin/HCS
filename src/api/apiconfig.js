const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const apiconfig = {
  // Patients API
  patients: {
    create: `${API_BASE_URL}/patients`, // POST
    update: `${API_BASE_URL}/patients`, // PUT
    delete: `${API_BASE_URL}/patients`, // DELETE
    getById: (id) => `${API_BASE_URL}/patients/${id}`, // GET /{id}
    getAll: `${API_BASE_URL}/patients/all`, // GET /all
  },

  // Appointments API
  appointments: {
    create: `${API_BASE_URL}/appointment`, // POST
    update: `${API_BASE_URL}/appointment`, // PUT
    delete: `${API_BASE_URL}/appointment`, // DELETE
    getById: (id) => `${API_BASE_URL}/appointment/${id}`, // GET /{id}
    getAll: `${API_BASE_URL}/appointment/all`, // GET /all
  },

  // Bills and Payments API
  billsAndPayments: {
    create: `${API_BASE_URL}/billsandpayments`, // POST
    update: `${API_BASE_URL}/billsandpayments`, // PUT
    delete: `${API_BASE_URL}/billsandpayments`, // DELETE
    getById: (id) => `${API_BASE_URL}/billsandpayments/${id}`, // GET /{id}
    getAll: `${API_BASE_URL}/billsandpayments/all`, // GET /all
  },

  // Lab Test API
  labTest: {
    create: `${API_BASE_URL}/labtest`, // POST
    update: `${API_BASE_URL}/labtest`, // PUT
    delete: `${API_BASE_URL}/labtest`, // DELETE
    getById: (id) => `${API_BASE_URL}/labtest/${id}`, // GET /{id}
    getAll: `${API_BASE_URL}/labtest/all`, // GET /all
  },

  // Medical Records API
  medical: {
    create: `${API_BASE_URL}/medical`, // POST
    update: `${API_BASE_URL}/medical`, // PUT
    delete: `${API_BASE_URL}/medical`, // DELETE
    getById: (id) => `${API_BASE_URL}/medical/${id}`, // GET /{id}
    getAll: `${API_BASE_URL}/medical/all`, // GET /all
  },

  // User Management API
  users: {
    createUser: `${API_BASE_URL}/createUser`, // POST to create a new user
    getUsers: `${API_BASE_URL}/getUsers`, // GET to retrieve all users
    loginUser: `${API_BASE_URL}/loginUser`, // POST to login a user
  },

  //Crime Reports API
  crime: {
    create: `${API_BASE_URL}/CrimeReports`, // POST
    update: `${API_BASE_URL}/CrimeReports`, // PUT
    delete: `${API_BASE_URL}/CrimeReports`, // DELETE
    getById: (id) => `${API_BASE_URL}/CrimeReports/${id}`, // GET /{id}
    getAll: `${API_BASE_URL}/CrimeReports/all`, // GET /all
  },

  //Incident Management API
  incident: {
    create: `${API_BASE_URL}/IncidentReports`, // POST
    update: `${API_BASE_URL}/IncidentReports`, // PUT
    delete: `${API_BASE_URL}/IncidentReports`, // DELETE
    getById: (id) => `${API_BASE_URL}/IncidentReports/${id}`, // GET /{id}
    getAll: `${API_BASE_URL}/IncidentReports/all`, // GET /all
  },

  investigation: {
    create: `${API_BASE_URL}/Investigations`, // POST
    update: `${API_BASE_URL}/Investigations`, // PUT
    delete: `${API_BASE_URL}/Investigations`, // DELETE
    getById: (id) => `${API_BASE_URL}/Investigations/${id}`, // GET /{id}
    getAll: `${API_BASE_URL}/Investigations/all`, // GET /all
  },

};

export default apiconfig;
