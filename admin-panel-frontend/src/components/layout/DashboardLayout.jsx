import { useAuth } from "../../hooks/useAuth";
import { Sidebar } from "./Sidebar/Sidebar";

const DashboardLayout = ({ children, onNavigate, currentPage, userRole }) => {
    const { userId } = useAuth();
    console.log(userId)

    const formatPageTitle = (activePageTitle) => {
        if (currentPage == "profile-management") return "Profile"
        if (currentPage == "user-dashboard") return "Dashboard"
        return activePageTitle.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };


    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
            <Sidebar onNavigate={onNavigate} currentPage={currentPage} userRole={userRole} />
            <div className="flex-grow bg-white rounded-lg shadow-xl p-6 md:mt-0 overflow-auto">
                <header className="mb-8 border-b border-gray-200">
                    <p className="text-3xl font-extrabold text-gray-900 pb-4 ">
                        {formatPageTitle(currentPage)}
                    </p>
                    {/* {userId && (
                        <p className="text-sm text-gray-500">
                            Logged in as: <span className="font-mono bg-gray-100 px-2 py-1 rounded-md text-xs">{userId}</span>
                        </p>
                    )} */}

                </header>
                <main className="min-h-[70vh]">
                    {children}
                </main>
            </div>
        </div>
    );
};
export default DashboardLayout;