// routes/orders.js
const express = require('express');
const Order = require('../models/Order'); // Import the Order model
const router = express.Router();

// Place an order
router.post('/', async (req, res) => {
    const { userId, products } = req.body; // Make sure these match your request
    try {
        const newOrder = new Order({ userId, products });
        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Error placing order:", error); // Log the error for debugging
        res.status(500).json({ message: "Error placing order", error });
    }
});
// Get user's orders (optional, if you want to display them in the order summary)
router.get('/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).populate('products.productId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
});

module.exports = router;
