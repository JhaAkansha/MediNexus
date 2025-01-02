const express = require('express');
const router = express.Router();
const Doctor = require('../models/model_doctor');
const jwt = require('jsonwebtoken');
const User = require('../models/model_user');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from the Authorization header
    console.log("received token: ", token);
  
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify and decode the token
      req.userId = decoded.userId; // Attach user ID to the request object
      next(); // Pass control to the next middleware or route handler
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' }); // Invalid or expired token
    }
  };


router.post('/post', verifyToken, async (req, res) => {
    try {
        const { speciality, description, userId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newDoctor = new Doctor({
            name: user.name ,
            speciality,
            description,
            userId
        });

        const savedDoctor = await newDoctor.save();
        res.status(201).json(savedDoctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/getAll', async(req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/get:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/update/:id', async (req, res) => {
    try {
        const { speciality, description } = req.body;
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            { speciality, description },
            { new: true }
        );
        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(updatedDoctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;