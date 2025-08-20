
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext2';

export const Sidebar = () => {
  const { userRole, logout } = useContext(AuthContext);
  const location = useLocation();
  const currentPage = location.pathname.substring(1);

  const adminNavItems = [
    { id: 'admin-dashboard', name: 'Admin Dashboard' },
    { id: 'task-manager', name: 'Task Manager' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'system-config', name: 'System Configuration' },
  ];

  const managerNavItems = [
    { id: 'manager-dashboard', name: 'Manager Dashboard' },
    { id: 'assigned-users', name: 'Assigned Users' },
    { id: 'department-analytics', name: 'Department Analytics' },
  ];

  const userNavItems = [
    { id: 'user-dashboard', name: 'My Dashboard' },
    { id: 'profile-management', name: 'Profile' },
  ];

  let navItems = [];
  if (userRole === 'ADMIN') {
    navItems = adminNavItems;
  } else if (userRole === 'MANAGER') {
    navItems = managerNavItems;
  } else if (userRole === 'USER') {
    navItems = userNavItems;
  }

  return (
    <div className="w-full sm:w-48 md:w-56 lg:w-64 bg-gray-800 text-white flex-shrink-0 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-blue-300">
        {userRole === 'ADMIN' ? 'Admin Panel' : userRole === 'MANAGER' ? 'Manager Panel' : 'User Panel'}
      </h2>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.id} className="mb-2">
              <Link
                to={`/${item.id}`}

                className={`w-full text-left py-2 px-4 rounded-md transition-all duration-200 ease-in-out block
              ${currentPage === item.id ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-700 hover:text-blue-200'}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-col-reverse md:flex-col mt-auto">
        <button
          onClick={logout}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
