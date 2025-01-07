// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

// Firebase configuration (replace with your actual Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyBwdIOP63w-n7TNaNjHmNqZzB4ltRfnjmQ",
  authDomain: "medinexus-1af74.firebaseapp.com",
  projectId: "medinexus-1af74",
  storageBucket: "medinexus-1af74.firebasestorage.app",
  messagingSenderId: "400900687919",
  appId: "1:400900687919:web:583e56e64bf6fc8407deda",
  measurementId: "G-CBK625LYHY"
};

// Initialize Firebase (this should only happen once)
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log("Firebase app initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase app:", error);
}

const auth = getAuth(app);

// Check if auth is properly initialized
if (auth) {
  console.log("Firebase Auth initialized successfully");
} else {
  console.error("Error: Firebase Auth not initialized");
}

export { auth, createUserWithEmailAndPassword, sendEmailVerification };
