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
  addCircleSharp,
  bookmark,
  chatbubble,
  ellipsisVertical,
  heart,
  menu,
  search,
} from "ionicons/icons";
import { userColumns, userRows } from "../../../datatablesource";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./Tab2.css";
import { storage, db, auth } from "../../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import {
  getDoc,
  doc,
  deleteDoc,
  onSnapshot,
  collection,
  addDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { Link } from "react-router-dom";

const Tab2 = () => {
  const [img, setImg] = useState();
  const router = useIonRouter();
  const [apiData, setApiData] = useState([]);
  const [user, setUser] = useState();
  const [link, setLink] = useState();

  // const [data, setData] = useState([]);
  const openNew = () => {
    router.push("/new");
    window.location.reload();
  };
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newImg, setNewImg] = useState("");

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(
    db,
    "users",
    auth.currentUser.uid,
    "posts"
  );

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  // const updateUser = async (id, age) => {
  //   const userDoc = doc(db, "users", auth.currentUser.uid, "details", id);
  //   const newFields = { age: age + 1 };
  //   await updateDoc(userDoc, newFields);
  // };

  const deleteUser = async (id) => {
    // const userDoc = doc(db, "users", auth.currentUser.uid, "posts", id);
    // await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const popover = useRef<HTMLIonPopoverElement>(null);
  const Popover = () => (
    <IonRow className="edit-delete">
      {" "}
      <IonButton
        className="edit-btn"
        color="darkgreen"
        onClick={() => {
          deleteUser(user.id);
        }}
      >
        Edit
      </IonButton>
      <IonButton
        className="edit-btn"
        color="darkgreen"
        onClick={() => {
          deleteUser(user.id);
        }}
      >
        Delete
      </IonButton>
    </IonRow>
  );

  const [present, dismiss] = useIonPopover(Popover, {
    onDismiss: (data, role) => dismiss(data, role),
    // translucent: true
    // mode: 'md'
    // color: 'darkgreen'
  });
  const [roleMsg, setRoleMsg] = useState("");

  return (
    <IonPage>
      <IonContent className="feed-content" fullscreen>
        <IonRow className="search-row">
          <IonCol>
            <IonLabel color="smoke">Feed</IonLabel>
          </IonCol>
          <IonButton color="transparent" onClick={openNew} className="add-btn">
            <IonIcon
              style={{ height: 40, width: 40 }}
              icon={addCircleSharp}
            ></IonIcon>
          </IonButton>
        </IonRow>
        <IonGrid className="feed-grid">
          {users.map((user) => {
            return (
              <IonCard className="card-div">
                <IonRow className="username-row">
                  {" "}
                  <IonCol className="username-col">
                    <IonLabel className="card-subtitle" color="smoke">
                      {user.username}
                    </IonLabel>
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
                  {/* <IonPopover
                    isOpen={popoverOpen}
                    onDidDismiss={() => setPopoverOpen(false)}
                  >
                    <IonContent class="ion-padding">Hello World!</IonContent>
                  </IonPopover> */}
                </IonRow>
                <IonImg src={user.img}></IonImg>

                <IonCardContent className="card-caption">
                  {user.caption}
                </IonCardContent>
              </IonCard>
            );
          })}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
