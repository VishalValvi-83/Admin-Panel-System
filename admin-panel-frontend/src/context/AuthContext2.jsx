import React, { createContext, useState, useEffect } from "react";
import { AuthApiService } from "./../services/AuthApiSerivce";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState("guest");
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        console.log(savedUser)
        if (savedUser) {
            setIsAuthenticated(true);
            setUserRole(savedUser.role);
            setUserId(savedUser.id);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const data = await AuthApiService.login(email, password);

            if (data.status === "success") {
                const userData = {
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    role: data.role,
                };

                setIsAuthenticated(true);
                setUserRole(userData.role);
                setUserId(userData.id);
                localStorage.setItem("authUser", JSON.stringify(userData));

                return userData;
            } else {
                throw new Error(data.message || "Invalid login");
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole("guest");
        setUserId(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, userId, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
export default AuthProvider;
