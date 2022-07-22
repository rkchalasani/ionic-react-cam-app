import "./UserAccount.css";
import { useEffect, useRef, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../../firebase";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  IonAvatar,
  IonButton,
  IonCol,
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
import {
  bookmark,
  bookmarkOutline,
  bookmarksOutline,
  checkmarkCircleOutline,
  cloudUpload,
  heart,
  heartOutline,
  search,
} from "ionicons/icons";

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
      setFile("");
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

      <IonHeader>
        <IonToolbar color="darkgreen">
          <IonRow className="search-row">
            <IonCol className="friends-col">
              <IonLabel className="frnds" color="smoke">
                My Profile
              </IonLabel>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent className="profile-content">
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
          <IonRow className="backbtn">
            {file ? (
              <>
                <IonButton onClick={handleClick} fill="clear">
                  <IonIcon
                    className="icon"
                    size="large"
                    color="smoke"
                    icon={cloudUpload}
                  ></IonIcon>
                </IonButton>
                <IonButton onClick={handleAdd} fill="clear">
                  <IonIcon
                    className="icon"
                    color="smoke"
                    style={{ width: 35, height: 35 }}
                    icon={checkmarkCircleOutline}
                  ></IonIcon>
                </IonButton>
              </>
            ) : (
              <IonButton onClick={handleClick} fill="clear">
                <IonIcon
                  className="icon"
                  size="large"
                  color="smoke"
                  icon={cloudUpload}
                ></IonIcon>
                <IonLabel color="smoke ion-text-capitalize">
                  new picture
                </IonLabel>
              </IonButton>
            )}

            {/* <IonIcon
            size="large"
            className="icon"
            color="smoke"
            icon={trashOutline}
          ></IonIcon> */}
          </IonRow>
        </IonRow>

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
            <IonLabel color="smoke">Phone</IonLabel>
            <IonLabel color="smoke">{auth.currentUser.email}</IonLabel>
          </IonRow>
          <IonRow className="likedposts-row">
            <IonIcon color="light" icon={heartOutline}></IonIcon>
            <IonLabel color="smoke">Liked Posts</IonLabel>
          </IonRow>
          <IonRow className="savedposts-row">
            <IonIcon color="light" icon={bookmarksOutline}></IonIcon>
            <IonLabel color="smoke">Saved Posts</IonLabel>
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
