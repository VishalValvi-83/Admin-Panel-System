import React, { useEffect, useState } from 'react'
import AdminDashboard from './pages/Dashboards/Admin/AdminDashboard'
import TaskManager from './pages/Dashboards/Admin/TaskManager'
import AnalyticsDashboard from './pages/Dashboards/Admin/AnalyticsDashboard'
import SystemConfiguration from './pages/Dashboards/Admin/SystemConfiguration'
import { AuthContext } from './context/AuthContext'
import { LoginPage } from './pages/Auth/Login'
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner'
import DashboardLayout from './components/layout/DashboardLayout'
import UserDashboard from './pages/Dashboards/User/UserDashboard'
import ProfileManagement from './pages/Dashboards/User/ProfileManagement'
import ManagerDashboard from './pages/Dashboards/Manager/ManagerDashboard'
import AssignedUsers from './pages/Dashboards/Manager/AssignedUsers'
import DepartmentAnalytics from './pages/Dashboards/Manager/DepartmentAnalytics'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('guest');
  const [currentUserId, setCurrentUserId] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // Simulate initial auth check

  const [currentPage, setCurrentPage] = useState('user-management'); // Default Admin page

  // Simulate initial auth check
  useEffect(() => {
    // In a real app, you'd check for a JWT token here
    // For this mock, we'll start unauthenticated.
    setAuthLoading(false);
  }, []);

  /**
   * Handles successful login, setting authentication state and user details.
   * @param {object} userData - The logged-in user's data (id, email, role).
   */
  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setUserRole(userData.role);
    setCurrentUserId(userData.id);

    // Set initial page based on role after login
    if (userData.role === 'admin') {
      setCurrentPage('user-management');
    } else if (userData.role === 'manager') {
      setCurrentPage('manager-dashboard');
    } else if (userData.role === 'user') {
      setCurrentPage('user-dashboard');
    }
  };

  /**
   * Handles user logout, resetting authentication state.
   */
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('guest');
    setCurrentUserId(null);
    setCurrentPage(''); // Reset page state after logout
  };

  if (authLoading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  // Define the content for each page based on current user's role
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
        // Default to showing an appropriate dashboard if logged in, otherwise login page
        if (isAuthenticated) {
          if (userRole === 'admin') return <UserManagement />;
          if (userRole === 'manager') return <ManagerDashboard />;
          if (userRole === 'user') return <UserDashboard />;
        }
        return <div className="text-center text-gray-600 mt-10">Select a page from the sidebar.</div>;
    }
  };
  return (
    <div>
      <AuthContext.Provider value={{ isAuthenticated, userRole, userId: currentUserId, loading: authLoading }}>
        {isAuthenticated ? (
          <DashboardLayout onNavigate={setCurrentPage} currentPage={currentPage} userRole={userRole}>
            {renderPageContent()}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 shadow-md"
              >
                Logout
              </button>
            </div>
          </DashboardLayout>
        ) : (
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        )}
      </AuthContext.Provider>

    </div>
  )
}

export default App