import React, { useEffect, useState } from 'react'
import AdminDashboard from './pages/Dashboards/Admin/AdminDashboard'
import TaskManager from './pages/Dashboards/Admin/TaskManager'
import AnalyticsDashboard from './pages/Dashboards/Admin/AnalyticsDashboard'
import SystemConfiguration from './pages/Dashboards/Admin/SystemConfiguration'
import { AuthContext } from './context/AuthContext'
import { Login, LoginPage } from './pages/Auth/Login'
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
  const [authLoading, setAuthLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState('user-management');

  useEffect(() => {

    setAuthLoading(false);
  }, []);

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setUserRole(userData.role);
    setCurrentUserId(userData.id);

    localStorage.setItem("user", JSON.stringify(userData));


    if (userData.role === 'ADMIN') {
      setCurrentPage('user-management');
    } else if (userData.role === 'MANAGER') {
      setCurrentPage('manager-dashboard');
    } else if (userData.role === 'USER') {
      setCurrentPage('user-dashboard');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('guest');
    setCurrentUserId(null);
    setCurrentPage('');
    localStorage.removeItem("user");
  };

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
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </AuthContext.Provider>

    </div>
  )
}

export default App