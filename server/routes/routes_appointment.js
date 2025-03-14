const express = require('express');
const Model = require('../models/model_appointment');
const User = require('../models/model_user');
const jwt = require('jsonwebtoken');

const router = express.Router()

module.exports = router;

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

router.get('/getUserAppointments', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const appointments = await Model.find({ userId });

        if (!appointments.length) {
            return res.status(404).json({ message: 'No appointments found for this user' });
        }

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/getDoctorAppointments', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const appointments = await Model.find({ doctor: userId });

        if (!appointments.length) {
            return res.status(404).json({ message: 'No appointments found for this user' });
        }

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/post', async (req, res) => {
    const { name, phoneNumber, appointmentDate, preferredTime, doctor, userId } = req.body;

    try {
        // Check if the time slot is already booked for the doctor
        const existingAppointment = await Model.findOne({
            doctor,
            appointmentDate: new Date(appointmentDate),
            preferredTime,
        });

        if (existingAppointment) {
            return res.status(400).json({ message: 'This time slot is unavailable. Please select another slot.' });
        }

        // Create a new appointment
        const newAppointment = new Model({
            name,
            phoneNumber,
            appointmentDate: new Date(appointmentDate),
            preferredTime,
            doctor,
            userId,
        });

        const savedAppointment = await newAppointment.save();
        res.status(200).json({ message: 'Appointment booked successfully!', appointment: savedAppointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while booking the appointment.', error });
    }
});


router.get('/getAll', async (req, res) => {
    try{
        const doctors = await User.find({ userType: 'doctor' });
        if (!doctors.length) {
            return res.status(404).json({ message: 'No doctors found.' });
        }
        res.status(200).json(doctors);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.send(`Document with ${data.name} has been deleted..`);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})