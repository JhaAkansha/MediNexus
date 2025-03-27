const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
    },
    password: {
        required: false,
        type: String
    },
    userType: {
        required: false,
        enum: ['doctor', 'patient'],
        type: String
    }
})

//Hash the password
dataSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("Hashed password: ", this.password);
    next();
  });

module.exports = mongoose.model('users', dataSchema)