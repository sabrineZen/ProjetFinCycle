import axios from "axios";
import { API } from './config';

const api = axios.create({
    baseURL: API || "http://localhost:5000/api"
});

// ← token automatique
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;