// firebase.js

import firebase from "firebase/compat/app"; // Import the Firebase compat version for Firebase v9+
import "firebase/compat/auth"; // Import Firebase Authentication
import "firebase/compat/firestore"; // Import Firestore
import "firebase/compat/storage"; // Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyC4bHZx0xOxsQiLZG24dR2ptAVEJ6_EfvY",
  authDomain: "disney-d36b7.firebaseapp.com",
  projectId: "disney-d36b7",
  storageBucket: "disney-d36b7.firebasestorage.app",
  messagingSenderId: "1013100135090",
  appId: "1:1013100135090:web:f1e5f57b0e67cc75e77fab",
  measurementId: "G-QF4DCHYWZP"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Firebase services
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
