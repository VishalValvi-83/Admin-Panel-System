import React, { createContext, useState, useEffect } from 'react';
import { MockApiService } from '../services/MockApiService';
const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState('guest');
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //check for a JWT token here.
        setLoading(false);
    }, []);

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