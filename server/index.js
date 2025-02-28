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

app.use(session({ secret: process.env.JWT_SECRET_KEY, resave: false, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/google');
  }
  res.json(req.user);
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