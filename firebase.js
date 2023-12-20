// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firebase-firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2-Cjdmxj1UOcZInAAdRYvSmVvIhe2_EE",
  authDomain: "minimaxme.firebaseapp.com",
  projectId: "minimaxme",
  storageBucket: "minimaxme.appspot.com",
  messagingSenderId: "937352620954",
  appId: "1:937352620954:web:7e643bf10745a40990a823",
  measurementId: "G-W0F7ZHD6QL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);