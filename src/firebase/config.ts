
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA5hkbOFiJQ8z7FXR6RhxJccm9Dl2U0n3Y",
  authDomain: "chat-app-f9a52.firebaseapp.com",
  projectId: "chat-app-f9a52",
  storageBucket: "chat-app-f9a52.appspot.com",
  messagingSenderId: "44357802101",
  appId: "1:44357802101:web:f548fbf75496f8f307003c",
  measurementId: "G-QRDXVT11KV"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)


export { db, auth }
export default app

