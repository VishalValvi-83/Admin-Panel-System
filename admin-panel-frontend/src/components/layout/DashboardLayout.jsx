import { useState } from "react";
import { Sidebar } from "./Sidebar/Sidebar";
import { Menu } from "lucide-react";

const DashboardLayout = ({ children, onNavigate, currentPage, userRole }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const formatPageTitle = (activePageTitle) => {
        if (currentPage == "profile-management") return "Profile"
        if (currentPage == "user-dashboard") return "Dashboard"
        return activePageTitle.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <div className="h-screen flex flex-row bg-gray-100">
            <Sidebar onNavigate={onNavigate} currentPage={currentPage} userRole={userRole} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="flex-grow flex flex-col bg-white shadow-xl overflow-y-auto">
                <header className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
                    <p className="text-3xl font-extrabold text-gray-900">
                        {formatPageTitle(currentPage)}
                    </p>
                    <button
                        className="md:hidden p-2 rounded-md hover:bg-gray-200"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <Menu size={24} />
                    </button>
                </header>
                <main className="p-6 flex-grow">
                    {children}
                </main>
            </div>
        </div>
    );
};
export default DashboardLayout;