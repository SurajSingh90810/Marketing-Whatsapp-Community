// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVS-rocP0t8buthrSouQUyZyVZIPm1QRo",
  authDomain: "goaldex-marketing.firebaseapp.com",
  projectId: "goaldex-marketing",
  storageBucket: "goaldex-marketing.firebasestorage.app",
  messagingSenderId: "312113072674",
  appId: "1:312113072674:web:2504f9485e59866a77187b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);