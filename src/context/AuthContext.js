import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

const UserContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState({});
  const [mypost, setMyPost] = useState([]);
  const [friends, setFriends] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLogged, setIsLogged] = useState([]);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
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
  const addData = async (auth, email, name) => {
    setDoc(doc(db, "users", auth.currentUser.uid), {
      uid: auth.currentUser.uid,
      name: name,
      email: email,
      phone: "",
      bio: "",
      createdAt: Timestamp.fromDate(new Date()),
    });
  };
  const logout = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const [users, setUsers] = useState();

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        users,
        setUsers,
        isLogged,
        setIsLogged,
        logout,
        signIn,
        googleSignIn,
        addData,
        facebookSignIn,
        githubSignIn,
        friends,
        setFriends,
        posts,
        setPosts,
        userPosts,
        mypost,
        setUserPosts,
        setMyPost,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
