// src/components/Login.js
import React, { useContext, useState } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });
            login(response.data.token);
            toast.success("Login successful!");
            navigate('/product'); // Change this route as needed
        } catch (error) {
            toast.error("Login failed! Please check your email and password."); 
            setError('Login failed. Please check your email and password.');
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
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
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p className="mt-3">
                Don't have an account? <a href="/signup">Sign up</a>
            </p>
        </div>
    );
};

export default Login;
