import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AuthApiService = {
    login: async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                email,
                password,
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Login failed" };
        }
    },
    getUserProfile: async (userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to fetch user profile" };
        }
    },
    updateUserProfile: async (userId, userData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/user/update/${userId}`, userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to update user profile" };
        }
    }
};
