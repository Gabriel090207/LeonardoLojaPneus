import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQg74JBJhH3wtaNHsWurh-2YI8Sv_OWhM",
  authDomain: "primepneusgold-bancodedados.firebaseapp.com",
  projectId: "primepneusgold-bancodedados",
  storageBucket: "primepneusgold-bancodedados.firebasestorage.app",
  messagingSenderId: "834356375396",
  appId: "1:834356375396:web:3510a7aa293c6d4827d471",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);