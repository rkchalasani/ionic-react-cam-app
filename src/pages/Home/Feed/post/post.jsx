import "./post.css";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonModal,
  IonPage,
  IonPopover,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonPopover,
  useIonRouter,
} from "@ionic/react";
import {
  add,
  addCircleOutline,
  addCircleSharp,
  addOutline,
  bookmark,
  chatbubble,
  checkmarkCircleOutline,
  closeCircleOutline,
  ellipsisVertical,
  heart,
  menu,
  personAddOutline,
  personOutline,
  search,
} from "ionicons/icons";
//   import { userColumns, userRows } from "../../../datatablesource";
//   import axios from "axios";
import { useEffect, useRef, useState } from "react";
//   import "./Tab2.css";
import { storage, db, auth } from "../../../../firebase";
//   import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import {
  getDoc,
  doc,
  deleteDoc,
  onSnapshot,
  collection,
  addDoc,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
//   import Posts from "./profile/profile";
import { UserAuth } from "../../../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import Propic from "../propic/propic";
import Delbtn from "../delete/delbtn";

const Tab2 = () => {
  const { user, userlist, setUserList } = UserAuth();
  const [users, setUsers] = useState([]);
  const [userr, setUserr] = useState([]);

  const usersCollectionRef = collection(
    db,
    "users",
    auth.currentUser.uid,
    "posts"
  );
  const userCollectionRef = collection(
    db,
    "users",
    auth.currentUser.uid,
    "profile"
  );

  const [data, setData] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      const dataa = await getDocs(userCollectionRef);
      setUserr(dataa.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const Popover = () => <Delbtn />;

  const [present, dismiss] = useIonPopover(Popover, {
    onDismiss: (data, role) => dismiss(data, role),
  });
  const [roleMsg, setRoleMsg] = useState("");

  // useEffect(() => {

  // }, []);
  return (
    <IonContent className="feed-content" fullscreen>
      {users.map((currentUser) => {
        return (
          <IonCard className="feed-grid">
            <IonRow className="username-row">
              <IonAvatar className="img-row">
                <Propic />
                {userr.map((user) => {
                  return <IonImg className="post" src={user.img}></IonImg>;
                })}
                {/* <IonImg src={userr.img}></IonImg> */}
              </IonAvatar>
              <IonCol className="username-col">
                <IonRow className="hello">
                  <IonLabel className="card-subtitle" color="smoke">
                    {user.displayName}
                  </IonLabel>
                </IonRow>
                <IonRow className="hello">
                  <IonLabel className="card-caption">{user.email}</IonLabel>
                </IonRow>
              </IonCol>
              <IonIcon
                onClick={(e) =>
                  present({
                    event: e,
                    onDidDismiss: (e) =>
                      setRoleMsg(
                        `Popover dismissed with role: ${e.detail.role}`
                      ),
                  })
                }
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
            {/* <video
              className="post"
              muted
              autoPlay
              loop
              src={currentUser.img}
            ></video> */}
          </IonCard>
        );
      })}
    </IonContent>
    //   </IonPage>
  );
};

export default Tab2;
