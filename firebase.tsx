import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyCfi2LiTusumVojhq6yR0LAHVE6NzFQywc",
  authDomain: "aail-chatty.firebaseapp.com",
  projectId: "aail-chatty",
  storageBucket: "aail-chatty.appspot.com",
  messagingSenderId: "617585789084",
  appId: "1:617585789084:web:a87bf9a0a40ee23a11c559",
  measurementId: "G-G6DLLY6EGH"
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app)

const storage = getStorage(app);

export {app, db, storage, auth};