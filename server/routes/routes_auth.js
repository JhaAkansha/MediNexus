import User from '../models/UniqueUser';
const express = require('express');
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    
    // Find user and validate credentials
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  
    // Generate JWT token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRETKEY, { expiresIn: '1h' });
  
    // Send token back to the client
    res.json({ token });
  });
  