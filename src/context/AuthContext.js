import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../firebase";
// import {doc, setDoc} from "firebase/firestore"
// import { auth } from "../firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // const emailVerification = (auth) => {
  //   sendEmailVerification(auth.currentUser);
  // };
  // const addData = async(auth, name, email) => {
  //   await setDoc(doc(db, "users", auth.currentUser.uid), {
  //     name : name,
  //     email : email
  //   });
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
      value={{
        createUser,
        user,
        logout,
        signIn,
        googleSignIn,
        // emailVerification,
        facebookSignIn,
        githubSignIn,
        // addData
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
