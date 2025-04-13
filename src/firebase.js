// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDyrB1Gg5NpNzwoDj8nKUE9cahqDe8YKg",
  authDomain: "signlanguagetranslator-46de2.firebaseapp.com",
  projectId: "signlanguagetranslator-46de2",
  storageBucket: "signlanguagetranslator-46de2.appspot.com",
  messagingSenderId: "849969457619",
  appId: "1:849969457619:web:b5b00e80483cc703b1e726",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
