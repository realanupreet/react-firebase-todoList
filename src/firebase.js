// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBQ4dRltyhDtsJhrAw1Ax92TV8RCTWm5w",
  authDomain: "notevenlinkedin.firebaseapp.com",
  projectId: "notevenlinkedin",
  storageBucket: "notevenlinkedin.appspot.com",
  messagingSenderId: "517129053798",
  appId: "1:517129053798:web:7c8dafc5e2710a2d44efa7",
  measurementId: "G-51QQ8YD5CG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();
