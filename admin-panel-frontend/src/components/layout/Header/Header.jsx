import React from 'react'
import { Menu } from "lucide-react";
import ThemeToggle from '../../ThemeToggle';

const Header = ({ currentPage, isSidebarOpen, setIsSidebarOpen }) => {
  const formatPageTitle = (activePageTitle) => {
    if (currentPage == "profile-management") return "Profile"
    if (currentPage == "user-dashboard") return "Dashboard"
    return activePageTitle.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  return (
    <header className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-800 shadow-md z-10">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white ">
        {formatPageTitle(currentPage)}
      </h2>
      <div className='inline-flex gap-5 items-center'>
        <ThemeToggle/>
      <button
        className="md:hidden p-2 rounded-md hover:bg-gray-200"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu size={24} />
      </button> </div>
    </header>
  )
}

export default Header