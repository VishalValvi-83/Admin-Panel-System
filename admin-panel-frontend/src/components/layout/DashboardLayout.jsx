import { useState } from "react";
import { Sidebar } from "./Sidebar/Sidebar";
import Header from "./Header/Header";

const DashboardLayout = ({ children, onNavigate, currentPage, userRole }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="h-screen flex flex-row bg-gray-100 dark:bg-gray-900">
            <Sidebar onNavigate={onNavigate} currentPage={currentPage} userRole={userRole} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="flex-grow flex flex-col bg-white dark:bg-gray-800 shadow-xl overflow-y-auto">
                <Header currentPage={currentPage} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                <main className="p-6 flex-grow">
                    {children}
                </main>
            </div>
        </div>
    );
};
export default DashboardLayout;