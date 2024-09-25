// src/components/Signup.js
import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/signup', { username, email, password });
            toast.success("Signup successful! Please log in."); // Show success toast
            navigate('/');
        } catch (error) {
            toast.error("Signup failed! Please try again."); // Show error toast
            console.error('Signup failed:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
