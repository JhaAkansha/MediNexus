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
        required: true,
        type: String
    },
    userId: { // Adding userId to associate the appointment with a user
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    }
});

module.exports = mongoose.model('appointment', dataSchema);
