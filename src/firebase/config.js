import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

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
// const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }

