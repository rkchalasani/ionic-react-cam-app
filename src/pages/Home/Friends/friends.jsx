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
  useIonViewWillEnter,
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
  const {friends, setFriends} = UserAuth()
  useEffect(() => {
    const getUsers = async () => {
      const postCollection = collection(db, "users");
      const q = query(postCollection, orderBy("createdAt", "asc"));
      onSnapshot(q, (querySnapshot) => {
        let posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({...doc.data(), id: doc.id });
        });
        setFriends(posts);
      });
    };
    getUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const hideTabs = () => {
    const tabsEl = document.querySelector("ion-tab-bar");
    if (tabsEl) {
      tabsEl.hidden = false;
    }
  };
  useIonViewWillEnter(() => hideTabs());
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
        <IonGrid  className="tab1-grid">
          {friends.map((currentUser) => {
            return (
             <Users
             key={currentUser.uid}
             follow={currentUser.follow}
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
