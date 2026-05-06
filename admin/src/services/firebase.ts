import { initializeApp } from "firebase/app";

// 🔥 banco
import { getFirestore } from "firebase/firestore";

// 🔥 imagens
import { getStorage } from "firebase/storage";


// login
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQg74JBJhH3wtaNHsWurh-2YI8Sv_OWhM",
  authDomain: "primepneusgold-bancodedados.firebaseapp.com",
  projectId: "primepneusgold-bancodedados",
  storageBucket: "primepneusgold-bancodedados.firebasestorage.app",
  messagingSenderId: "834356375396",
  appId: "1:834356375396:web:3510a7aa293c6d4827d471",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);