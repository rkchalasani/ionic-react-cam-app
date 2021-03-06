import "./UserAccount.css";
import { useEffect, useRef, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../../firebase";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  IonAvatar,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  IonToolbar,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import { checkmarkCircle, cloudUpload, trashOutline } from "ionicons/icons";

const Profilepage = () => {
  const [file, setFile] = useState("");
  const [show, dismiss] = useIonLoading();
  const handleLoad = (m) => {
    show({
      message: m,
      duration: 2000,
      spinner: "lines-sharp",
      mode: "ios",
    });
  };
  const [data, setData] = useState({});
  const router = useIonRouter();
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      console.log(name);
      handleLoad("uploading..");
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
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
          if (progress === 100) {
            dismiss();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  return (
    <IonPage>
      <IonHeader color="darkgreen">
        <IonToolbar color="darkgreen"></IonToolbar>
      </IonHeader>
      <IonContent className="profile-content">
        <IonRow className="backbtn">
          <IonIcon
            className="icon"
            size="large"
            color="smoke"
            onClick={handleClick}
            icon={cloudUpload}
          ></IonIcon>
          <IonIcon
            className="icon"
            color="smoke"
            style={{ width: 35, height: 35 }}
            icon={checkmarkCircle}
            onClick={handleAdd}
          ></IonIcon>
          <IonIcon
            size="large"
            className="icon"
            color="smoke"
            icon={trashOutline}
          ></IonIcon>
        </IonRow>
        <IonRow className="pro-row">
          <IonAvatar className="avatar-img">
            <IonImg
              src={
                auth.currentUser.photoURL
                  ? auth.currentUser.photoURL
                  : "https://newhorizonindia.edu/nhengineering/mba/wp-content/uploads/2020/01/default_image_01.png"
              }
            ></IonImg>
          </IonAvatar>
        </IonRow>
        <IonRow className="icon-row"> </IonRow>
        <IonRow className="name-col">
          <IonLabel color="smoke">{auth.currentUser.email}</IonLabel>
          <IonLabel className="font" color="smoke">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            quasi quae nihil ad, est excepturi ipsam! Voluptatum a obcaecati
            laboriosam, similique quae incidunt culpa. Esse unde aliquam
            blanditiis in suscipit.
          </IonLabel>
        </IonRow>

        <IonGrid className="grid">
          <IonRow className="email-row1">
            <IonLabel color="smoke">Username</IonLabel>
            <IonLabel color="smoke">{auth.currentUser.email}</IonLabel>
          </IonRow>
          <IonRow className="email-row">
            <IonLabel color="smoke">Phone</IonLabel>
            <IonLabel color="smoke">{auth.currentUser.email}</IonLabel>
          </IonRow>
          <IonRow className="email-row">
            <IonLabel color="smoke">Company</IonLabel>
            <IonLabel color="smoke">{auth.currentUser.email}</IonLabel>
          </IonRow>
          <IonRow className="email-row">
            <IonLabel color="smoke">Title</IonLabel>
            <IonLabel color="smoke">{auth.currentUser.email}</IonLabel>
          </IonRow>
          <IonRow className="email-row">
            <IonLabel color="smoke">Website</IonLabel>
            <IonLabel color="smoke">{auth.currentUser.email}</IonLabel>
          </IonRow>
          <IonRow className="email-row">
            <IonLabel color="smoke">About you</IonLabel>
            <IonLabel color="smoke">{auth.currentUser.email}</IonLabel>
          </IonRow>
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
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profilepage;
