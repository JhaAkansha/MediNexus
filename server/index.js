require('dotenv').config(); // Ensure .env is loaded correctly

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL; // Get the database URL from .env file
const app = express();

app.use(express.json());

const cors = require('cors');
app.use(cors()); // Enable CORS for all routes

// Connect to the MongoDB database
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

// Import routes
const routes_user = require('./routes/routes_user');
const routes_appointment = require('./routes/routes_appointment');
const routes_auth = require('./routes/routes_auth');

// Use routes
app.use('/api', routes_user); // for user name and password
app.use('/appt', routes_appointment); // for appointment data
app.use('/auth', routes_auth); // for login

// Listen on the port from the .env file
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
