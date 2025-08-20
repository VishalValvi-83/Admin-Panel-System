import React, { useContext, useEffect, useState } from 'react'
import AdminDashboard from './pages/Dashboards/Admin/AdminDashboard'
import TaskManager from './pages/Dashboards/Admin/TaskManager'
import AnalyticsDashboard from './pages/Dashboards/Admin/AnalyticsDashboard'
import SystemConfiguration from './pages/Dashboards/Admin/SystemConfiguration'
import { Login } from './pages/Auth/Login'
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner'
import DashboardLayout from './components/layout/DashboardLayout'
import UserDashboard from './pages/Dashboards/User/UserDashboard'
import ProfileManagement from './pages/Dashboards/profile/ProfileManagement'
import ManagerDashboard from './pages/Dashboards/Manager/ManagerDashboard'
import AssignedUsers from './pages/Dashboards/Manager/AssignedUsers'
import DepartmentAnalytics from './pages/Dashboards/Manager/DepartmentAnalytics'
import { AuthContext } from './context/AuthContext2'
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom'
const App = () => {
  const { isAuthenticated, userRole, userId, loading, logout } = useContext(AuthContext);  // const [isNewAuthenticated, setIsNewAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('user-management');

  const [authLoading, setAuthLoading] = useState(loading);
  console.log(isAuthenticated)
  useEffect(() => {
    if (isAuthenticated) {
      setCurrentPage(userRole === 'ADMIN' ? 'user-management' : userRole === 'MANAGER' ? 'manager-dashboard' : 'user-dashboard');
    } else {
      setTimeout(() => {
        setAuthLoading(false);
      }, 2000);
      setCurrentPage('');
    }

  }, [userId, isAuthenticated, userRole]);

  if (authLoading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  const renderPageContent = () => {
    switch (currentPage) {
      // Admin Pages
      case 'user-management':
        return <AdminDashboard />;
      case 'task-manager':
        return <TaskManager />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'system-config':
        return <SystemConfiguration />;
      // Manager Pages
      case 'manager-dashboard':
        return <ManagerDashboard />;
      case 'assigned-users':
        return <AssignedUsers />;
      case 'department-analytics':
        return <DepartmentAnalytics />;
      // User Pages
      case 'user-dashboard':
        return <UserDashboard />;
      case 'profile-management':
        return <ProfileManagement />;
      default:

        if (isAuthenticated) {
          if (userRole === 'admin') return <UserManagement />;
          if (userRole === 'manager') return <ManagerDashboard />;
          if (userRole === 'user') return <UserDashboard />;
        }
        return <div className="text-center text-gray-600 mt-10">Select a page from the sidebar.</div>;
    }
  };
  return (
    <>
      {isAuthenticated ? (
        <DashboardLayout onNavigate={setCurrentPage} currentPage={currentPage} userRole={userRole}>
          {renderPageContent()}
          <div className="mt-8 flex justify-end">
            <button
              onClick={logout}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 shadow-md"
            >
              Logout
            </button>
          </div>
        </DashboardLayout>
      ) : (
        <Login />
      )}
      <Routes>
        <Route path="*" element={<Navigate to={`/${userRole.toLowerCase()}`} replace />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App