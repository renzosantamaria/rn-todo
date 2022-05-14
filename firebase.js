import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { getStorage } from 'firebase/storage'
import { initializeFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBDRQEJzHPtvM1MDZq4Iq9lQk5PQVKxD6M",
  authDomain: "rn-todo-bc3f7.firebaseapp.com",
  databaseURL: "https://rn-todo-bc3f7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rn-todo-bc3f7",
  storageBucket: "rn-todo-bc3f7.appspot.com",
  messagingSenderId: "66998984893",
  appId: "1:66998984893:web:d6ae7db2edcab821d5d7d4"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = initializeFirestore(app, { experimentalForceLongPolling: true })

export function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}

export function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
}