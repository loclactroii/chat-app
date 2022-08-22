import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth } from 'firebase/auth'


// import formDate
import { query, Timestamp, getDocs, doc, onSnapshot, collection, getFirestore, connectFirestoreEmulator, where } from 'firebase/firestore'
// import { connectDatabaseEmulator, getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDECIvGQoS77HIoAVsk5qTLwrn2sDTiLCA",
  authDomain: "chat-app-1ec90.firebaseapp.com",
  projectId: "chat-app-1ec90",
  storageBucket: "chat-app-1ec90.appspot.com",
  messagingSenderId: "74377709091",
  appId: "1:74377709091:web:5138d88d436ebcee681396",
  measurementId: "G-TR20W2VBF3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app) 
const db = getFirestore(app)

// Connect Auth from emolator
connectAuthEmulator(auth, 'http://localhost:9099')

// Connect db from emolator
// eslint-disable-next-line no-restricted-globals
if(location.hostname === 'localhost') {
  connectFirestoreEmulator(db, 'localhost', 8080)
}


export { auth, db, Timestamp, onSnapshot, doc, collection, getDocs, where, query }

