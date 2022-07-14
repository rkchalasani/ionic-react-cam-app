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
import Moment from "react-moment";
import dayjs from "dayjs";

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
  orderBy,
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
  const [post, setPost] = useState([]);

  const usersCollectionRef = collection(
    db,
    "profile"
    // "uid"
    // auth.currentUser.uid,
    // "posts"
  );
  const usersCollection = collection(
    //posts
    db,
    "user"
    // "uid"
    // auth.currentUser.uid,
    // "posts"
  );
  // const profileImg = collection(db, "users", auth.currentUser.uid, "posts");

  const [data, setData] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const datas = await getDocs(usersCollection, orderBy("createdAt", "asc"));
      setPost(datas.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      const data = await getDocs(
        usersCollectionRef,
        orderBy("createdAt", "asc")
      );
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // const dataa = await getDocs(profileImg);
      // setUserr(dataa.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // console.log()
    };

    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const Popover = () => <Delbtn />;

  const [present, dismiss] = useIonPopover(Popover, {
    onDismiss: (data, role) => dismiss(data, role),
  });
  const [roleMsg, setRoleMsg] = useState("");
  // const timeStamp = (not)=>{
  // const time = dayjs(not.createdAt).fromNow();

  // }
  // useEffect(() => {

  // }, []);
  return (
    <IonContent className="feed-content" fullscreen>
      {post.map((currentUser) => {
        // console.log(currentUser.timeStamp.toString());

        return (
          <IonCard className="feed-grid" key={currentUser.id}>
            <IonRow className="username-row">
              <IonAvatar className="img-row">
                <Propic />
                {/* {users.map((users) => {
                  return <IonImg className="post" src={users.img}></IonImg>;
                })} */}
                {/* {post.map((currentUser) => {
                  return <IonImg className="post" src={currentUser.img}></IonImg>;
                })} */}
                {/* <IonImg src={userr.img}></IonImg> */}
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
            {/* {userr.map((currentUser) => {
              return <IonImg className="post" src={currentUser.img}></IonImg>;
            })} */}
            <IonImg className="post" src={currentUser.img}></IonImg>
            <IonRow className="time">
              <Moment fromNow>{currentUser.createdAt.toDate()}</Moment>
            </IonRow>
          </IonCard>
        );
      })}
    </IonContent>
    //   </IonPage>
  );
};

export default Tab2;
