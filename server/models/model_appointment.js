const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    phoneNumber: {
        required: true,
        type: String
    },
    appointmentDate: {
        required: true,
        type: Date // Change from String to Date
    },
    preferredTime: {
        required: true,
        type: String
    },
    doctor: {
        type: String,
        required: true
    },
    doctorId: {
       type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctor', 
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('appointment', dataSchema);
