import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const auth_user = JSON.parse(localStorage.getItem('user'));
export const AdminService = {
    registerUser: async (userData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/admin/create-user`, userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to register user" };
        }
    },
    getAllUsers: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/users`,
                {
                    headers: {
                        'Content-Type': 'application/json',

                    },
                    auth: {
                        username: 'vvv',
                        password: 'pass123'
                    }
                }
            );
            console.table(response.data)
            return response.data;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error.response?.data || { message: "Failed to fetch users" };
        }
    },
    deleteUser: async (userId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/admin/user/delete/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to delete user" };
        }
    },
    getUserById: async (userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/users/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to fetch user" };
        }
    },
    activityLog: async (userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/activities/user/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to fetch activity log" };
        }
    }
}