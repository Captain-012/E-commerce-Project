// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA5ms6v7I0rEKdBg63JDnA9ug0VMDuAe7I",
    authDomain: "ccollection-3b76b.firebaseapp.com",
    projectId: "ccollection-3b76b",
    storageBucket: "ccollection-3b76b.firebasestorage.app",
    messagingSenderId: "959238671507",
    appId: "1:959238671507:web:bd136a7cde27e5ed561166",
    measurementId: "G-PH0HSQ9H6D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
