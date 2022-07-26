// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1FDJLZy_VfKaJznawAWbc9tTBJjjvO18",
  authDomain: "testeeng-6d68e.firebaseapp.com",
  databaseURL: "https://testeeng-6d68e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "testeeng-6d68e",
  storageBucket: "testeeng-6d68e.appspot.com",
  messagingSenderId: "93592455855",
  appId: "1:93592455855:web:fe69ebc50265d25937225a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);