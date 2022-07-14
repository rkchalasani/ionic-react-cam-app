import "./post.css";
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonIcon,
  IonImg,
  IonLabel,
  IonRow,
} from "@ionic/react";
import { ellipsisVertical, trashBin } from "ionicons/icons";
import Moment from "react-moment";
import { useEffect, useRef, useState } from "react";
import { storage, db, auth } from "../../../../firebase";
import { doc, deleteDoc, collection, getDocs } from "firebase/firestore";
import Propic from "../propic/propic";

const Tab2 = () => {
  const deleteUser = async (id) => {
    const userDoc = doc(db, "user", id);
    await deleteDoc(userDoc);
    window.location.reload();
    console.log("clicked");
  };
  const [users, setUsers] = useState([]);
  const [userr, setUserr] = useState([]);
  const [post, setPost] = useState([]);

  const usersCollectionRef = collection(db, "profile");
  const usersCollection = collection(db, "user");
  useEffect(() => {
    const getUsers = async () => {
      const datas = await getDocs(usersCollection);
      setPost(datas.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  return (
    <IonContent className="feed-content" fullscreen>
      {post.map((currentUser) => {
        return (
          <IonCard className="feed-grid" key={currentUser.id}>
            <IonRow className="username-row">
              <IonAvatar className="img-row">
                <Propic />
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
            <IonImg className="post" src={currentUser.img}></IonImg>
            <IonRow className="time">
              <Moment fromNow>{currentUser.createdAt.toDate()}</Moment>
              <IonButton
                color="transparent"
                className="del-btn"
                onClick={() => {
                  deleteUser(currentUser.id);
                }}
              >
                <IonIcon icon={trashBin}></IonIcon>
              </IonButton>
            </IonRow>
          </IonCard>
        );
      })}
    </IonContent>
  );
};

export default Tab2;
