import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { AuthApiService } from '../../../services/AuthApiSerivce';
import { useAuth } from '../../../hooks/useAuth';
const ProfileManagement = () => {
    const { userId } = useAuth();
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        createdAt: '',
        avatar: 'https://placehold.co/150x150',
    });
    const [originalProfile, setOriginalProfile] = useState(null);

    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isProfileLoading, setIsProfileLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await AuthApiService.getUserProfile(userId);;
                const name = data.username.charAt(0).toUpperCase() + data.username.slice(1)
                if (data) setTimeout(() => {
                    setIsProfileLoading(false)
                }, 1500);;

                setProfile({
                    name: name,
                    email: data.email,
                    createdAt: new Date(data.createdAt).toLocaleDateString(),
                    avatar: data.avatar || 'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg',
                });
                setOriginalProfile({
                    name: name,
                    email: data.email,
                });
            } catch (error) {
                setError(error.message);
                toast.error("Failed to fetch profile.");
            }
        };

        fetchProfile();
    }, [userId]);

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPassword(prevPassword => ({
            ...prevPassword,
            [name]: value,
        }));
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setError(null);

        if (!userId) {
            setError("User not found. Please login again.");
            return;
        }

        const updatedFields = {};
        if (profile.name !== originalProfile.name) {
            updatedFields.username = profile.name;
        }
        if (profile.email !== originalProfile.email) {
            updatedFields.email = profile.email;
        }

        if (Object.keys(updatedFields).length === 0) {
            toast.error("No changes to save.");
            return;
        }

        setIsLoading(true);
        try {
            await AuthApiService.updateUserProfile(userId, updatedFields);
            toast.success("Profile updated successfully!");
            setOriginalProfile(profile);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to update profile.";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setError(null);
        if (password.newPassword !== password.confirmNewPassword) {
            setError('New passwords do not match.');
            toast.error('New passwords do not match.');
            return;
        }
        if (!password.newPassword || password.newPassword.length < 6) {
            setError('New password must be at least 6 characters long.');
            toast.error('New password must be at least 6 characters long.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await AuthApiService.updateUserProfile(userId, password);
            console.log(response)
            setSuccessMessage(response.message);
            toast.success(response.message);
            setPassword({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to update password.";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading || isProfileLoading) {
        return <div className="flex flex-col gap-4">
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">{error}</div>}
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div>;
    }

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 rounded-2xl">
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">{error}</div>}
            {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">{successMessage}</div>}
            {/* Personal Information Section */}
            <div className="bg-white p-8 rounded-xl text-gray-600 shadow-lg mb-8">
                <div className='profile-image-container flex flex-wrap justify-center md:justify-start items-center border-b border-gray-300 p-4 mb-3'>
                    <img src={profile.avatar} alt="Avatar" className="w-32 h-32 mx-auto md:mx-0 mask mask-squircle object-cover" />
                    <div className='md:ml-4 text-center md:text-left'>
                        <h2 className="md:text-4xl text-2xl font-bold text-gray-700 mb-1.5">{profile.name}</h2>
                        <div className="badge badge-soft md:w-auto sm:text-lg text-md badge-primary">{profile.email}</div>
                        <span className="block text-gray-400 text-xs text-center">Joined on: {profile.createdAt}</span>
                    </div>
                </div>
                <h2 className="sm:text-2xl text-xl font-semibold text-gray-800 mb-6">Personal Information</h2>
                <form onSubmit={handleProfileSubmit}>
                    <div className="flex flex-col md:flex-row items-center text-gray-600 mb-6">
                        <div className="flex-grow">
                            <label htmlFor="avatar" className="block text-sm font-medium text-gray-600 mb-1">Avatar URL</label>
                            <input
                                type="text"
                                id="avatar"
                                name="avatar"
                                value={profile.avatar}
                                onChange={handleProfileChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="https://example.com/avatar.png"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={profile.name}
                                onChange={handleProfileChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={profile.email}
                                onChange={handleProfileChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/*<div className="mb-6">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-600 mb-1">Biography</label>
                        <textarea
                            id="bio"
                            name="bio"
                            rows="4"
                            value={profile.bio}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Tell us a little about yourself..."
                        ></textarea>
                    </div>*/}

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 transition-colors duration-300"
                        >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Change Password Section */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="sm:text-2xl text-xl font-semibold text-gray-800 mb-6">Change Password</h2>
                <form onSubmit={handlePasswordSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-600 mb-6">
                        <div>
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-600 mb-1">Current Password</label>
                            <input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                autoComplete="current-password"
                                value={password.currentPassword}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                autoComplete="new-password"
                                value={password.newPassword}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required

                            />
                        </div>
                        <div>
                            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-600 mb-1">Confirm New Password</label>
                            <input
                                type="password"
                                id="confirmNewPassword"
                                name="confirmNewPassword"
                                autoComplete="new-password"
                                value={password.confirmNewPassword}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required

                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 disabled:bg-gray-400 transition-colors duration-300"
                        >
                            {isLoading ? 'Updating...' : 'Update Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileManagement;
