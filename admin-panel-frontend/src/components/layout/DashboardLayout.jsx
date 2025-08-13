import { useAuth } from "../../hooks/useAuth";
import { Sidebar } from "./Sidebar/Sidebar";

/**
 * Layout component for the dashboards, including a sidebar and main content area.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The content to display in the main area.
 * @param {function} props.onNavigate - Function for sidebar navigation.
 * @param {string} props.currentPage - The currently active page in the sidebar.
 * @param {string} props.userRole - The role of the currently logged-in user.
 */
const DashboardLayout = ({ children, onNavigate, currentPage, userRole }) => {
    const { userId } = useAuth(); // Using userId from AuthContext for display

    // Function to format page title
    const formatPageTitle = (pageId) => {
        // Specific titles for user/manager dashboards
        if (pageId === 'manager-dashboard') return 'Manager Dashboard';
        if (pageId === 'user-dashboard') return 'My Dashboard';

        // General formatting for other pages
        return pageId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };


    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 p-4 sm:p-6 lg:p-8">
            <Sidebar onNavigate={onNavigate} currentPage={currentPage} userRole={userRole} />
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