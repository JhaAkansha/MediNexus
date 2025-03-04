const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Records = require('../models/model_records');
const User = require('../models/model_user');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Allow only PDF files
        const allowedTypes = ['application/pdf'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type, only PDFs are allowed'), false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 },
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
    const token = req.headers['authorization']?.split(' ')[1];
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


router.post('/post', verifyToken, upload.single('file'), async (req, res) => {
    console.log("uploaded file: ",req.file);
    try {
        const { userId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const filePath = req.file ? path.posix.join('uploads', req.file.filename) : null;

        const newRecord = new Records({
            userId,
            file: filePath
        });

        const savedRecord = await newRecord.save();
        res.status(201).json(savedRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/getAll', async (req, res) => {
    try {
        const records = await Records.find();

        if (!records || records.length === 0) {
            return res.status(404).json({ message: 'No records found' });
        }

        const recordsWithUrls = records.map(record => {
            if (record.file) {
                return {
                    ...record.toObject(),
                    fileUrl: `http://localhost:3000/${record.file}`
                };
            } else {
                return {
                    ...record.toObject(),
                    fileUrl: null
                };
            }
        });

        res.status(200).json(recordsWithUrls);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching records' });
    }
});

router.get('/get/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const patientRecords = await Records.find({ userId: id });
        
        if (patientRecords.length === 0) {
            return res.status(404).json({ message: 'No records found for this patient' });
        }

        const recordsWithUrls = patientRecords.map(record => {
            return {
                ...record.toObject(),
                fileUrl: `http://localhost:3000/${record.file}`
            };
        });

        res.status(200).json(recordsWithUrls);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching records' });
    }
});

module.exports = router;