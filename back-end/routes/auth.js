// routes/auth.js
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// Register route
router.post('/signup', signup);

// Login route
router.post('/login', login);

module.exports = router;
