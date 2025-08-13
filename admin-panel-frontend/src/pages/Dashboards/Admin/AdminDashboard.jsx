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

  // Function to fetch users from mock API
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
  }, []); // Fetch users on component mount

  /**
   * Opens the CreateUserModal in create mode.
   */
  const handleCreateUser = () => {
    setUserToEdit(null);
    setIsModalOpen(true);
  };

  /**
   * Opens the CreateUserModal in edit mode for a specific user.
   * @param {object} user - The user object to edit.
   */
  const handleEditUser = (user) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  /**
   * Handles saving user data (either creating new or updating existing).
   * @param {object} userData - The user data from the form.
   * @param {string|null} userId - The ID of the user if editing, null if creating.
   */
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
      setIsModalOpen(false); // Close the create/edit modal
      fetchUsers(); // Re-fetch users to update the list
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

  /**
   * Prompts for confirmation before deleting a user.
   * @param {string} userId - The ID of the user to delete.
   * @param {string} userName - The name of the user to delete.
   */
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

  /**
   * Deletes a user from mock API.
   * @param {string} userId - The ID of the user to delete.
   */
  const handleDeleteUser = async (userId) => {
    try {
      await MockApiService.deleteUser(userId);
      setMessageModal({
        isOpen: true,
        title: 'Deleted!',
        message: 'User deleted successfully.',
        onClose: () => setMessageModal({ ...messageModal, isOpen: false })
      });
      fetchUsers(); // Re-fetch users to update the list
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
      <button
        onClick={handleCreateUser}
        className="mb-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md text-lg"
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