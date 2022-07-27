import "./savedposts.css";
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonIcon,
  IonImg,
  // IonLabel,
  IonRow,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  ellipsisVertical,
  trash,
  trashBin,
  trashOutline,
} from "ionicons/icons";
import Moment from "react-moment";
import { useEffect, useRef, useState } from "react";
import { storage, db, auth } from "../../../firebase";
import {
  doc,
  deleteDoc,
  collection,
  getDocs,
  orderBy,
  onSnapshot,
  query,
} from "firebase/firestore";
import Post from "../Feed/post/post";

const Myposts = () => {
  const deleteUser = async (id) => {
    const userDoc = doc(db, "user", id);
    await deleteDoc(userDoc);
    console.log("clicked");
  };
  const [post, setPost] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const postCollection = collection(db, "users", auth.currentUser.uid, "saved_posts");
      const q = query(postCollection, orderBy("createdAt", "desc"));
      onSnapshot(q, (querySnapshot) => {
        let posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        setPost(posts);
      });
    };
    getUsers();
  }, []);
// console.log(post)
  return (
    <>
      {post.map((currentUser) => {
        return (
          <>
          <Post
              key={currentUser.id}
              id={currentUser.id}
              avatar={currentUser.avatar}
              name={currentUser.name}
              email={currentUser.email}
              img={currentUser.img}
              caption={currentUser.caption}
              createdAt={currentUser.createdAt}
              likes={currentUser.likes}
            />
          </>
        );
      })}
    </>
  );
};

export default Myposts;