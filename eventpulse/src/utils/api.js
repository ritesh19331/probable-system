import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Change this to match your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add JWT token to every request if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
