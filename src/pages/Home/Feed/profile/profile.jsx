import "./profile.css";
import { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth, db, storage } from "../../../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
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
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  useIonPopover,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import Propic from "../propic/propic";
import {
  arrowBackCircle,
  arrowBackCircleOutline,
  backspace,
  cloudUpload,
  createOutline,
  ellipsisVertical,
  trashBin,
  trashOutline,
} from "ionicons/icons";
import { UserAuth } from "../../../../context/AuthContext";
import { MDBBtn } from "mdbreact";
const New = ({ inputs, email, title }) => {
  const { user } = UserAuth();
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const router = useIonRouter();
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
            setData(() => ({ img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);
  const handleAdd = async (e, id) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        photoURL: data.img,
      });
      await updateProfile(auth.currentUser, {
        photoURL: data.img,
      }).catch((e) => {
        console.log(e.message);
      });
      router.push("/home");
    } catch (err) {
      console.log(err);
    }
  };
  const pushHome = () => {
    router.push("/home/tab1");
  };

  const hideTabs = () => {
    const tabsEl = document.querySelector("ion-tab-bar");

    if (tabsEl) {
      tabsEl.hidden = true;
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useIonViewWillEnter(() => hideTabs());

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", auth.currentUser.uid);
    await deleteDoc(userDoc);
    router.push("/home");
    console.log("clicked");
  };
  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  return (
    <IonPage>
      <IonContent className="profile-content">
        <IonRow className="backbtn">
          <IonCol>
            <IonIcon
              className="back-icon"
              color="smoke"
              onClick={pushHome}
              icon={arrowBackCircleOutline}
            ></IonIcon>
          </IonCol>

          <IonButton
            onClick={handleAdd}
            className=""
            color="smoke"
            type="submit"
          >
            Post
          </IonButton>
        </IonRow>

        <IonRow className="pro-row">
          <IonAvatar className="avatar1">
            <IonImg
              src={
                auth.currentUser.photoURL
                  ? auth.currentUser.photoURL
                  : "https://newhorizonindia.edu/nhengineering/mba/wp-content/uploads/2020/01/default_image_01.png"
              }
            ></IonImg>
          </IonAvatar>
        </IonRow>
        <IonRow className="icon-row">
          {"https://newhorizonindia.edu/nhengineering/mba/wp-content/uploads/2020/01/default_image_01.png" ? (
            <IonIcon
              className="icon"
              size="large"
              color="smoke"
              onClick={handleClick}
              icon={createOutline}
            ></IonIcon>
          ) : (
            <IonIcon onClick={handleClick} icon={cloudUpload}></IonIcon>
          )}
          <IonIcon
            size="large"
            className="icon"
            color="smoke"
            icon={trashOutline}
          ></IonIcon>
          {/* </IonButton> */}
        </IonRow>
        <IonGrid className="grid">
          <IonRow className="name-row">
            <IonLabel color="smoke">..Bio..</IonLabel>
          </IonRow>
          <IonRow className="email-row">
            <IonLabel color="smoke">Email</IonLabel>  
            <IonLabel color="smoke">{auth.currentUser.email}</IonLabel>
          </IonRow>
          <IonRow className="email-row">
            <IonLabel color="smoke">Username</IonLabel>  
            <IonLabel color="smoke">{auth.currentUser.email}</IonLabel>
          </IonRow>
          <IonRow className="email-row">
            <IonLabel color="smoke">Company</IonLabel>  
            <IonLabel color="smoke">{auth.currentUser.email}</IonLabel>
          </IonRow>
          <IonRow className="email-row">
            <IonLabel color="smoke">Phone</IonLabel>  
            <IonLabel color="smoke">{auth.currentUser.email}</IonLabel>
          </IonRow>
          <IonRow className="email-row">
            <IonLabel color="smoke">Email</IonLabel>  
            <IonLabel color="smoke">{auth.currentUser.email}</IonLabel>
          </IonRow>
          {/* <IonRow>Bio:</IonRow>
          <IonRow>Bio:</IonRow> */}
          {/* <form className="form" onSubmit={}> */}
          <IonRow className="formInput">
            <input
              className="form-control"
              type="file"
              id="file"
              ref={hiddenFileInput}
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </IonRow>

          {/* </form> */}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default New;
