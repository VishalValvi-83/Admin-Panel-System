import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { MockApiService } from '../../../services/MockApiService'
import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner'
import MessageModal from '../../../components/Modal/MessageModal'
import CreateUserModal from '../../../components/Modal/CreateUserModal'
const AdminDashboard = () => {
  const { userRole } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [messageModal, setMessageModal] = useState({ isOpen: false, title: '', message: '', onConfirm: null });


  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await MockApiService.getUsers();
      // Sort users by name for consistent display
      const sortedUsers = response.data.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      setUsers(sortedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessageModal({
        isOpen: true,
        title: 'Error',
        message: `Failed to load users: ${error.message}. Please try again.`,
        onClose: () => setMessageModal({ ...messageModal, isOpen: false })
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = () => {
    setUserToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = async (userData, userId = null) => {
    try {
      if (userId) {
        // Update existing user
        await MockApiService.updateUser(userId, userData);
        setMessageModal({
          isOpen: true,
          title: 'Success',
          message: `User "${userData.name}" updated successfully!`,
          onClose: () => setMessageModal({ ...messageModal, isOpen: false })
        });
      } else {
        // Add new user
        await MockApiService.addUser(userData);
        setMessageModal({
          isOpen: true,
          title: 'Success',
          message: `User "${userData.name}" created successfully!`,
          onClose: () => setMessageModal({ ...messageModal, isOpen: false })
        });
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
      setMessageModal({
        isOpen: true,
        title: 'Error',
        message: `Failed to save user: ${error.message}.`,
        onClose: () => setMessageModal({ ...messageModal, isOpen: false })
      });
    }
  };


  const handleDeleteUserConfirm = (userId, userName) => {
    setMessageModal({
      isOpen: true,
      title: 'Confirm Deletion',
      message: `Are you sure you want to delete user "${userName}"? This action cannot be undone.`,
      onConfirm: () => handleDeleteUser(userId),
      onClose: () => setMessageModal({ ...messageModal, isOpen: false }),
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });
  };


  const handleDeleteUser = async (userId) => {
    try {
      await MockApiService.deleteUser(userId);
      setMessageModal({
        isOpen: true,
        title: 'Deleted!',
        message: 'User deleted successfully.',
        onClose: () => setMessageModal({ ...messageModal, isOpen: false })
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessageModal({
        isOpen: true,
        title: 'Error',
        message: `Failed to delete user: ${error.message}.`,
        onClose: () => setMessageModal({ ...messageModal, isOpen: false })
      });
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading user data..." />;
  }

  return (
    <div className="p-4">
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Likes</div>
          <div className="stat-value text-primary">25.6K</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Page Views</div>
          <div className="stat-value text-secondary">2.6M</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar avatar-online">
              <div className="w-16 rounded-full">
                <img src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp" />
              </div>
            </div>
          </div>
          <div className="stat-value">86%</div>
          <div className="stat-title">Tasks done</div>
          <div className="stat-desc text-secondary">31 tasks remaining</div>
        </div>
      </div>
      <button
        onClick={handleCreateUser}
        className="mb-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors d-block duration-200 shadow-md text-lg"
      >
        + Add New User
      </button>

      {users.length === 0 ? (
        <p className="text-gray-600 text-lg">No users found. Start by adding a new user!</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${user.role === 'admin' ? 'bg-red-100 text-red-800' :
                        user.role === 'manager' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'}`}>
                      {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors duration-200"
                    >
                      Edit
                    </button>
                    {/* Only admins can delete users */}
                    {userRole === 'admin' && (
                      <button
                        onClick={() => handleDeleteUserConfirm(user.id, user.name)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        userToEdit={userToEdit}
        currentUserRole={userRole} // Pass current user's role for role selection restriction
      />
      <MessageModal
        isOpen={messageModal.isOpen}
        title={messageModal.title}
        message={messageModal.message}
        onClose={messageModal.onClose}
        onConfirm={messageModal.onConfirm}
        confirmText={messageModal.confirmText}
        cancelText={messageModal.cancelText}
      />
    </div>
  );
};

export default AdminDashboard