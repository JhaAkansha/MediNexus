const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    speciality: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    image: {
        type: String,
        required: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    }
});

module.exports = mongoose.model('doctor', dataSchema);