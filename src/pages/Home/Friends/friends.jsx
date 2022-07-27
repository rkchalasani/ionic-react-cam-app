import {
  IonAvatar,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { chevronForwardOutline, search } from "ionicons/icons";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import Users from './users/users'
import "./friends.css";
import { UserAuth } from "../../../context/AuthContext";
const Friends = () => {
  const {post, setPost} = UserAuth()
  useEffect(() => {
    const getUsers = async () => {
      const postCollection = collection(db, "users");
      const q = query(postCollection, orderBy("createdAt", "asc"));
      onSnapshot(q, (querySnapshot) => {
        let posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({...doc.data(), id: doc.id });
        });
        setPost(posts);
      });
    };
    getUsers();
  }, []);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="darkgreen">
          <IonRow className="search-row">
            <IonCol className="friends-col">
              <IonLabel className="frnds" color="smoke">
                Friends
              </IonLabel>
            </IonCol>
            <IonIcon
              className="icon"
              style={{ height: 27, width: 27 }}
              icon={search}
            ></IonIcon>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent className="tab1mainpage" fullscreen>
        <IonGrid className="tab1-grid">
          {post.map((currentUser) => {
            return (
             
             <Users
             key={currentUser.uid}
             id={currentUser.uid}
             name={currentUser.name}
             email = {currentUser.email}
             photoURL = {currentUser.photoURL}
             />
            );
          })}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Friends;
