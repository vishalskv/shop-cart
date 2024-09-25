import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_CART':
            return action.payload;
        case 'ADD_TO_CART':
            return [...state, action.payload];
            case 'REMOVE_FROM_CART':
                return state.filter(item => item._id !== action.payload._id); // Use _id from payload
        default:
            return state;
    }
};

const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []);

    // Function to get userId
    const getUserId = () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error("User ID not found in local storage");
            return null; // Return null if user ID is not found
        }
        return userId;
    };

    // Fetch the cart when the component mounts
    useEffect(() => {
        const userId = getUserId();
        if (!userId) return; // Exit if there is no user ID

        const fetchCart = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/cart/${userId}`);
                dispatch({ type: 'LOAD_CART', payload: response.data.products });
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };
        
        fetchCart();
    }, []); // Dependency array is empty to run on mount only

    const addToCart = async (product) => {
        const userId = getUserId();
        if (!userId) return; // Exit if there is no user ID
    
        try {
            await axios.post('http://localhost:5001/api/cart/add', {
                userId,
                productId: product._id,
                quantity: product.quantity,
            });
            // Fetch the updated cart after adding
            const response = await axios.get(`http://localhost:5001/api/cart/${userId}`);
            dispatch({ type: 'LOAD_CART', payload: response.data.products }); // Load updated cart
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };
    

    const removeFromCart = async (productId) => {
        const userId = localStorage.getItem('userId'); // Retrieve user ID here
        if (!userId) {
            console.error("User ID not found in local storage");
            return; // Exit if there is no user ID
        }
    
        try {
            await axios.delete(`http://localhost:5001/api/cart/remove/${userId}/${productId}`);
            // Fetch the updated cart after removal
            const response = await axios.get(`http://localhost:5001/api/cart/${userId}`);
            dispatch({ type: 'LOAD_CART', payload: response.data.products }); // Load updated cart
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };
    
    
    

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => {
    return React.useContext(CartContext);
};

export { CartProvider, useCart };
