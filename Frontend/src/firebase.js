// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estatezone.firebaseapp.com",
  projectId: "estatezone",
  storageBucket: "estatezone.appspot.com",
  messagingSenderId: "1076381540524",
  appId: "1:1076381540524:web:6fec78113e02acc22d3f09"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);