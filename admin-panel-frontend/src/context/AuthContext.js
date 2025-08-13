// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import MockApiService from '../services/MockApiService'; // Assuming you create this service

// Create the context
export const AuthContext = createContext(null);

/**
 * AuthProvider component.
 * Manages the global authentication state (isAuthenticated, userRole, userId).
 * It fetches the mock API service for login/logout and provides the state to its children.
 */
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState('guest'); // Default role: 'guest'
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true); // Initial loading state for auth check

    // Simulate an initial authentication check (e.g., checking for a token in localStorage)
    useEffect(() => {
        // In a real app, you'd check for a JWT token here.
        // For this mock, we start unauthenticated.
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

    /**
     * Simulates user logout.
     * In a real app, this would clear tokens from localStorage/cookies.
     */
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