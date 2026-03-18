import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
export const DEPLOYED_URL = import.meta.env.VITE_DEPLOYED_URL || "https://ecommerce-mern-fccj.onrender.com";

// Use deployed URL for production, localhost for development
const isDevelopment = import.meta.env.DEV;
export const BASE_URL = isDevelopment ? API_URL : DEPLOYED_URL;

export const api = axios.create({
  baseURL: BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});