// back-end/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, 'your_secret_key'); // Use your actual secret key
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        res.status(401).send({ error: 'Unauthorized' });
    }
};

module.exports = authMiddleware;
