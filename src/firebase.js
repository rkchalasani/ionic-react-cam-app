import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWtCIjSCqlL_euXp3_0lnyYhfyjcKhJsw",
  authDomain: "registrationform-b5171.firebaseapp.com",
  projectId: "registrationform-b5171",
  storageBucket: "registrationform-b5171.appspot.com",
  messagingSenderId: "813406538993",
  appId: "1:813406538993:web:af6611fc968cd5a7402d50",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
