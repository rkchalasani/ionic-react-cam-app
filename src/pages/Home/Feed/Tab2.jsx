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
// import { userColumns, userRows } from "../../../datatablesource";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./Tab2.css";
import { storage, db, auth } from "../../../firebase";
// import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
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
import Posts from "./post/post";
import { UserAuth } from "../../../context/AuthContext";
import { updateProfile } from "firebase/auth";

const Tab2 = () => {
  const { user } = UserAuth();
  const [img, setImg] = useState();
  const router = useIonRouter();
  const [apiData, setApiData] = useState([]);
  // const [user, setUser] = useState();
  const [link, setLink] = useState();
  const openNew = () => {
    router.push("/new");
    window.location.reload();
  };
  const openProfile = () => {
    router.push("/profile");
    // window.location.reload();
  };
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newImg, setNewImg] = useState("");

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(
    db,
    "feed"
  );
  const deleteUser = async (id) => {
    const userDoc = doc(db, "feed" );
    await deleteDoc(userDoc);
    console.log("clicked");
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);
  const Popover = () => (
    <IonRow className="edit-delete">
      <IonItem color="smoke" onClick={() => {}}>
        Edit
      </IonItem>
      <IonButton
        color="smoke"
        onClick={() => {
          deleteUser(user.id);
        }}
      >
        Delete
      </IonButton>
    </IonRow>
  );
  const user_id = user.uid;

  const [uname, setUname] = useState(user.displayName);
  const [ email, setEmail] = useState(user.email)
  const [isUpdate, setIsUpdate] = useState(false);
  // const handleUpdate = async () => {
  //   const userRef = doc(db, "users", user_id);

  //   try {
  //     await updateProfile(auth.currentUser, {
  //       displayName: uname,
  //       displayEmail:email
  //     })
  //       .then(() => {
  //         console.log(auth.currentUser.displayName);
  //       })
  //       .catch((error) => {
  //         // handleAlert(error.message);
  //       });

  //     await updateDoc(userRef, {
  //       name: uname,
  //       email:email
  //     });

  //     setIsUpdate(false);
  //   } catch (error) {
  //     // handleAlert(error.message);
  //   }
  // };
  const [present, dismiss] = useIonPopover(Popover, {
    onDismiss: (data, role) => dismiss(data, role),
  });
  // const [roleMsg, setRoleMsg] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="darkgreen">
          <IonRow className="search-row1">
            <IonCol className="col2">
              <IonImg
                style={{ height: 53 }}
                src="assets/images/Group 22.png "
              ></IonImg>
            </IonCol>
            <IonIcon
              className="icon"
              style={{ height: 27, width: 27 }}
              onClick={openNew}
              icon={addCircleOutline}
            ></IonIcon>
            <IonIcon
              className="icon"
              onClick={openProfile}
              style={{ height: 23, width: 23 }}
              icon={personOutline}
            ></IonIcon>
          </IonRow>
        </IonToolbar>
      </IonHeader>
  
      <Posts/>
    </IonPage>
  );
};

export default Tab2;
