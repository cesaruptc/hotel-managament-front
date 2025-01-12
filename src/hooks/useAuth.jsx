import { useState } from 'react';
import { login } from '../services/authService';

const useAuth = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = async (email, password) => {
        try {
            const data = await login(email, password);
            localStorage.setItem('token', data.token);
            setIsAuthenticated(true);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
            setIsAuthenticated(false);
        }
    };

    return {
        isAuthenticated,
        errorMessage,
        handleLogin,
    };
};

export default useAuth;