require('dotenv').config({ path: '../.env' });


const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const app = express();
app.use(express.json())

mongoose.connect(mongoString);
const database = mongoose.connection; 

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

const routes_user = require('./routes/routes_user');
const routes_appointment = require('./routes/routes_appointment');
const routes_auth = require('./routes/routes_auth');

app.use('/api', routes_user)                //for user name and password
app.use('/appt', routes_appointment)        //for apppointment data
app.use('/auth', routes_auth)               //for login