// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC-e1mHf4ycNDgAdU7rSlJWHmRSfXD4pZc",
  authDomain: "finna-coming-soon.firebaseapp.com",
  databaseURL:
    "https://finna-coming-soon-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "finna-coming-soon",
  storageBucket: "finna-coming-soon.appspot.com",
  messagingSenderId: "181558041715",
  appId: "1:181558041715:web:b0553757bdf19f6f3e9e06",
  measurementId: "G-V2ZRCW6NHB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

export const blogCollection = collection(db, "vishalTesting");
