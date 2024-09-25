// controllers/cartController.js
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Create or Update Cart
exports.updateCart = async (req, res) => {
    const userId = req.user.id; // Assume you're using JWT and user ID is in req.user
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            // Update existing item
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Add new item
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get Cart
exports.getCart = async (req, res) => {
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Remove Item from Cart
exports.removeItem = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
