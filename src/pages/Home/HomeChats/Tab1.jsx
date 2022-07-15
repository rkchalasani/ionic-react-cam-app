import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import { collection, getDocs } from "firebase/firestore";
import { chevronForwardOutline, search, searchCircle } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../../../context/AuthContext";
import { db } from "../../../firebase";
import "./Tab1.css";
import Moment from "react-moment";
import Propic from "../Feed/propic/propic";
const Tab1 = () => {
  const router = useIonRouter();
  const openChat = () => {
    router.push("/chats");
  };
  const [post, setPost] = useState([]);

  const usersCollection = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {
      const datas = await getDocs(usersCollection);
      setPost(datas.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="darkgreen">
          <IonRow className="search-row">
            <IonCol className="col2">
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
                  {/* <Propic /> */}
                  <IonImg
                    // onClick={openProfile}
                    // style={{ height: 23, width: 23 }}
                    className=""
                    src={currentUser.photoURL}
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

export default Tab1;
