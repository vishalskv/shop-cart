import React from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';

const Checkout = () => {
    const { cart } = useCart();  // Get the cart items from the CartContext
    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        const userId = localStorage.getItem('userId');  // Retrieve the logged-in user ID
        try {
            // Prepare the products array with only productId and quantity
            const orderProducts = cart.map(item => ({
                productId: item.productId._id?item.productId._id:1, // Assuming productId is an object, extract its _id
                quantity: item.quantity
            }));

            await axios.post('http://localhost:5001/api/orders', {
                userId,
                products: orderProducts,  // Send the formatted cart items to the API
            });

            // Display success message and navigate to order summary
            toast.success("Order placed successfully!");
            navigate('/order-summary'); // Navigate to the order summary page
        } catch (error) {
            // Log error and show an error message to the user
            console.error("Error placing order:", error);
            toast.error("Failed to place order.");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Checkout</h2>
            {cart.length === 0 ? (
                <div className="alert alert-warning">Your cart is empty.</div>
            ) : (
                <div>
                    <div className="row">
                        {cart.map(item => (
                            <div key={item._id} className="col-md-4 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{item?.productId?.name}</h5>
                                        <p className="card-text">Price: ${item?.productId?.sellingPrice}</p>
                                        <p className="card-text">Quantity: {item.quantity}</p>
                                        <p className="card-text">Total: ${(item?.productId?.sellingPrice * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                        <button className="btn btn-success" onClick={handlePlaceOrder}>
                            Place Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;
