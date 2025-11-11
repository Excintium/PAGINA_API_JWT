import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { message } from 'antd';

// Usamos la URL base de la API sin el prefijo,
// ya que el 'apiClient' (que usa prefijo) es solo para peticiones autenticadas.
const AUTH_URL = 'http://localhost:3000';

interface AuthContextType {
    token: string | null;
    login: (values: any) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const login = async (values: any) => {
        setIsLoading(true);
        try {
            // Usamos el DTO de tu API (email, password)
            const response = await axios.post(`${AUTH_URL}/api/v1/auth/login`, {
                email: values.email,
                password: values.password
            });

            const { access_token } = response.data;

            localStorage.setItem('authToken', access_token);
            setToken(access_token);

            message.success('¡Bienvenido!');
            navigate('/products'); // Navega a la ruta de productos

        } catch (error: any) {
            console.error("Error en el login:", error);
            message.error(error.response?.data?.message || 'Email o contraseña incorrectos');
            throw new Error('Login fallido');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('authToken');
        navigate('/'); // Redirige al login (ruta 'home')
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};