import React, { useContext } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './context/AuthContext2';
import { Toaster } from 'react-hot-toast';
import DashboardLayout from './components/layout/DashboardLayout';
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner';
import { Login } from './pages/Auth/Login';
import AdminDashboard from './pages/Dashboards/Admin/AdminDashboard';
import TaskManager from './pages/Dashboards/Admin/TaskManager';
import AnalyticsDashboard from './pages/Dashboards/Admin/AnalyticsDashboard';
import SystemConfiguration from './pages/Dashboards/Admin/SystemConfiguration';
import ManagerDashboard from './pages/Dashboards/Manager/ManagerDashboard';
import AssignedUsers from './pages/Dashboards/Manager/AssignedUsers';
import DepartmentAnalytics from './pages/Dashboards/Manager/DepartmentAnalytics';
import UserDashboard from './pages/Dashboards/User/UserDashboard';
import ProfileManagement from './pages/Dashboards/User/ProfileManagement';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, userRole, loading } = useContext(AuthContext);
  if (loading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

const App = () => {
  const { isAuthenticated, userRole, loading } = useContext(AuthContext);

  // if (!loading && !isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }
  if (loading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />

        <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'MANAGER', 'USER']} />}>
          <Route element={<DashboardLayout />}>

            {/* Admin Routes */}
            <Route path="admin-dashboard" element={<AdminDashboard />} />
            <Route path="task-manager" element={<TaskManager />} />
            <Route path="analytics" element={<AnalyticsDashboard />} />
            <Route path="system-config" element={<SystemConfiguration />} />

            {/* Manager Routes */}
            <Route path="manager-dashboard" element={<ManagerDashboard />} />
            <Route path="assigned-users" element={<AssignedUsers />} />
            <Route path="department-analytics" element={<DepartmentAnalytics />} />

            {/* User Routes */}
            <Route path="user-dashboard" element={<UserDashboard />} />
            <Route path="profile-management" element={<ProfileManagement />} />

            {/* Default route after login */}
            <Route index element={<Navigate to={userRole === 'ADMIN' ? "admin-dashboard" : userRole === 'MANAGER' ? "manager-dashboard" : "user-dashboard"} />} />
          </Route>
        </Route>

        <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
