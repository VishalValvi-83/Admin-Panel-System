
import { X } from "lucide-react";

export const Sidebar = ({ onNavigate, currentPage, userRole, isSidebarOpen, setIsSidebarOpen }) => {
  const adminNavItems = [
    { id: 'user-management', name: 'User Management' },
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
    <div className={`fixed inset-y-0 max-h-screen left-0 z-40 w-64 bg-gray-800 text-white p-4 shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:flex-shrink-0 md:w-56 lg:w-64`}>
      <div className="flex flex-col  w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-center font-bold text-blue-300">
            {userRole === 'ADMIN' ? 'Admin Panel' : userRole === 'MANAGER' ? 'Manager Panel' : 'User Panel'}
          </h2>
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.id} className="mb-2">
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full text-left py-2 px-4 rounded-md transition-all duration-200 ease-in-out
              ${currentPage === item.id ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-700 hover:text-blue-200'}`}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
