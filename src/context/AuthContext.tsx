import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { logout as apiLogout } from "../api/auth";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage on mount
        const token = localStorage.getItem("jwt");
        if (token) {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = (token: string) => {
        localStorage.setItem("jwt", token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        apiLogout();
        setIsAuthenticated(false);
    };

    if (loading) {
        return null; // Or a spinner
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
