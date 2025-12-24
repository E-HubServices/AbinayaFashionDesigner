import React, { createContext, useContext, useState, useEffect } from "react";

interface AdminContextType {
    isAdmin: boolean;
    login: (password: string) => Promise<boolean>;
    logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check if admin session exists
        const adminSession = sessionStorage.getItem("adminSession");
        if (adminSession === "true") {
            setIsAdmin(true);
        }
    }, []);

    const login = async (password: string): Promise<boolean> => {
        // Simple password check using env variable for Vite migration
        // In production, this should be handled by a secure Convex action
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

        if (password === adminPassword) {
            setIsAdmin(true);
            sessionStorage.setItem("adminSession", "true");
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAdmin(false);
        sessionStorage.removeItem("adminSession");
    };

    return (
        <AdminContext.Provider value={{ isAdmin, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error("useAdmin must be used within AdminProvider");
    }
    return context;
}
