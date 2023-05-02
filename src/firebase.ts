// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFtIgGVhUsFpGqoOmkRoIzpQzfitp-9TU",
  authDomain: "netflix-clone-defec.firebaseapp.com",
  projectId: "netflix-clone-defec",
  storageBucket: "netflix-clone-defec.appspot.com",
  messagingSenderId: "23810165344",
  appId: "1:23810165344:web:438863b225e52f0af5d105",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(firebaseApp);

export { auth };
export default db;
