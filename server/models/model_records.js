const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    file: {
        type: String,
        required: false
    },
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('medical_records', dataSchema);