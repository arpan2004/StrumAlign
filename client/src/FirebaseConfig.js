// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVQpBmnEjSAw6s97pWGLGIuaT1tZ3BSUE",
  authDomain: "vthacks12.firebaseapp.com",
  projectId: "vthacks12",
  storageBucket: "vthacks12.appspot.com",
  messagingSenderId: "893904276353",
  appId: "1:893904276353:web:4b44088fed6d92641df680",
  measurementId: "G-WR1V5ZX45C",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);