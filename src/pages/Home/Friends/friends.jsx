import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { search } from "ionicons/icons";
import { useEffect } from "react";
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="black">
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
