// src/routes/AdminRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { useAuth } from '../AuthContext';

import UserManagement from '../pages/Dashboards/Admin/AdminDashboard'; // Assuming AdminDashboard is where user management is
import TaskManager from '../pages/Dashboards/Admin/TaskManager'; // Placeholder
import AnalyticsDashboard from '../pages/Dashboards/Admin/AnalyticsDashboard'; // Placeholder
import SystemConfiguration from '../pages/Dashboards/SystemConfiguration'; // Placeholder

const AdminRoutes = () => {
    const { userRole } = useAuth();

    // If not an admin, redirect to login or an unauthorized page
    if (userRole !== 'admin') {
        return <Navigate to="/login" replace />; // Or to a /unauthorized page
    }

    return (
        <Routes>
            <Route index path="/dashboard" element={<PrivateRoute requiredRoles={['admin']}><UserManagement /></PrivateRoute>} />
            <Route path="/user-management" element={<PrivateRoute requiredRoles={['admin']}><UserManagement /></PrivateRoute>} />
            <Route path="/task-manager" element={<PrivateRoute requiredRoles={['admin']}><TaskManager /></PrivateRoute>} />
            <Route path="/analytics" element={<PrivateRoute requiredRoles={['admin']}><AnalyticsDashboard /></PrivateRoute>} />
            <Route path="/system-configuration" element={<PrivateRoute requiredRoles={['admin']}><SystemConfiguration /></PrivateRoute>} />
        </Routes>
    );
};

export default AdminRoutes;