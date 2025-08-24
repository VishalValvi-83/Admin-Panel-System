import React, { useState } from "react";
import { X } from "lucide-react";
import "./Sidebar.css";

const navConfig = {
  ADMIN: [
    { id: "user-management", name: "User Management" },
    { id: "task-manager", name: "Task Manager" },
    { id: "analytics", name: "Analytics" },
    { id: "system-config", name: "System Configuration" },
  ],
  MANAGER: [
    { id: "manager-dashboard", name: "Manager Dashboard" },
    { id: "assigned-users", name: "Assigned Users" },
    { id: "department-analytics", name: "Department Analytics" },
  ],
  USER: [
    { id: "user-dashboard", name: "My Dashboard" },
  ],
};

const panelTitles = {
  ADMIN: "Admin Panel",
  MANAGER: "Manager Panel",
  USER: "User Panel",
};

export const Sidebar = ({
  onNavigate,
  currentPage,
  userRole,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const navItems = navConfig[userRole] || [];
  const panelTitle = panelTitles[userRole] || "User Panel";
  const [openDropdown, setOpenDropdown] = useState(false);
  const [authDropDown, setAuthDropDown] = useState(false);

  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 w-64 p-4 shadow-lg bg-gradient-to-r dark:from-[#1e3b6b] dark:to-[#10172c] transform transition-transform duration-300 md:relative md:translate-x-0 md:flex md:flex-shrink-0 md:w-56 lg:w-64
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex flex-col w-full h-full">
        {/* Header */}
        <div className="flex items-center justify-between md:justify-center mb-6">
          <h2 className="text-2xl font-bold dark:text-blue-200">
            {panelTitle}
          </h2>
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="flex justify-between w-full py-2 px-4 rounded-md text-gray-300 hover:bg-gray-700"
            >
              <span>Dashboard</span>
              <span>{openDropdown ? "▲" : "▼"}</span>
            </button>
            <ul
              className={`pl-4 mt-2 overflow-hidden transition-all font-medium text-gray-300 text-sm duration-300 ease-in-out rounded-lg bg-gradient-to-r dark:from-[#1e3b6b] dark:to-[#10172c] 
                ${openDropdown ? "max-h-55 opacity-100" : "max-h-0 opacity-0"}`}
            >
              {navItems.map(({ id, name }) => (
                <React.Fragment key={id}>
                  <div
                    role="button"
                    onClick={() => onNavigate(id)}
                    className={`w-full text-left py-2 px-4 rounded-t-md border-b-2  transition ${currentPage === id
                      ? "text-yellow-200 border-sky-500 shadow-lg"
                      : " hover:bg-right-center border-sky-800 hover:text-yellow-300"
                      }`}
                  >
                    {name}
                  </div>
                </React.Fragment>
              ))}
            </ul>
          </li>
          <li>
            <button
              onClick={() => onNavigate("profile-management")}
              className={`w-full text-left py-2 px-4 rounded-md transition ${currentPage === "profile-management"
                ? "text-yellow-200 shadow-md"
                : "hover:bg-gray-700 hover:text-blue-200"
                }`}
            >Profile
            </button>
          </li>
          <li>
            <button
              onClick={() => setAuthDropDown(!authDropDown)}
              className="flex justify-between w-full py-2 px-4 rounded-md text-gray-300 hover:bg-gray-700"
            >
              <span>Authentication</span>
              <span>{authDropDown ? "▲" : "▼"}</span>
            </button>
            <ul
              className={`pl-4 mt-2 overflow-hidden transition-all text-sm duration-300 ease-in-out rounded-lg 
                ${authDropDown ? "max-h-55 opacity-100" : "max-h-0 opacity-0"}`}>
              <li role="button"
                className={`w-full text-left py-2 px-4 rounded-t-md border-b-2 transition hover:text-yellow-300 border-sky-700`}>Sing in
              </li>
              <li role="button"
                className={`w-full text-left py-2 px-4 rounded-t-md border-b-2 transition hover:text-yellow-300 border-sky-700`}>Log out</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};
