const User = require('../models/model_user');
const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;  
    console.log("Entered email: ", email); 
    console.log("Entered password: ", password);

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

    try {
    const user = await User.findOne({ email });
    console.log("User: ", user);
    if (!user) {
      return res.status(400).json({ message: 'Invalid username' });
    }

    console.log("Entered password: ", password);
    console.log("Stored password: ", user.password);
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    console.log("isMatch: ", isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
  
    const payload = { userId: user._id, userType: user.userType };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
  
    res.json({ token });
    }
    catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  module.exports = router;