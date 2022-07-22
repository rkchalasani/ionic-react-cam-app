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
} from "@ionic/react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { chevronForwardOutline, search } from "ionicons/icons";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import "./friends.css";
const Friends = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const postCollection = collection(db, "users");
      const q = query(postCollection, orderBy("createdAt", "asc"));
      onSnapshot(q, (querySnapshot) => {
        let posts = [];
        querySnapshot.forEach((doc) => {
          posts.push(doc.data());
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
              <IonRow className="danni-row">
                <IonAvatar className="img-avatar">
                  <IonImg
                    src={
                      currentUser.photoURL
                        ? currentUser.photoURL
                        : "https://newhorizonindia.edu/nhengineering/mba/wp-content/uploads/2020/01/default_image_01.png"
                    }
                  ></IonImg>
                </IonAvatar>
                <IonCol className="col1">
                  <IonLabel color="smoke" className="danni-label">
                    {currentUser.name}
                  </IonLabel>
                  <IonLabel color="smoke" className="danni-label">
                    {currentUser.email}
                  </IonLabel>
                </IonCol>
                <IonLabel color="smoke" className="danni-label">
                  <IonIcon
                    style={{ height: 23, width: 23 }}
                    icon={chevronForwardOutline}
                  ></IonIcon>
                </IonLabel>
              </IonRow>
            );
          })}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Friends;
