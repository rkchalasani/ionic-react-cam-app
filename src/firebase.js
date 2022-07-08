import { initializeApp } from "firebase/app";
import { getAuth,  } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/app"
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCuI7reB-NCj-heCQyMGWOTDku5BzKBIiU",
  authDomain: "chatify-app-82c22.firebaseapp.com",
  projectId: "chatify-app-82c22",
  storageBucket: "chatify-app-82c22.appspot.com",
  messagingSenderId: "481165381434",
  appId: "1:481165381434:web:1804b87bebba415496ca03",
  measurementId: "G-RKMQ8S0JB9"
};

const app = initializeApp(firebaseConfig);
// export const storage = getStorage();
export const storage = getStorage(app)
// export const storage = app.getStorage();
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
// firebase.initializeApp(firebaseConfig)
// const storage = firebase.storage();
// export {storage, firebase as default}