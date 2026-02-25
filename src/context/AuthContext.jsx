import axios from "axios";
import { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

const API_URL = "http://localhost:5000/api/users";

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
                const res = await axios.get("http://localhost:5000/api/users/me", {
                    headers: { Authorization: `Bearer ${storedToken}` },
                });

                setUser(res.data.data.user);
                console.log(res.data.data.user);
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
    const register = async (username, password, email, avatar) => {
        setLoading(true);
        try {
            // ✅ Create FormData for file upload
            const formData = new FormData();
            formData.append("username", username);
            formData.append("email", email);
            formData.append("password", password);
            if (avatar) formData.append("avatar", avatar);

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

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{ user, token, login, register, logout, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;