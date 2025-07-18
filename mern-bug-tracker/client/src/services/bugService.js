import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
api.interceptors.request.use(config => {
  console.log(`➡️ Request: ${config.method.toUpperCase()} ${config.url}`);
  return config;
});

// Add response interceptor for logging
api.interceptors.response.use(response => {
  console.log(`⬅️ Response: ${response.status} ${response.config.url}`);
  return response;
}, error => {
  console.error(`❌ API Error: ${error.message}`, error.response?.data);
  return Promise.reject(error);
});

const bugService = {
  getAllBugs: async () => {
    const response = await api.get('/bugs');
    return response.data.data;
  },
  
  getBugById: async (id) => {
    const response = await api.get(`/bugs/${id}`);
    return response.data.data;
  },
  
  createBug: async (bugData) => {
    const response = await api.post('/bugs', bugData);
    return response.data.data;
  },
  
  updateBug: async (id, bugData) => {
    const response = await api.put(`/bugs/${id}`, bugData);
    return response.data.data;
  },
  
  deleteBug: async (id) => {
    await api.delete(`/bugs/${id}`);
  },
};

export default bugService;