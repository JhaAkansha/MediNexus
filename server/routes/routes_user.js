const express = require('express');
const bcrypt = require('bcrypt');
const Model = require('../models/model_user');
const router = express.Router();

router.post('/post', async (req, res) => {
    const { name, email, password, userType } = req.body;

    if (!name || !email || !password || !userType) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const existingUser = await Model.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        const newUser = new Model({
            name,
            email,
            password: password,
            userType
        });

        const dataToSave = await newUser.save();
        res.status(201).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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

router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        
        if (!updatedData.email && !updatedData.password) {
            return res.status(400).json({ message: 'Email or password is required to update.' });
        }

        if (updatedData.password) {
            const salt = await bcrypt.genSalt(10);
            updatedData.password = await bcrypt.hash(updatedData.password, salt);
        }

        const options = { new: true };

        const result = await Model.findByIdAndUpdate(id, updatedData, options);

        if (!result) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

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
