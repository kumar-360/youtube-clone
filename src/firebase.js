import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDPfH26mn8umXzswSpKHpKRp6ag1me3Yr0",
    authDomain: "clone-a3ecd.firebaseapp.com",
    projectId: "clone-a3ecd",
    storageBucket: "clone-a3ecd.appspot.com",
    messagingSenderId: "914920852066",
    appId: "1:914920852066:web:1cd49c44b018acc7411f3b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db, firebaseConfig };