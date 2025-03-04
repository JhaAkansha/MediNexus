const express = require('express');
const Model = require('../models/model_review');
const router = express.Router();

router.post('/post', async (req, res) => {
    const { name, doctor, satisfaction, experience } = req.body;

    if (!name || !doctor || !satisfaction) {
        return res.status(400).json({ message: 'Please fill the required fields' });
    }

    try {
            const newReview = new Model({
            name,
            doctor,
            satisfaction,
            experience
        });

        const dataToSave = await newReview.save();
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

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);

        if (!data) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).send(`Review by user with name ${data.name} has been deleted.`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;