import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBsxsyTXVrmtV6xFX3A_8wfQeXTDWt364Y",
    authDomain: "whats-up-clone-153ae.firebaseapp.com",
    projectId: "whats-up-clone-153ae",
    storageBucket: "whats-up-clone-153ae.appspot.com",
    messagingSenderId: "928137572948",
    appId: "1:928137572948:web:cc093e90d1234a3fc933c1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


//auth
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();



export default db;