// controllers/auth.controller.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/users');

module.exports = {
  async register(req, res) {
    const { username, password } = req.body;
    try {
      const existingUser = await User.findUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
      await User.createUser(username, password);
      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await User.findUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const isPasswordValid = await User.validatePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
      return res.status(200).json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  protectedRoute(req, res) {
    const userId = req.user.userId; // Access user ID from JWT token
    return res.status(200).json({ userId });
  },
};
