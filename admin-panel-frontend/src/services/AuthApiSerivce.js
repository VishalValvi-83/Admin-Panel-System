import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/auth";

export const AuthApiService = {
    login: async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, {
                email,
                password,
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Login failed" };
        }
    },
};
