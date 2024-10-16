// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA62WDAZdZdX69zTfOOfLmsfuS8X4sjow",
  authDomain: "binews-tsina.firebaseapp.com",
  projectId: "binews-tsina",
  storageBucket: "binews-tsina.appspot.com",
  messagingSenderId: "310160841853",
  appId: "1:310160841853:web:60799f0dbc6ab7731e2514",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
