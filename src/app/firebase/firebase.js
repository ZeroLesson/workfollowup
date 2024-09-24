// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbcStEEA8Arf5eCrUciaWNqU72w_NqyxU",
  authDomain: "workfollowup-78e1d.firebaseapp.com",
  projectId: "workfollowup-78e1d",
  storageBucket: "workfollowup-78e1d.appspot.com",
  messagingSenderId: "931417006006",
  appId: "1:931417006006:web:3cd5c2954b30070ec8eb17",
  measurementId: "G-16QMRGJBYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getStorage(app);