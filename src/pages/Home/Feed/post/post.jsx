import "./post.css";
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
import { storage, db, auth } from "../../../../firebase";
import {
  doc,
  deleteDoc,
  collection,
  getDocs,
  orderBy,
  onSnapshot,
  query,
} from "firebase/firestore";
import Delbtn from "../delete/delbtn";

const Tab2 = () => {
  const deleteUser = async (id) => {
    const userDoc = doc(db, "user", id);
    await deleteDoc(userDoc);
    console.log("clicked");
  };
  const [post, setPost] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const postCollection = collection(db, "user");
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

  return (
    <>
      {post.map((currentUser) => {
        return (
          <IonCard className="feed-grid" key={currentUser.id}>
            <IonRow className="username-row">
              <IonAvatar className="img-row">
                <IonImg
                  className=""
                  src={
                    currentUser.avatar
                      ? currentUser.avatar
                      : "https://newhorizonindia.edu/nhengineering/mba/wp-content/uploads/2020/01/default_image_01.png"
                  }
                ></IonImg>
              </IonAvatar>
              <IonCol className="username-col">
                <IonRow className="hello">
                  <IonLabel className="card-subtitle" color="smoke">
                    {currentUser.name}
                  </IonLabel>
                </IonRow>
                <IonRow className="hello">
                  <IonLabel className="card-caption">
                    {currentUser.email}
                  </IonLabel>
                </IonRow>
              </IonCol>
              <IonIcon
                color="smoke"
                id="open-popover"
                icon={ellipsisVertical}
              ></IonIcon>
            </IonRow>
            <IonRow className="caption-row">
              <IonLabel color="smoke" className="caption">
                {currentUser.caption}
              </IonLabel>
            </IonRow>
            {currentUser.img ? (
              <IonAvatar className="post-avatar">
                <IonImg src={currentUser.img}></IonImg>
              </IonAvatar>
            ) : (
              <IonImg src={currentUser.img}></IonImg>
            )}
            <IonRow className="time">
              <IonCol className="moment">
                <Moment fromNow>{currentUser.createdAt.toDate()}</Moment>
              </IonCol>
              {auth.currentUser.email === currentUser.email ? (
                <IonButton
                  color="lightgreen"
                  onClick={() => {
                    deleteUser(currentUser.id);
                  }}
                >
                  <IonIcon icon={trash}></IonIcon>
                </IonButton>
              ) : (
                <IonRow></IonRow>
              )}
            </IonRow>
          </IonCard>
        );
      })}
    </>
  );
};

export default Tab2;
