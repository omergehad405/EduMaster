import { useState, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);

    return (
        <AuthContext.Provider value={{ loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;