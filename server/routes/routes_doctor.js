const express = require('express');
const router = express.Router();
const Doctor = require('../models/model_doctor');
const jwt = require('jsonwebtoken');
const User = require('../models/model_user');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadsPath = path.join(__dirname, 'uploads')

if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 },  // Limit file size to 5MB
});

router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: `Multer error: ${err.message}` });
    } else if (err) {
        return res.status(500).json({ message: `Server error: ${err.message}` });
    }
    next();
});


const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from the Authorization header
    console.log("received token: ", token);
  
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.userId = decoded.userId;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };


router.post('/post', verifyToken, upload.single('image'), async (req, res) => {
    console.log("uploaded file: ",req.file);
    try {
        const { speciality, description, userId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const imagePath = req.file ? req.file.path : null;

        const newDoctor = new Doctor({
            name: user.name ,
            speciality,
            description,
            userId,
            image: imagePath
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