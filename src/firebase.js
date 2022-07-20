import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDNhL8YRJGab8DbRVy-LAysSwTE08CmVzY",
  authDomain: "chat-application-ef9f6.firebaseapp.com",
  projectId: "chat-application-ef9f6",
  storageBucket: "chat-application-ef9f6.appspot.com",
  messagingSenderId: "605539583852",
  appId: "1:605539583852:web:08f5e6c59f4d615947d549",
  measurementId: "G-4F8KEL0NQP",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
