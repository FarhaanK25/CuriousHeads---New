/// <reference types="vite/client" />
import axios from 'axios';

// Create an axios instance with the base URL from VITE_API_URL or fallback
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

// Function to register a user
export const registerUser = async (userData: any) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error: any) {
    if (error.code === 'ECONNREFUSED') {
      throw new Error("Connection Refused: Ensure the backend server is running at http://localhost:5000");
    }
    throw error.response ? error.response.data : error;
  }
};

// Function to login a user
export const loginUser = async (credentials: any) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};