import "./new.css";
import { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth, db, storage } from "../../../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  useIonLoading,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import { MDBInput } from "mdbreact";
import {
  arrowBack,
  arrowBackCircle,
  attachOutline,
  backspace,
  cloudUpload,
} from "ionicons/icons";

const New = ({ inputs, email, title }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");

  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [dataa, setDataa] = useState({});

  const [per, setPerc] = useState(null);
  const router = useIonRouter();
  const [show, dismiss] = useIonLoading();
  const handleLoad = (m) => {
    show({
      message: m,
      spinner: "lines-sharp",
      mode: "ios",
    });
  };
  useEffect(() => {
    const uploadFile = (e) => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      handleLoad("uploading..");
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // eslint-disable-next-line react-hooks/rules-of-hooks

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
          if(progress === 100){
            dismiss();
          }
        },
        (error) => {
          console.log(error);
        },
        (e) => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleAdd = async (e, id) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "user"), {
        ...data,
        createdAt: new Date(),
        caption: caption,
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        avatar: auth.currentUser.photoURL,
      });
      await updateProfile(db, "user", {
        caption: caption,
      }).catch((e) => {
        console.log(e.message);
      });
      setCaption("");
    } catch (err) {
      console.log(err);
    }
  };
  const backTo = () => {
    router.push("/home/tab1");
  };
  const hideTabs = () => {
    const tabsEl = document.querySelector("ion-tab-bar");
    if (tabsEl) {
      tabsEl.hidden = true;
    }
  };
  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useIonViewWillEnter(() => hideTabs());
  return (
    <>
      <IonCard className="newpost-card" color="darkgreen">
        <IonRow className="newpost-row">
          <IonAvatar
            className="newpost-avatar"
            style={{ width: 50, height: 50 }}
          >
            <IonImg src={auth.currentUser.photoURL}></IonImg>
          </IonAvatar>

          <input
            type="file"
            id="file"
            className="form-control"
            ref={hiddenFileInput}
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <IonInput
            color="smoke"
            id="caption"
            type="text"
            value={caption}
            placeholder="Add a Caption"
            onIonChange={(e) => setCaption(e.detail.value)}
          />
          <IonIcon
            className="icon"
            size="large"
            color="smoke"
            onClick={handleClick}
            icon={cloudUpload}
          ></IonIcon>
        </IonRow>
        <IonRow className="btn-class">
          <IonButton
            className="post-btn"
            onClick={handleAdd}
            color="smoke"
            type="submit"
          >
            Post
          </IonButton>
        </IonRow>
      </IonCard>
    </>
  );
};

export default New;
