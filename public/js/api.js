const API_BASE_URL = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

const setToken = (token) => localStorage.setItem('token', token);

const removeToken = () => localStorage.removeItem('token');

const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const setUser = (user) => localStorage.setItem('user', JSON.stringify(user));

const removeUser = () => localStorage.removeItem('user');

const api = async (endpoint, options = {}) => {
  const token = getToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

const apiFormData = async (endpoint, formData) => {
  const token = getToken();
  
  const config = {
    method: 'POST',
    headers: {},
    body: formData
  };

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

const authAPI = {
  register: (userData) => api('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),
  
  login: (credentials) => api('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),
  
  getMe: () => api('/auth/me')
};

const profileAPI = {
  getJobSeekerProfile: (userId) => api(`/profiles/jobseeker/${userId}`),
  
  updateJobSeekerProfile: (profileData) => api('/profiles/jobseeker', {
    method: 'POST',
    body: JSON.stringify(profileData)
  }),
  
  uploadResume: (formData) => apiFormData('/profiles/jobseeker/resume', formData),
  
  getEmployerProfile: (userId) => api(`/profiles/employer/${userId}`),
  
  updateEmployerProfile: (profileData) => api('/profiles/employer', {
    method: 'POST',
    body: JSON.stringify(profileData)
  })
};

const jobAPI = {
  getAllJobs: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api(`/jobs?${queryString}`);
  },
  
  getJob: (id) => api(`/jobs/${id}`),
  
  createJob: (jobData) => api('/jobs', {
    method: 'POST',
    body: JSON.stringify(jobData)
  }),
  
  updateJob: (id, jobData) => api(`/jobs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(jobData)
  }),
  
  deleteJob: (id) => api(`/jobs/${id}`, {
    method: 'DELETE'
  }),
  
  getEmployerJobs: (employerId) => api(`/jobs/employer/${employerId}`)
};

const applicationAPI = {
  apply: (applicationData) => api('/applications', {
    method: 'POST',
    body: JSON.stringify(applicationData)
  }),
  
  getMyApplications: () => api('/applications/jobseeker'),
  
  getJobApplications: (jobId) => api(`/applications/job/${jobId}`),
  
  updateApplicationStatus: (id, status) => api(`/applications/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  })
};
