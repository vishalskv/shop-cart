// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout(); // Call the logout function
        navigate('/')
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/product">E-Commerce</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li> */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">Cart</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/checkout">Checkout</Link>
                        </li> */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/order-summary">Order Summary</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {user ? (
                            <>
                                {/* <li className="nav-item">
                                    <span className="navbar-text">Hello, {user.username}</span>
                                </li> */}
                                <li className="nav-item">
                                    <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="btn btn-outline-primary" to="/">Login</Link>
                                </li>&nbsp;&nbsp;
                                <li className="nav-item">
                                    <Link className="btn btn-outline-secondary" to="/signup">Sign Up</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
