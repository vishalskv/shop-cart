// server.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart'); // Add this line
const Order =require('./routes/orders')
const cors = require('cors'); // Import cors
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes); // Add this line
app.use('/api/orders', Order); // Add this line
// const productRoutes = require('./routes/product'); // Add this line

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch((error) => console.log(error.message));
