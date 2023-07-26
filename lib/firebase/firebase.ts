// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9kFuxjZy52_ZL1CjDM6_tKRVbaojsMPY",
  authDomain: "sun-commerce.firebaseapp.com",
  projectId: "sun-commerce",
  storageBucket: "sun-commerce.appspot.com",
  messagingSenderId: "1049182482155",
  appId: "1:1049182482155:web:816fc78b082ac9d0b998ae",
  measurementId: "G-73RKTG7ZLF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
