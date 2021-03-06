import "./newpost.css";
import { useEffect, useRef, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db, storage } from "../../../../firebase";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonIcon,
  IonImg,
  IonInput,
  IonRow,
  useIonLoading,
  useIonViewWillEnter,
} from "@ionic/react";
import { cloudUpload } from "ionicons/icons";
const NewPost = () => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
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
        (e) => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
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

export default NewPost;
