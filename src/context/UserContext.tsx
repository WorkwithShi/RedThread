import React, { createContext, useContext, useState } from 'react';

interface UserProfile {
    name: string;
    gender: string;
    id: string; // Unique ID for links
}

interface UserContextType {
    user: UserProfile | null;
    login: (name: string, gender: string) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(() => {
        const saved = localStorage.getItem('red_thread_user');
        return saved ? JSON.parse(saved) : null;
    });

    const login = (name: string, gender: string) => {
        // Generate a simple random ID if not exists
        const id = Math.random().toString(36).substring(2, 9);
        const newUser = { name, gender, id };
        setUser(newUser);
        localStorage.setItem('red_thread_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('red_thread_user');
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
