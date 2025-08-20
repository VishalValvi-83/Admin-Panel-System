import { useLocation } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";
import { Sidebar } from "./Sidebar/Sidebar";

const DashboardLayout = ({ children }) => {
    const { userId } = useAuth();
    const location = useLocation();
    const currentPage = location.pathname.substring(1);

    const formatPageTitle = (activePageTitle) => {
        return activePageTitle.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };


    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 p-4 sm:p-6 lg:p-8">
            <Sidebar  />
            <div className="flex-grow bg-white rounded-lg shadow-xl p-6 md:ml-6 mt-6 md:mt-0 overflow-auto">
                <header className="mb-8 pb-4 border-b border-gray-200">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                        {formatPageTitle(currentPage)}
                    </h1>
                    {userId && (
                        <p className="text-sm text-gray-500">
                            Logged in as: <span className="font-mono bg-gray-100 px-2 py-1 rounded-md text-xs">{userId}</span>
                        </p>
                    )}
                </header>
                <main className="min-h-[70vh]">
                    {children}
                </main>
            </div>
        </div>
    );
};
export default DashboardLayout;