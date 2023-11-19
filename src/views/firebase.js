// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword  , signOut } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcSDwbvg8Rgf_A5zvTJG_KkPNQfPS12qk",
  authDomain: "prueba-a235b.firebaseapp.com",
  projectId: "prueba-a235b",
  storageBucket: "prueba-a235b.appspot.com",
  messagingSenderId: "696337403513",
  appId: "1:696337403513:web:e62201703121a5940a4ea8",
  measurementId: "G-T51EV334TE"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, analytics  , createUserWithEmailAndPassword  , signInWithEmailAndPassword  , signOut  };