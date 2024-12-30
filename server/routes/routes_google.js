const User = require('../models/model_user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios'); // To make HTTP requests to Google API

// Regular login (email and password)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid username' });
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Google Login route
router.post('/google-login', async (req, res) => {
  const { token } = req.body; // The Google OAuth token sent by the client

  if (!token) {
    return res.status(400).json({ message: 'Please provide a Google token' });
  }

  try {
    // Verify the Google token with Google's API
    const googleResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
    );

    const { email } = googleResponse.data;

    // Check if the user already exists in the database
    let user = await User.findOne({ email });

    if (!user) {
      // If the user doesn't exist, create a new user
      user = new User({ email });
      await user.save();
    }

    // Generate JWT token for the user
    const payload = { userId: user._id };
    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.json({ token: jwtToken });
  } catch (err) {
    console.error('Error during Google login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
