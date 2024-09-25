// routes/cart.js
const express = require('express');
const Cart = require('../models/Cart'); // Import the Cart model
const router = express.Router();

// Add product to cart
router.post('/add', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        if (cart) {
            // Check if the product already exists in the cart
            const existingProduct = cart.products.find(item => item.productId.toString() === productId);
            if (existingProduct) {
                existingProduct.quantity += quantity; // Update quantity
            } else {
                cart.products.push({ productId, quantity }); // Add new product
            }
            await cart.save();
        } else {
            // Create a new cart if it doesn't exist
            const newCart = new Cart({ userId, products: [{ productId, quantity }] });
            await newCart.save();
        }
        res.status(200).json({ message: "Product added to cart" });
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error });
    }
});

// Get user's cart
router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('products.productId');
        if (!cart || cart.products.length === 0) {
            return res.status(200).json({ message: "Cart is empty", products: [] });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart", error });
    }
});

// Update product quantity in cart
router.put('/update/:userId', async (req, res) => {
    const { productId, quantity } = req.body; // Expecting productId and new quantity in the request body
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        if (cart) {
            // Find the product in the cart
            const product = cart.products.find(item => item.productId.toString() === productId);
            if (product) {
                product.quantity = quantity; // Update the quantity
                await cart.save();
                return res.status(200).json({ message: "Product quantity updated", cart });
            } else {
                return res.status(404).json({ message: "Product not found in cart" });
            }
        } else {
            return res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating cart", error });
    }
});

// Remove product from cart
router.delete('/remove/:userId/:productId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        if (cart) {
            cart.products = cart.products.filter(item => item.productId.toString() !== req.params.productId);
            console.log("Updated Cart Products:", cart.products); // Log updated products

            // If there are no products left, delete the cart
            if (cart.products.length === 0) {
                await Cart.deleteOne({ userId: req.params.userId });
                return res.status(200).json({ message: "Cart is now empty and has been deleted" });
            }

            await cart.save();
            res.status(200).json({ message: "Product removed from cart", cart });
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error removing from cart", error });
    }
});



module.exports = router;
