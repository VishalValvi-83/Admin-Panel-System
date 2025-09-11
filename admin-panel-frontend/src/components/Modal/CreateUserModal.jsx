import React, { useState, useEffect, useCallback } from 'react';

const useForm = (initialState, validate) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = (callback) => (event) => {
        event.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            callback(values);
        }
    };

    const resetForm = useCallback(() => {
        setValues(initialState);
        setErrors({});
    }, [initialState]);

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
        resetForm,
        setValues,
    };
};

const FormField = ({ id, label, type, value, onChange, error, ...props }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
            {label}:
        </label>
        <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            className={`shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : 'border-gray-300'}`}
            {...props}
        />
        {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
);

const initialState = {
    name: '',
    email: '',
    role: {
        role_Id: 2,
        roleName: 'USER',
    },
    password: '',
};

const CreateUserModal = ({ isOpen, onClose, onSave, userToEdit, currentUserRole }) => {

    const validate = (values) => {
        let newErrors = {};
        if (!values.name.trim()) newErrors.name = 'Name is required';
        if (!values.email.trim() || !/\S+@\S+\.\S+/.test(values.email)) newErrors.email = 'Valid email is required';
        if (!userToEdit && !values.password.trim()) newErrors.password = 'Password is required for new users';
        else if (!userToEdit && values.password.trim().length < 6) newErrors.password = 'Password must be at least 6 characters';
        return newErrors;
    };

    const { values, errors, handleChange, handleSubmit, resetForm, setValues } = useForm(initialState, validate);

    useEffect(() => {
        if (isOpen) {
            if (userToEdit) {
                setValues({
                    name: userToEdit.username || '',
                    email: userToEdit.email || '',
                    role: {
                        role_Id: userToEdit.role.role_Id,
                        roleName: userToEdit.role.roleName || 'user'
                    },
                });
            } else {
                resetForm();
            }
        }
    }, [isOpen, userToEdit, resetForm, setValues]);

    if (!isOpen) return null;

    const handleSave = (formData) => {
        const userData = {
            username: formData.name,
            email: formData.email,
            role: {
                role_Id: formData.role.role_Id,
                roleName: formData.role.roleName
            },
        };

        if (!userToEdit && formData.password) {
            userData.password = formData.password;
        }
        console.log(userToEdit);
        console.log(userData);
        onSave(userData, userToEdit ? userToEdit.id : null);
    };

    const isRoleSelectionDisabled = currentUserRole !== 'ADMIN';
    const roleOptions =
        currentUserRole === 'ADMIN'
            ? [
                { role: { role_Id: 1, roleName: 'ADMIN' }, label: 'Admin' },
                { role: { role_Id: 2, roleName: 'USER' }, label: 'User' },
                { role: { role_Id: 3, roleName: 'MANAGER' }, label: 'Manager' },
            ]
            : [{ role: { role_Id: 2, roleName: 'USER' }, label: 'User' }];

    const handleRoleChange = (e) => {
        const roleId = parseInt(e.target.value);
        const selectedRole = roleOptions.find(
            (option) => option.role.role_Id === roleId
        );
        if (selectedRole) {
            setValues({
                ...values,
                role: selectedRole.role,
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                    {userToEdit ? 'Edit User' : 'Create New User'}
                </h2>
                <form onSubmit={handleSubmit(handleSave)}>
                    <FormField id="name" label="Name" type="text" value={values.name} onChange={handleChange} error={errors.name} />
                    <FormField id="email" label="Email" type="email" value={values.email} onChange={handleChange} error={errors.email} />

                    <div className="mb-4">
                        <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
                            Role:
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={values.role.role_Id}
                            onChange={handleRoleChange}
                            disabled={isRoleSelectionDisabled}
                            className={`shadow border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${isRoleSelectionDisabled ? 'bg-gray-100 cursor-not-allowed' : 'border-gray-300'}`}
                        >
                            {roleOptions.map(option => (
                                <option key={option.role.role_Id} value={option.role.role_Id}>{option.label}</option>
                            ))}
                        </select>
                        {isRoleSelectionDisabled && (
                            <p className="text-gray-500 text-xs italic mt-1">
                                Only ADMINs can change user roles to MANAGER or ADMIN.
                            </p>
                        )}
                    </div>

                    {!userToEdit && (
                        <FormField id="password" label="Password" type="password" value={values.password} onChange={handleChange} error={errors.password} />
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
