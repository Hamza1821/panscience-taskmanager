import axios from 'axios';

const api = axios.create({
  baseURL: 'https://panscience-taskmanager.onrender.com/api',
  withCredentials: true, // keep if you're using cookies (else remove)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token from localStorage if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
