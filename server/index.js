require('dotenv').config({ path: '../.env' });

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const app = express();
const path = require('path');
app.use(express.json())
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5000',  // Allow only this frontend domain
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const doctorRoutes = require('./routes/routes_doctor');
app.use('/doc', doctorRoutes);


const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

// Middleware to set up session
app.use(session({ secret: process.env.JWT_SECRET_KEY, resave: false, saveUninitialized: true }));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport Google Strategy setup
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback',  // This is the callback URI
}, (accessToken, refreshToken, profile, done) => {
  // Here you can handle the user profile, store the info in the session, etc.
  console.log(profile);  // User information from Google
  return done(null, profile); // This will store the user's profile in the session
}));

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Route to start the Google OAuth login
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Callback route where Google redirects after successful login
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful login, redirect to your desired page
    res.redirect('/');  // Example: redirect to a protected profile page
  }
);

// Protected profile route
app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/google');
  }
  res.json(req.user);  // Send the user info as JSON
});
  
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`)
})

// Import routes
const routes_user = require('./routes/routes_user');
const routes_appointment = require('./routes/routes_appointment');
const routes_auth = require('./routes/routes_auth');
const routes_google = require('./routes/routes_google');
const routes_doctor = require('./routes/routes_doctor');
const routes_review = require('./routes/routes_review');
const routes_records = require('./routes/routes_records');

app.use('/api', routes_user)                 //for user name and password
app.use('/appt', routes_appointment)         //for apppointment data
app.use('/auth', routes_auth)                //for login
app.use('/auth', routes_google)              //for login using google
app.use('/doc', routes_doctor)                //for doctor registration
app.use('/review', routes_review)             //for reviews
app.use('/records', routes_records)