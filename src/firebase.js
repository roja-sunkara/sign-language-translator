// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Optional: Only use Analytics if you're on a supported environment
// import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDyrB1Gg5NpNzwoDj8nKUE9cahqDe8YKg",
  authDomain: "signlanguagetranslator-46de2.firebaseapp.com",
  projectId: "signlanguagetranslator-46de2",
  storageBucket: "signlanguagetranslator-46de2.appspot.com",  // Fixed the typo `.app` ➜ `.appspot.com`
  messagingSenderId: "849969457619",
  appId: "1:849969457619:web:b5b00e80483cc703b1e726",
  measurementId: "G-CDTVSJHWJT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
// const analytics = getAnalytics(app); // Only enable if using Analytics

export { auth };
