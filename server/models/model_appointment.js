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
        type: Date      //Verify this
    },
    preferredTime: {
        required: true,
        type: String
    },
    doctor: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('appointment', dataSchema)