import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080', // Replace with your backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to every request (if token exists)
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
