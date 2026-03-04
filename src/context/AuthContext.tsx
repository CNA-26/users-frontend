import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { logout as apiLogout } from "../api/auth";

export type User = {
    id: string;
    email: string;
};

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if tokens are passed via URL (e.g., coming back from store-frontend)
        const urlParams = new URLSearchParams(window.location.search);
        const urlAccessToken = urlParams.get("accessToken");
        const urlRefreshToken = urlParams.get("refreshToken");

        if (urlAccessToken && urlRefreshToken) {
            // Store tokens from URL
            localStorage.setItem("accessToken", urlAccessToken);
            localStorage.setItem("refreshToken", urlRefreshToken);

            // Parse user info from access token
            try {
                const base64 = urlAccessToken.split(".")[1];
                const jsonPayload = decodeURIComponent(
                    atob(base64).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
                );
                const payload = JSON.parse(jsonPayload);
                const userData: User = {
                    id: payload?.sub ?? payload?.id ?? "",
                    email: payload?.email ?? "",
                };
                localStorage.setItem("user", JSON.stringify(userData));
                setIsAuthenticated(true);
                setUser(userData);
            } catch (error) {
                console.error("Failed to parse token from URL:", error);
            }

            // Clean up URL by removing tokens (for security)
            const cleanUrl = window.location.pathname + window.location.hash;
            window.history.replaceState({}, document.title, cleanUrl);
        } else {
            // Check localStorage for existing tokens
            const token = localStorage.getItem("accessToken");
            const userData = localStorage.getItem("user");
            if (token && userData) {
                setIsAuthenticated(true);
                setUser(JSON.parse(userData));
            }
        }
        setLoading(false);
    }, []);

    const login = (token: string, user: User) => {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        setIsAuthenticated(true);
        setUser(user);
    };

    const logout = () => {
        apiLogout();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null);
    };

    if (loading) {
        return null; // Or a spinner
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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
