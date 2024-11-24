// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXIotcSDylTx9OINnFLGpWQYQLOChMVec",
  authDomain: "travel-guide-b42f0.firebaseapp.com",
  projectId: "travel-guide-b42f0",
  storageBucket: "travel-guide-b42f0.firebasestorage.app",
  messagingSenderId: "155843132924",
  appId: "1:155843132924:web:0a7aa4981c2cc591330679"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

