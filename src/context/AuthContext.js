import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { FacebookAuthProvider,GithubAuthProvider, sendEmailVerification   } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import { async } from "@firebase/util";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
    
  };
  const emailVerification = (auth)=>{
    sendEmailVerification(auth.currentUser);
  }
  // const emailVerification=async(email, password)=>{
  // const result  = await FirebaseError.auth().createUserWithEmailAndPassword(email, password)
  // await result.user.sendEmailVerification()
  // }
  const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleAuthProvider);
  };
  const facebookSignIn = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider);
  };
  const githubSignIn = () => {
    const gitprovider = new GithubAuthProvider();
    signInWithPopup(auth, gitprovider);
  };


  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ createUser, user, logout, signIn, googleSignIn,
        emailVerification, facebookSignIn, githubSignIn }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
