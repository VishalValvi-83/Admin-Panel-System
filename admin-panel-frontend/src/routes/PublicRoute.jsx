import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Make sure this path is correct for your AuthContext
// --- PublicRoute.jsx ---

/**
 * PublicRoute component.
 * This component is used for routes that should only be accessible to unauthenticated users
 * (e.g., login, registration pages). If an authenticated user tries to access these,
 * they are redirected to their appropriate dashboard.
 */
const PublicRoute = () => {
    const { isAuthenticated, userRole, loading } = useAuth(); // Get auth state from your AuthContext

    if (loading) {
        return <div className="flex items-center justify-center h-screen text-xl text-gray-700">Checking authorization...</div>;
    }

    // If the user is authenticated, redirect them based on their role
    if (isAuthenticated) {
        if (userRole === 'admin') return <Navigate to="/admin" replace />;
        if (userRole === 'manager') return <Navigate to="/manager" replace />;
        if (userRole === 'user') return <Navigate to="/user" replace />;
        // Fallback if role is unknown but authenticated
        return <Navigate to="/" replace />;
    }

    // If not authenticated, allow access to the public route (render child routes/components)
    return <Outlet />;
};

export default PublicRoute;
