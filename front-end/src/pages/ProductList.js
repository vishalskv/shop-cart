import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Sample from "../assets/images/sample.jpg"; // Use a default image for products
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/ProductList.css'; // Import custom CSS for additional styling
import { toast } from 'react-toastify';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    // Fetch products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    // Add product to cart
    const handleAddToCart = (product) => {
        addToCart({ ...product, quantity: 1 });
        toast.success(`${product.name} has been added to your cart!`);
        navigate('/cart');
    };

    // Delete product
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/products/${id}`);
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="container mt-4">
            <div className='d-flex justify-content-between'>
            <h2 className="mb-4">Product List</h2>

<div>

            <Link to="/add-product" className="btn btn-primary mb-3">Add Product</Link>&nbsp;&nbsp;
            <Link to="/cart" className="btn btn-secondary mb-3 ml-2">Go to Cart</Link>
</div>
            </div>
            <div className="row">
                {products.map(product => (
                    <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card product-card">
                            <img src={ Sample} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text mb-0"><strong>Description:</strong> {product.description}</p>
                                <div className="price-section">
                                    {product.discountPrice > 0 && (
                                        <p className="discount-price mb-0">Discount Price: <span>${product.discountPrice}</span></p>
                                    )}
                                    <div className='d-flex justify-content-between'>
                                    <p className="original-price mb-0">Original Price: <span>${product.originalPrice}</span></p>
                                    <p className="selling-price mb-0">Selling Price: <span>${product.sellingPrice}</span></p>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                <p className="card-text mb-0"><strong>HSN Code:</strong> {product.hsnCode}</p>
                                <p className="card-text"><strong>UOM:</strong> {product.uom}</p>
                                </div>
                                <p className="card-text"><strong>Available Quantity:</strong> {product.quantity}</p>
                                <div className="d-flex justify-content-between mt-auto">
                                    <Link to={`/edit-product/${product._id}`} className="btn btn-warning">Edit</Link>
                                    <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                                    <button className="btn btn-success" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
