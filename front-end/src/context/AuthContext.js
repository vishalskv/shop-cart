import React, { createContext, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        return token ? jwtDecode(token) : null;
    });

   
    const login = (token) => {
        localStorage.setItem('token', token);
        const decodedUser = jwtDecode(token);
        console.log(decodedUser, 8989898); // Check the decoded user object
    
        // Check if decodedUser contains id
        if (decodedUser && decodedUser.id) {
            localStorage.setItem('userId', decodedUser.id); // Store user ID
            setUser(decodedUser);
        } else {
            console.error("User ID not found in token.");
        }
    };
    
    

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId'); // Remove user ID on logout
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
