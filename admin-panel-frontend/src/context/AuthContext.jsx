import React, { createContext, useState, useEffect } from 'react';
import {MockApiService} from '../services/MockApiService'; // Assuming you create this service

const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState('guest'); // Default role: 'guest'
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true); // Initial loading state for auth check

    useEffect(() => {
        //check for a JWT token here.
        setLoading(false);
    }, []);

    /**
     * Simulates user login.
     * In a real app, this would call your backend login API.
     * @param {string} email - User's email.
     * @param {string} password - User's password.
     * @returns {Promise<object>} A promise that resolves with user data on success.
     */
    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await MockApiService.login(email, password);
            const userData = response.data;
            setIsAuthenticated(true);
            setUserRole(userData.role);
            setUserId(userData.id);
            return userData;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole('guest');
        setUserId(null);
    };

    // The value provided to components consuming this context
    const authContextValue = {
        isAuthenticated,
        userRole,
        userId,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
export default AuthProvider;