import axios from 'axios';
import { message } from 'antd';

// La URL base de tu API de NestJS
const API_URL = 'http://localhost:3000/api/v1';

const apiClient = axios.create({
    baseURL: API_URL,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// (Opcional) Podemos interceptar las respuestas para manejar errores 401
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Si el token es inválido o expiró
            message.error('Tu sesión ha expirado. Por favor, ingresa de nuevo.');
            // Forzamos el logout
            localStorage.removeItem('authToken');
            // Redirigimos al login
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default apiClient;