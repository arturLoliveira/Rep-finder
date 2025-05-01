import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBD4U1Su7NAt_hKTTNSHn4T1xN5L2uDJSk",
  authDomain: "finder-798c6.firebaseapp.com",
  projectId: "finder-798c6",
  storageBucket: "finder-798c6.firebasestorage.app",
  messagingSenderId: "563927585752",
  appId: "1:563927585752:web:ff4dbc229d9e40b5b358ad",
  measurementId: "G-8Z2CBXL3BN"
};
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app);