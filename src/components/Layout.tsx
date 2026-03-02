import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
    const { isAuthenticated, logout } = useAuth();

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-white/80 backdrop-blur-md border-b border-monstera-green/20 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link to="/" className="hover:opacity-80 transition-opacity">
                        <h1 className="font-branding text-4xl text-monstera-dark">
                            MONSTERA
                        </h1>
                    </Link>

                    <nav className="flex items-center gap-6">
                        {isAuthenticated ? (
                            <>
                                <div className="flex items-center gap-4">
                                    <Link
                                        to="/orders"
                                        className="text-monstera-dark hover:text-monstera-medium font-semibold transition-colors"
                                    >
                                        My Orders
                                    </Link>

                                    <a
                                        href="https://store-frontend-git-store-frontend.2.rahtiapp.fi/"
                                        className="text-sm text-monstera-green hover:text-monstera-dark font-semibold transition-colors"
                                    >
                                        Back to shop
                                    </a>
                                </div>

                                <button
                                    onClick={logout}
                                    className="px-5 py-2 bg-monstera-green text-white font-bold rounded-xl hover:bg-monstera-dark hover:scale-105 transition-all shadow-md shadow-monstera-green/20"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-monstera-dark hover:text-monstera-medium font-semibold transition-colors"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="px-5 py-2 bg-monstera-green text-white font-bold rounded-xl hover:bg-monstera-dark hover:scale-105 transition-all shadow-md shadow-monstera-green/20"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8">
                <Outlet />
            </main>
        </div>
    );
}