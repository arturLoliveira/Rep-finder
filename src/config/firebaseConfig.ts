import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "",
  authDomain: "finder-798c6.firebaseapp.com",
  projectId: "finder-798c6",
  storageBucket: "finder-798c6.firebasestorage.app",
  messagingSenderId: "",
  appId: "",
  measurementId: "G-8Z2CBXL3BN"
};
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app);
