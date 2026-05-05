import axios from "axios";
import { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

// const API_URL = "https://edumaster-backend-6xy5.onrender.com/api/users";
const API_URL = "https://edumaster-backend-6xy5.onrender.com/api/users";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem("token");

            if (!storedToken) return;

            setToken(storedToken);

            try {
                const res = await axios.get("https://edumaster-backend-6xy5.onrender.com/api/users/me", {
                    headers: { Authorization: `Bearer ${storedToken}` },
                });

                setUser(res.data.data.user);
                localStorage.setItem("user", JSON.stringify(res.data.data.user));
            } catch (err) {
                console.error("Failed to fetch user:", err);
                logout(); // clear invalid token
            }
        };

        initAuth();
    }, []);

    // LOGIN
    const login = async (email, password) => {
        setLoading(true);
        try {
            const res = await axios.post(`${API_URL}/login`, { email, password });
            const { token, user } = res.data.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            setToken(token);
            setUser(user);

            return { success: true };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Login failed",
            };
        } finally {
            setLoading(false);
        }
    };

    // REGISTER
    const register = async (userData) => {
        setLoading(true);
        try {
            const { username, password, email, avatar, firstName, lastName, birthDate, phone, country } = userData;
            // ✅ Create FormData for file upload
            const formData = new FormData();
            formData.append("username", username);
            formData.append("email", email);
            formData.append("password", password);
            if (avatar) formData.append("avatar", avatar);
            if (firstName) formData.append("firstName", firstName);
            if (lastName) formData.append("lastName", lastName);
            if (birthDate) formData.append("birthDate", birthDate);
            if (phone) formData.append("phone", phone);
            if (country) formData.append("country", country);

            const res = await axios.post(`${API_URL}/register`, formData);

            const { token, user } = res.data.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            setToken(token);
            setUser(user);

            return { success: true };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Signup failed"
            };
        } finally {
            setLoading(false);
        }
    };

    const updateUserProfile = async (formData) => {
        setLoading(true);
        try {
            const res = await axios.patch(`${API_URL}/update-profile`, formData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });

            const updatedUser = res.data.data.user;
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);

            return { success: true };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Update failed",
            };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{ user, setUser, token, login, register, logout, updateUserProfile, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;