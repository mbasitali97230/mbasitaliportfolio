import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBRYkz0eNJhJgIW-pOqr3Qsuh8WcGXsVq0",
  authDomain: "mbasitali-ffa05.firebaseapp.com",
  projectId: "mbasitali-ffa05",
  storageBucket: "mbasitali-ffa05.firebasestorage.app",
  messagingSenderId: "443233941454",
  appId: "1:443233941454:web:a6717c24960043e8379d9f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
