// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";  // Optional, only if you're using Analytics
import { getAuth } from "firebase/auth";  // Firebase Authentication

// Your Firebase app's configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDyrB1Gg5NpNzwoDj8nKUE9cahqDe8YKg",
  authDomain: "signlanguagetranslator-46de2.firebaseapp.com",
  projectId: "signlanguagetranslator-46de2",
  storageBucket: "signlanguagetranslator-46de2.firebasestorage.app",
  messagingSenderId: "849969457619",
  appId: "1:849969457619:web:b5b00e80483cc703b1e726",
  measurementId: "G-CDTVSJHWJT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
const auth = getAuth(app);

// Firebase Analytics (optional)
const analytics = getAnalytics(app);

export { auth, analytics };  // Export the auth and analytics modules for use elsewhere
