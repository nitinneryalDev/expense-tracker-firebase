// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//  import { getAnalytics } from "firebase/analytics";
import  { getAuth , GoogleAuthProvider } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAm3U3rpFzI4fDUEAAZudWHwTxZIwFXHI",
  authDomain: "expence-tracker-cae6c.firebaseapp.com",
  projectId: "expence-tracker-cae6c",
  storageBucket: "expence-tracker-cae6c.appspot.com",
  messagingSenderId: "1062535407022",
  appId: "1:1062535407022:web:80933f878591911a7a543f",
  measurementId: "G-LLGHMBS1LH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
