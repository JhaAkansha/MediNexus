const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    doctor: {
        required: true,
        type: String
    },
    satisfaction: {
        required: true,
        type: String
    },
    experience: {
        required:false,
        type:String
    }
});

module.exports = mongoose.model('review', dataSchema);