import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Make sure this path is correct for your AuthContext

/**
 * PrivateRoute component.
 * This component protects routes, ensuring only authenticated users with specific roles can access them.
 * If the user is not authenticated or lacks the required role, they are redirected.
 *
 * It uses the <Outlet /> component from react-router-dom to render child routes.
 *
 * @param {object} props - Component props.
 * @param {string[]} [props.requiredRoles=[]] - An array of roles required to access this route.
 * If empty, only authentication is required (any role).
 */
const PrivateRoute = ({ requiredRoles = [] }) => {
    const { isAuthenticated, userRole, loading } = useAuth(); // Get auth state from your AuthContext

    // Show a global loading spinner while authentication status is being determined
    if (loading) {
        // In a real application, you might show a full-page spinner here
        return <div className="flex items-center justify-center h-screen text-xl text-gray-700">Checking authorization...</div>;
    }

    // 1. Check if the user is authenticated
    if (!isAuthenticated) {
        // If not authenticated, redirect to the login page
        return <Navigate to="/login" replace />;
    }

    // 2. Check for required roles (if specified)
    if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
        // If authenticated but doesn't have the required role, redirect to an unauthorized page or dashboard
        // For this example, we'll redirect to the main dashboard or login
        console.warn(`Access Denied: User role "${userRole}" is not in required roles [${requiredRoles.join(', ')}].`);
        // You might want a specific /unauthorized page here
        if (userRole === 'admin') return <Navigate to="/admin" replace />;
        if (userRole === 'manager') return <Navigate to="/manager" replace />;
        if (userRole === 'user') return <Navigate to="/user" replace />;
        return <Navigate to="/login" replace />; // Fallback
    }

    // If authenticated and authorized, render the child routes/components
    return <Outlet />;
};

export default PrivateRoute;
