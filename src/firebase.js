// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCummmJOPqC7T34XnWTKgNKm3CsPoBLUM8",
  authDomain: "markdown-notes-7ca40.firebaseapp.com",
  projectId: "markdown-notes-7ca40",
  storageBucket: "markdown-notes-7ca40.appspot.com",
  messagingSenderId: "128208445437",
  appId: "1:128208445437:web:6cd6c4b3b7f0b8cd894394",
};

// Initialize Firebase & FireStore Database
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes");
