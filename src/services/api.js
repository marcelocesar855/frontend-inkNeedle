import axios from "axios";
import { getToken, logout } from "./auth";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.request.use(async config => {
    const token = getToken();
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(null, (error) => {
    
    if (error.status === 401) {
        logout();
    }

    return Promise.reject(error);
});

export default api;