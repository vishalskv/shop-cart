import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const Cart = () => {
    const { cart, removeFromCart, dispatch } = useCart();
    const navigate = useNavigate();

    const handleRemoveFromCart = (item) => {
        removeFromCart(item._id);
    };

    const handleIncreaseQuantity = async (item) => {
        const userId = localStorage.getItem('userId'); 
        const newQuantity = item.quantity + 1;
        try {
            await axios.put(`http://localhost:5001/api/cart/update/${userId}`, {
                productId: item.productId._id,
                quantity: newQuantity,
            });
            const response = await axios.get(`http://localhost:5001/api/cart/${userId}`);
            dispatch({ type: 'LOAD_CART', payload: response.data.products });
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const handleDecreaseQuantity = async (item) => {
        if (item.quantity > 1) {
            const userId = localStorage.getItem('userId'); 
            const newQuantity = item.quantity - 1;
            try {
                await axios.put(`http://localhost:5001/api/cart/update/${userId}`, {
                    productId: item.productId._id,
                    quantity: newQuantity,
                });
                const response = await axios.get(`http://localhost:5001/api/cart/${userId}`);
                dispatch({ type: 'LOAD_CART', payload: response.data.products });
            } catch (error) {
                console.error("Error updating quantity:", error);
            }
        }
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="container mt-4">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="row">
                    {cart.map(item => (
                        <div key={item._id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{item?.productId?.name}</h5>
                                    <p className="card-text">Price: ${item?.productId?.sellingPrice}</p>
                                    <p className="card-text">Quantity: {item?.quantity}</p>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <button className="btn btn-outline-secondary" onClick={() => handleDecreaseQuantity(item)}>-</button>
                                            <span className="mx-2">{item?.quantity}</span>
                                            <button className="btn btn-outline-secondary" onClick={() => handleIncreaseQuantity(item)}>+</button>
                                        </div>
                                        <button className="btn btn-danger" onClick={() => handleRemoveFromCart(item)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {cart.length > 0 && (
                <button className="btn btn-primary" onClick={handleCheckout}>Proceed to Checkout</button>
            )}
        </div>
    );
};

export default Cart;
