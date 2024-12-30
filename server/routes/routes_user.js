const express = require('express');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const Model = require('../models/model_user'); // User model
const router = express.Router();

// POST Method (Sign Up)
router.post('/post', async (req, res) => {
    const { email, password, userType } = req.body;

    // Basic validation
    if (!email || !password || !userType) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Check if the email already exists
        const existingUser = await Model.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        // Create a new user
        const newUser = new Model({
            email,
            password: password, // Store the hashed password,
            userType
        });

        // Save the user to the database
        const dataToSave = await newUser.save();
        res.status(201).json(dataToSave); // Return the saved user object
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET All Users
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET One User by ID
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PATCH Method (Update User by ID)
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        
        // Validate incoming data (only email and password can be updated)
        if (!updatedData.email && !updatedData.password) {
            return res.status(400).json({ message: 'Email or password is required to update.' });
        }

        // Hash password if it's being updated
        if (updatedData.password) {
            const salt = await bcrypt.genSalt(10);
            updatedData.password = await bcrypt.hash(updatedData.password, salt);
        }

        const options = { new: true }; // Return the updated document

        const result = await Model.findByIdAndUpdate(id, updatedData, options);

        if (!result) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json(result); // Return the updated user
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE Method (Delete User by ID)
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);

        if (!data) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).send(`User with email ${data.email} has been deleted.`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
