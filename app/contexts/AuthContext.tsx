import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { message } from 'antd';

const AUTH_URL = 'http://localhost:3000';

interface AuthContextType {
    token: string | null;
    login: (values: any) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    register: (values: any) => Promise<void>;
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
            const response = await axios.post(`${AUTH_URL}/api/v1/auth/login`, {
                email: values.email,
                password: values.password
            });
            const { access_token } = response.data;
            localStorage.setItem('authToken', access_token);
            setToken(access_token);
            message.success('¡Bienvenido!');
            navigate('/products');
        } catch (error: any) {
            console.error("Error en el login:", error);
            message.error(error.response?.data?.message || 'Email o contraseña incorrectos');
            throw new Error('Login fallido');
        } finally {
            setIsLoading(false);
        }
    };

    // --- CORRECCIÓN EN ESTA FUNCIÓN ---
    const register = async (values: any) => {
        setIsLoading(true);
        try {
            // Usamos el DTO de tu API (name, email, password)
            await axios.post(`${AUTH_URL}/api/v1/auth/register`, {
                name: values.name,
                email: values.email,
                password: values.password
            });

            message.success('¡Registro exitoso! Ahora puedes iniciar sesión.');
            navigate('/'); // Navega a la ruta de login (home)

        } catch (error: any) {
            console.error("Error en el registro:", error);
            const errorMsg = error.response?.data?.message || 'Error al registrar la cuenta';

            // Si el mensaje es un array (como en class-validator), únelo.
            if (Array.isArray(errorMsg)) {
                message.error(errorMsg.join(', '));
            } else {
                message.error(errorMsg);
            }
            // 1. El 'throw' debe ir DENTRO del catch
            throw new Error('Registro fallido');

        } finally {
            setIsLoading(false);
        }
    }; // 2. Se eliminó el '};' extra que estaba aquí
    // --- FIN DE LA CORRECCIÓN ---

    const logout = () => {
        setToken(null);
        localStorage.removeItem('authToken');
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, isLoading, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};