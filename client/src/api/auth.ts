import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const loginUser = async (email: string, password: string) => {
  // Debug: inspect which URL is being used
  console.log('Using API URL:', API_URL);
  debugger; // triggers the browser debugger here

  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    
    // Debug: inspect response
    console.log('Login response:', response.data);
    debugger;

    return response.data;
  } catch (error) {
    // Debug: inspect error
    console.error('Login error:', error);
    debugger;

    throw error;
  }
};
