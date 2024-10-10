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

  suspect: {
    create: `${API_BASE_URL}/Suspects`, // POST
    update: `${API_BASE_URL}/Suspects`, // PUT
    delete: `${API_BASE_URL}/Suspects`, // DELETE
    getById: (id) => `${API_BASE_URL}/Suspects/${id}`, // GET /{id}
    getAll: `${API_BASE_URL}/Suspects/all`, // GET /all
  },

  victims: {
    create: `${API_BASE_URL}/Victims`, // POST
    update: `${API_BASE_URL}/Victims`, // PUT
    delete: `${API_BASE_URL}/Victims`, // DELETE
    getById: (id) => `${API_BASE_URL}/Victims/${id}`, // GET /{id}
    getAll: `${API_BASE_URL}/Victims/all`, // GET /all
  },

  courtcases: {
    create: `${API_BASE_URL}/CourtCases`, // POST
    update: `${API_BASE_URL}/CourtCases`, // PUT
    delete: `${API_BASE_URL}/CourtCases`, // DELETE
    getById: (id) => `${API_BASE_URL}/CourtCases/${id}`, // GET /{id}
    getAll: `${API_BASE_URL}/CourtCases/all`, // GET /all
  },

  seniorcitizens: {
    create: `${API_BASE_URL}/SeniorCitizens`, // POST
    update: `${API_BASE_URL}/SeniorCitizens`, // PUT
    delete: `${API_BASE_URL}/SeniorCitizens`, // DELETE
    getById: (id) => `${API_BASE_URL}/SeniorCitizens/${id}`, // GET /{id}
    getAll: `${API_BASE_URL}/SeniorCitizens/all`, // GET /all
  },

  healthmanagement: {
    create: `${API_BASE_URL}/HealthManagement`, // POST
    update: `${API_BASE_URL}/HealthManagement`, // PUT
    delete: `${API_BASE_URL}/HealthManagement`, // DELETE
    getById: (id) => `${API_BASE_URL}/HealthManagement/${id}`, // GET /{id}
    getAll: `${API_BASE_URL}/HealthManagement/all`, // GET /all
  },

  event: {
    create: `${API_BASE_URL}/Events`, // POST
    update: `${API_BASE_URL}/Events`, // PUT
    delete: `${API_BASE_URL}/Events`, // DELETE
    getById: (id) => `${API_BASE_URL}/Events/${id}`, // GET /{id}
    getAll: `${API_BASE_URL}/Events/all`, // GET /all
  },

  seniorsocial: {
    create: `${API_BASE_URL}/SocialServices`, // POST
    update: `${API_BASE_URL}/SocialServices`, // PUT
    delete: `${API_BASE_URL}/SocialServices`, // DELETE
    getById: (id) => `${API_BASE_URL}/SocialServices/${id}`, // GET /{id}
    getAll: `${API_BASE_URL}/SocialServices/all`, // GET /all
  },

  pensionbenifits: {
    create: `${API_BASE_URL}/Benifits`, // POST
    update: `${API_BASE_URL}/Benifits`, // PUT
    delete: `${API_BASE_URL}/Benifits`, // DELETE
    getById: (id) => `${API_BASE_URL}/Benifits/${id}`, // GET /{id}
    getAll: `${API_BASE_URL}/Benifits/all`, // GET /all
  },

  nopensionbenifits: {
    create: `${API_BASE_URL}/SeniorsBenefits`, // POST
    update: `${API_BASE_URL}/SeniorsBenefits`, // PUT
    delete: `${API_BASE_URL}/SeniorsBenefits`, // DELETE
    getById: (id) => `${API_BASE_URL}/SeniorsBenefits/${id}`, // GET /{id}
    getAll: `${API_BASE_URL}/SeniorsBenefits/all`, // GET /all
  },

  familyprofiles: {
    create: `${API_BASE_URL}/FamilyProfiles`, // POST
    update: `${API_BASE_URL}/FamilyProfiles`, // PUT
    delete: `${API_BASE_URL}/FamilyProfiles`, // DELETE
    getById: (id) => `${API_BASE_URL}/FamilyProfiles/${id}`, // GET /{id}
    getAll: `${API_BASE_URL}/FamilyProfiles/all`, // GET /all
  },

  familyevents: {
    create: `${API_BASE_URL}/FamilyEventsActivities`, // POST
    update: `${API_BASE_URL}/FamilyEventsActivities`, // PUT
    delete: `${API_BASE_URL}/FamilyEventsActivities`, // DELETE
    getById: (id) => `${API_BASE_URL}/FamilyEventsActivities/${id}`, // GET /{id}
    getAll: `${API_BASE_URL}/FamilyEventsActivities/all`, // GET /all
  },

  familycounselling: {
    create: `${API_BASE_URL}/FamilyCounselingSupport`, // POST
    update: `${API_BASE_URL}/FamilyCounselingSupport`, // PUT
    delete: `${API_BASE_URL}/FamilyCounselingSupport`, // DELETE
    getById: (id) => `${API_BASE_URL}/FamilyCounselingSupport/${id}`, // GET /{id}
    getAll: `${API_BASE_URL}/FamilyCounselingSupport/all`, // GET /all
  },

  familysocialservice: {
    create: `${API_BASE_URL}/FamilySocialServices`, // POST
    update: `${API_BASE_URL}/FamilySocialServices`, // PUT
    delete: `${API_BASE_URL}/FamilySocialServices`, // DELETE
    getById: (id) => `${API_BASE_URL}/FamilySocialServices/${id}`, // GET /{id}
    getAll: `${API_BASE_URL}/FamilySocialServices/all`, // GET /all
  },

  financialservice: {
    create: `${API_BASE_URL}/FinancialAssistance`, // POST
    update: `${API_BASE_URL}/FinancialAssistance`, // PUT
    delete: `${API_BASE_URL}/FinancialAssistance`, // DELETE
    getById: (id) => `${API_BASE_URL}/FinancialAssistance/${id}`, // GET /{id}
    getAll: `${API_BASE_URL}/FinancialAssistance/all`, // GET /all
  },

  educationservice: {
    create: `${API_BASE_URL}/Education`, // POST
    update: `${API_BASE_URL}/Education`, // PUT
    delete: `${API_BASE_URL}/Education`, // DELETE
    getById: (id) => `${API_BASE_URL}/Education/${id}`, // GET /{id}
    getAll: `${API_BASE_URL}/Education/all`, // GET /all
  },

  members: {
    create: `${API_BASE_URL}/Members`, // POST
    update: `${API_BASE_URL}/Members`, // PUT
    delete: `${API_BASE_URL}/Members`, // DELETE
    getById: (id) => `${API_BASE_URL}/Members/${id}`, // GET /{id}
    getAll: `${API_BASE_URL}/Members/all`, // GET /all
  },

  residents: {
    create: `${API_BASE_URL}/Residents`, // POST
    update: `${API_BASE_URL}/Residents`, // PUT
    delete: `${API_BASE_URL}/Residents`, // DELETE
    getById: (id) => `${API_BASE_URL}/Residents/${id}`, // GET /{id}
    getAll: `${API_BASE_URL}/Residents/all`, // GET /all
  },
  
  resident: {
    importCSV: `${API_BASE_URL}/Resident/importCSV`, // POST for CSV import
  }
};

export default apiconfig;
