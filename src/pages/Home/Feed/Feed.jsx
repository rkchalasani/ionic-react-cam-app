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
import "./Feed.css";
// import Propic from "./propic/propic";
import Posts from "./post/post";
import { UserAuth } from "../../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db, storage } from "../../../firebase";
import Tweet from "./tweet/tweet";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Tab2 = () => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  // const router = useIonRouter();
  const openNew = () => {
    router.push("/new");
    // window.location.reload();
  };
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
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  // const router = useIonRouter();
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e, id) => {
    e.preventDefault();
    try {
      await addDoc(
        collection(
          db,
          "user"
          // auth.currentUser.uid, "posts"
        ),
        {
          ...data,
          createdAt: new Date(),
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
          avatar: auth.currentUser.photoURL
        }
      );
      router.push("/home/tab1");
      // window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };
  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useIonViewWillEnter(() => hideTabs());
  const router = useIonRouter();
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
              <IonIcon
                color="smoke"
                onClick={openNew}
                // onClick={() => setShowActionSheet(true)}
                expand="block"
                className="new-icon"
                icon={duplicateOutline}
              ></IonIcon>
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
        <IonCard className="newpost-card" color="darkgreen">
          <IonRow className="newpost-row">
            <IonAvatar
              className="newpost-avatar"
              style={{ width: 50, height: 50 }}
            >
              <IonImg src={auth.currentUser.photoURL}></IonImg>
            </IonAvatar>
            <IonInput
              onIonChange={handleInput}
              type="text"
              color="smoke"
              placeholder="whats on your mind ..?"
            ></IonInput>
            <IonIcon
              style={{ width: 35, height: 35 }}
              onClick={handleClick}
              icon={attachOutline}
            ></IonIcon>
            <input
              type="file"
              id="file"
              ref={hiddenFileInput}
              style={{ display: "none" }}
              className="form-control"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </IonRow>
          <IonRow className="newpost-row">
            <IonButton
              onClick={handleAdd}
              color="lightgreen ion-text-capitalize"
            >
              <IonLabel color="smoke">Post</IonLabel>
            </IonButton>
            <IonButton color="lightgreen ion-text-capitalize">
              <IonLabel color="smoke">Discard</IonLabel>
            </IonButton>
          </IonRow>
        </IonCard>
        <Posts />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
