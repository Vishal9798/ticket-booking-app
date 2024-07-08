// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCdMEYfodmCWfXLBmoeajvmBEJ7ciOjvWI",
    authDomain: "ticket-booking-app-35500.firebaseapp.com",
    projectId: "ticket-booking-app-35500",
    storageBucket: "ticket-booking-app-35500.appspot.com",
    messagingSenderId: "77028812328",
    appId: "1:77028812328:web:7d4c57b363c9150114371d",
    measurementId: "G-4VBVEGZ3S4"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
