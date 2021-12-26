import axios from 'axios'
import {AuthResponse} from "../models/response/AuthResponse";
export const API_URL = `http://localhost:5000/api`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    if (!config?.headers) {
        throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    config.headers.Authorization= `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.request.use((config) => {
    return config}, async error => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry){
        originalRequest._isRetry = true
        try {

        }catch (e){
            console.log("Unauthorized")
        }
    }
    throw error;
});




export default $api;