
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
const ProfileManagement = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        bio: '',
        avatar: 'https://placehold.co/150x150',
    });

    // const [password, setPassword] = useState({
    //     currentPassword: '',
    //     newPassword: '',
    //     confirmNewPassword: '',
    // });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setProfile({
                name: 'Vishal Valvi ',
                email: 'vishal@example.com',
                bio: '',
                avatar: 'https://placehold.co/150x150',
            });
            setIsLoading(false);
        }, 1500);
    }, []);

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    // const handlePasswordChange = (e) => {
    //     const { name, value } = e.target;
    //     setPassword(prevPassword => ({
    //         ...prevPassword,
    //         [name]: value,
    //     }));
    // };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setError(null);
        setIsLoading(true);

        console.log('Updating profile with:', profile);

        setTimeout(() => {
            setIsLoading(false);
            // setSuccessMessage('Profile updated successfully!');
            toast.success("Profile updated successfully!");
        }, 1000);
    };

    // const handlePasswordSubmit = (e) => {
    //     e.preventDefault();
    //     setSuccessMessage('');
    //     setError(null);

    //     if (password.newPassword !== password.confirmNewPassword) {
    //         setError('New passwords do not match.');
    //         return;
    //     }
    //     if (!password.newPassword || password.newPassword.length < 8) {
    //         setError('New password must be at least 8 characters long.');
    //         return;
    //     }

    //     setIsLoading(true);
    //     // TODO: Implement API call to change password
    //     console.log('Changing password with:', {
    //         currentPassword: password.currentPassword,
    //         newPassword: password.newPassword
    //     });

    //     // Simulate API call
    //     setTimeout(() => {
    //         setIsLoading(false);
    //         setSuccessMessage('Password changed successfully!');
    //         setPassword({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    //     }, 1000);
    // };

    if (isLoading && !profile.name) {
        return <div className="flex flex-col gap-4 min-h-screen">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div>;
    }

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-200 rounded-2xl min-h-screen">
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">{error}</div>}
            {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">{successMessage}</div>}
            {/* Personal Information Section */}
            <div className="bg-white p-8 rounded-xl text-gray-600 shadow-lg mb-8">
                <div className='profile-image-container flex items-center border-b border-gray-300 p-4 mb-3'>
                    <img src={profile.avatar} alt="Avatar" className="w-32 h-32 mask mask-squircle object-cover" />
                    <div className='ml-4'>
                        <h2 className="text-3xl font-bold text-gray-700">{profile.name}</h2>
                        <p className="text-gray-600 text-sm bg-amber-100 px-2 text-center rounded-md">{profile.email}</p>
                    </div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">Personal Information</h2>
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

                    <div className="mb-6">
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
                    </div>

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
            {/* <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">Change Password</h2>
                <form onSubmit={handlePasswordSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-600 mb-1">Current Password</label>
                            <input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                value={password.currentPassword}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={password.newPassword}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-600 mb-1">Confirm New Password</label>
                            <input
                                type="password"
                                id="confirmNewPassword"
                                name="confirmNewPassword"
                                value={password.confirmNewPassword}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            </div> */}
        </div>
    );
};

export default ProfileManagement;
