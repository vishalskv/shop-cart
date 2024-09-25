// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import ProductList from './pages/ProductList'; // Import ProductList
import ProductForm from './components/ProductForm'; // Import ProductForm
import Checkout from './components/Checkout';
import Navbar from './components/NavBar';
import OrderSummary from './components/OrderSummary';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Import other components

const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                  <Navbar/>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/product" element={<ProductList />} /> {/* Default route */}
                        <Route path="/add-product" element={<ProductForm />} />
                        <Route path="/edit-product/:id" element={<ProductForm />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/order-summary" element={<OrderSummary />} />
                        {/* Define other routes */}
                    </Routes>
                </Router>
                <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
