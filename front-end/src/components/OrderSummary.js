import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

import "../css/OrderSummary.css"

const OrderSummary = () => {
    const [orders, setOrders] = useState([]);
    const { cart } = useCart();

    useEffect(() => {
        const fetchOrders = async () => {
            const userId = localStorage.getItem('userId');
            try {
                const response = await axios.get(`http://localhost:5001/api/orders/${userId}`);
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Your Orders</h2>
            {orders.length === 0 ? (
                <p>You have no orders yet.</p>
            ) : (
                <div className="row">
                    {orders.map(order => (
                        <div key={order._id} className="col-md-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Order ID: {order._id}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Products:</h6>
                                    <ul className="list-group list-group-flush">
                                        {order.products.map(product => (
                                            <li key={product.productId._id} className="list-group-item">
                                                <div className="d-flex justify-content-between">
                                                    <span>{product.productId.name}</span>
                                                    <span>Quantity: {product.quantity}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderSummary;
