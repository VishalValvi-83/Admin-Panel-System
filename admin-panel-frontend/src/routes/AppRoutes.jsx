// src/routes/AppRoutes.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from '../AuthContext';

// Public Pages
import LoginPage from './../pages/Auth/Login';
import RegisterPage from '../pages/Auth/Register';

// Role-specific Route Containers
import AdminRoutes from './AdminRoutes';
import ManagerRoutes from './ManagerRoutes';
import UserRoutes from './UserRoutes';
import NotFoundPage from './../pages/NotFoundPage';

const AppRoutes = () => {
    const { isAuthenticated, userRole, loading } = useAuth();

    if (loading) {
        return <div className="flex items-center justify-center h-screen text-xl">Loading application...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/" element={isAuthenticated ? (
                    userRole === 'admin' ? <AdminRoutes /> :
                        userRole === 'manager' ? <ManagerRoutes /> :
                            userRole === 'user' ? <UserRoutes /> :
                                <LoginPage />
                ) : (
                    <LoginPage />
                )} />

                {isAuthenticated && userRole === 'admin' && <Route path="/admin/*" element={<AdminRoutes />} />}
                {isAuthenticated && userRole === 'manager' && <Route path="/manager/*" element={<ManagerRoutes />} />}
                {isAuthenticated && userRole === 'user' && <Route path="/user/*" element={<UserRoutes />} />}

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;