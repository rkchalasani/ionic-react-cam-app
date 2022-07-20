import {
  IonActionSheet,
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  addCircleOutline,
  arrowBack,
  attach,
  attachOutline,
  caretForwardCircle,
  chevronForwardOutline,
  clipboard,
  clipboardOutline,
  closeCircle,
  duplicate,
  duplicateOutline,
  heart,
  personOutline,
  search,
  share,
  trash,
} from "ionicons/icons";
import Newuser from "./new/Newuser";
import "./Feed.css";
// import Propic from "./propic/propic";
import Posts from "./post/post";
import { UserAuth } from "../../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db, storage } from "../../../firebase";
import Tweet from "./tweet/tweet";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Tab2 = () => {
  // const openNew = () => {
  //   // router.push("/new");
  //   // window.location.reload();
  // };
  const openProfile = () => {
    router.push("/profile");
    // window.location.reload();
  };
  const hideTabs = () => {
    const tabsEl = document.querySelector("ion-tab-bar");
    if (tabsEl) {
      tabsEl.hidden = false;
    }
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useIonViewWillEnter(() => hideTabs());
  const deleteUser = async (id) => {
    const userDoc = doc(db, "user", id);
    // const usersCollection = collection(db, "user", id);
    const data = getDocs(userDoc);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    await deleteDoc(userDoc);
    // window.location.reload();
    console.log("clicked");
  };
  const [users, setUsers] = useState([]);
  const [userr, setUserr] = useState([]);
  const [post, setPost] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const postCollection = collection(db, "user");
      const q = query(postCollection, orderBy("createdAt", "desc"));
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
  const router = useIonRouter();
  const [data, setData] = useState([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

  const pushData = () => {
    const max = post.length + 5;
    const min = max - 5;
    const newData = [];
    for (let i = min; i < max; i++) {
      
    }
  };
  const loadData = (ev) => {
    setTimeout(() => {
      pushData();
      console.log("Loaded data");
      ev.target.complete();
      if (data.length === 5) {
        setInfiniteDisabled(data.length < 5);
      }
    }, 500);
  };

  useIonViewWillEnter(() => {
    pushData();
  });

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
            <IonCol className="feed-col1">
              <IonAvatar className="img-avatar">
                <IonImg
                  style={{ width: 40, height: 40 }}
                  onClick={openProfile}
                  src={
                    auth.currentUser.photoURL
                      ? auth.currentUser.photoURL
                      : "https://newhorizonindia.edu/nhengineering/mba/wp-content/uploads/2020/01/default_image_01.png"
                  }
                ></IonImg>
              </IonAvatar>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent className="feed-content" fullscreen>
        <Newuser />
        <Posts />

        <IonInfiniteScroll
          onIonInfinite={loadData}
          threshold="100px"
          disabled={isInfiniteDisabled}
        >
          <IonInfiniteScrollContent
            loadingSpinner="bubbles"
            loadingText="Loading more data..."
          ></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
