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
//   import { userColumns, userRows } from "../../../datatablesource";
//   import axios from "axios";
  import { useEffect, useRef, useState } from "react";
  import "./post.css";
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
  } from "firebase/firestore";
  
  const Tab2 = () => {
    const [img, setImg] = useState();
    const router = useIonRouter();
    const [apiData, setApiData] = useState([]);
    const [user, setUser] = useState();
    const [link, setLink] = useState();
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
    const deleteUser = async (id) => {
      const userDoc = doc(db, "users", auth.currentUser.uid, "posts", id);
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
      </IonRow>
    );
  
    const [present, dismiss] = useIonPopover(Popover, {
      onDismiss: (data, role) => dismiss(data, role),
    });
    const [roleMsg, setRoleMsg] = useState("");
  
    return (
      
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
                  </IonRow>
                  <IonImg src={user.img}></IonImg>
  
                  <IonCardContent className="card-caption">
                    {user.caption}
                    
                  </IonCardContent>
                </IonCard>
              );
            })}
          </IonGrid>

    );
  };
  
  export default Tab2;
  