// src/routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Mongoose user model

const router = express.Router();

// ✅ REGISTER
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, stream, college, year } = req.body;

        // Check if user exists
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            stream,
            college,
            year,
        });

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                stream: user.stream,
                college: user.college,
                year: user.year,
            },
        });
    } catch (err) {
        console.error('Register Error:', err);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// ✅ LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                stream: user.stream,
                college: user.college,
                year: user.year,
            },
        });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Server error during login' });
    }
});

module.exports = router;
