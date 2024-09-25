// src/components/ProductForm.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Validation schema
import { toast } from 'react-toastify'; // Importing toast

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
        name: '',
        description: '',
        image: '',
        originalPrice: '',
        discountPrice: '',
        sellingPrice: '',
        quantity: '',
        uom: '',
        hsnCode: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:5001/api/products/${id}`);
                    console.log('Fetched Product Data:', response.data); // Log the fetched data
                    setInitialValues(response.data);
                } catch (error) {
                    console.error("Error fetching product:", error);
                }
            }
        };
        fetchProduct();
    }, [id]);

    // Formik setup
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
            originalPrice: Yup.number().required('Required').positive('Must be positive'),
            discountPrice: Yup.number().positive('Must be positive'),
            quantity: Yup.number().required('Required').positive('Must be positive').integer('Must be an integer'),
            uom: Yup.string().required('Required'),
            hsnCode: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                if (id) {
                    await axios.put(`http://localhost:5001/api/products/${id}`, values);
                    toast.success('Product updated successfully!');
                } else {
                    await axios.post('http://localhost:5001/api/products', values);
                    toast.success('Product added successfully!');
                }
                navigate('/product'); // Redirect to the product list after submission
            } catch (error) {
                toast.error("Error saving product!");
                console.error("Error saving product:", error);
            }
        },
    });

    // Effect to update Formik values when initialValues change
    useEffect(() => {
        formik.setValues(initialValues);
    }, [initialValues]); // Update Formik values on initialValues change

    // Effect to update selling price based on discount
    useEffect(() => {
        if (formik.values.originalPrice && formik.values.discountPrice) {
            const sellingPrice = formik.values.originalPrice - formik.values.discountPrice;
            formik.setFieldValue('sellingPrice', sellingPrice > 0 ? sellingPrice : 0);
        } else {
            formik.setFieldValue('sellingPrice', formik.values.originalPrice);
        }
    }, [formik.values.originalPrice, formik.values.discountPrice]);

    return (
        <div className="container mt-5">
            <form onSubmit={formik.handleSubmit} className="p-4 border rounded shadow">
                <h2 className="mb-4 text-center">{id ? 'Edit Product' : 'Add Product'}</h2>
                <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter Product Name"
                    />
                    {formik.touched.name && formik.errors.name ? <div className="invalid-feedback">{formik.errors.name}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter Product Description"
                    />
                    {formik.touched.description && formik.errors.description ? <div className="invalid-feedback">{formik.errors.description}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        className="form-control"
                        value={formik.values.image}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter Image URL"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Original Price</label>
                    <input
                        type="number"
                        name="originalPrice"
                        className={`form-control ${formik.touched.originalPrice && formik.errors.originalPrice ? 'is-invalid' : ''}`}
                        value={formik.values.originalPrice}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter Original Price"
                    />
                    {formik.touched.originalPrice && formik.errors.originalPrice ? <div className="invalid-feedback">{formik.errors.originalPrice}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label">Discount Price</label>
                    <input
                        type="number"
                        name="discountPrice"
                        className={`form-control ${formik.touched.discountPrice && formik.errors.discountPrice ? 'is-invalid' : ''}`}
                        value={formik.values.discountPrice}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter Discount Price"
                    />
                    {formik.touched.discountPrice && formik.errors.discountPrice ? <div className="invalid-feedback">{formik.errors.discountPrice}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label">Selling Price</label>
                    <input
                        type="number"
                        name="sellingPrice"
                        className="form-control"
                        value={formik.values.sellingPrice}
                        readOnly
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        className={`form-control ${formik.touched.quantity && formik.errors.quantity ? 'is-invalid' : ''}`}
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter Quantity"
                    />
                    {formik.touched.quantity && formik.errors.quantity ? <div className="invalid-feedback">{formik.errors.quantity}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label">Unit of Measure</label>
                    <input
                        type="text"
                        name="uom"
                        className={`form-control ${formik.touched.uom && formik.errors.uom ? 'is-invalid' : ''}`}
                        value={formik.values.uom}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter Unit of Measure"
                    />
                    {formik.touched.uom && formik.errors.uom ? <div className="invalid-feedback">{formik.errors.uom}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label">HSN Code</label>
                    <input
                        type="text"
                        name="hsnCode"
                        className={`form-control ${formik.touched.hsnCode && formik.errors.hsnCode ? 'is-invalid' : ''}`}
                        value={formik.values.hsnCode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter HSN Code"
                    />
                    {formik.touched.hsnCode && formik.errors.hsnCode ? <div className="invalid-feedback">{formik.errors.hsnCode}</div> : null}
                </div>

                <button type="submit" className="btn btn-primary w-100">{id ? 'Update Product' : 'Add Product'}</button>
            </form>
        </div>
    );
};

export default ProductForm;
