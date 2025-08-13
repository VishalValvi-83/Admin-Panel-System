import React, { useState, useEffect } from 'react';
/**
 * Modal for creating or editing user entries.
 * Handles form submission and validation.
 *
 * @param {object} props - Component props.
 * @param {boolean} props.isOpen - Controls the modal's visibility.
 * @param {function} props.onClose - Callback to close the modal.
 * @param {function} props.onSave - Callback to save user data.
 * @param {object} [props.userToEdit] - User object if in edit mode, otherwise null.
 * @param {string} props.currentUserRole - The role of the currently logged-in user, to restrict role selection.
 */
const CreateUserModal = ({ isOpen, onClose, onSave, userToEdit, currentUserRole }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('user'); // Default role
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Populate form fields if a user is being edited
        if (userToEdit) {
            setName(userToEdit.name || '');
            setEmail(userToEdit.email || '');
            setRole(userToEdit.role || 'user');
            setPassword('');
        } else {
            setName('');
            setEmail('');
            setRole('user');
            setPassword('');
        }
        setErrors({});
    }, [userToEdit, isOpen]);

    if (!isOpen) return null;

    /**
     * Validates form fields and sets error messages.
     * @returns {boolean} True if all fields are valid, false otherwise.
     */
    const validateForm = () => {
        let newErrors = {};
        if (!name.trim()) newErrors.name = 'Name is required';
        if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid email is required';
        if (!userToEdit && !password.trim()) newErrors.password = 'Password is required for new users';
        else if (!userToEdit && password.trim().length < 6) newErrors.password = 'Password must be at least 6 characters';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const userData = {
            name,
            email,
            role,
            ...(password && !userToEdit && { password }),
        };

        onSave(userData, userToEdit ? userToEdit.id : null);
    };

    const isRoleSelectionDisabled = currentUserRole !== 'admin';

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                    {userToEdit ? 'Edit User' : 'Create New User'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
                            Role:
                        </label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            disabled={isRoleSelectionDisabled}
                            className={`shadow border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${isRoleSelectionDisabled ? 'bg-gray-100 cursor-not-allowed' : 'border-gray-300'
                                }`}
                        >
                            <option value="user">User</option>
                            {currentUserRole === 'admin' && <option value="manager">Manager</option>}
                            {currentUserRole === 'admin' && <option value="admin">Admin</option>}
                        </select>
                        {isRoleSelectionDisabled && (
                            <p className="text-gray-500 text-xs italic mt-1">
                                Only Admins can change user roles to Manager or Admin.
                            </p>
                        )}
                    </div>

                    {!userToEdit && ( // Only show password field for new users
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.password && <p className="text-red-500 text-xs italic mt-1">{errors.password}</p>}
                        </div>
                    )}

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-md"
                        >
                            {userToEdit ? 'Save Changes' : 'Create User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUserModal;