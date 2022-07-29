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
  IonCol,
  IonIcon,
  IonImg,
  IonInput,
  IonLabel,
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
      await addDoc(collection(db, "posts"), {
        ...data,
        createdAt: new Date(),
        caption: caption,
        name: auth.currentUser.displayName,
        uid:auth.currentUser.uid,
        email: auth.currentUser.email,
        avatar: auth.currentUser.photoURL,
        likes: [],
      });
      await updateProfile(db, "posts", {
        caption: caption,
      }).catch((e) => {
        console.log(e.message);
      });
      setCaption("");
      setFile("");
      setData("");
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
      <IonCard className="newpost-card" color="black">
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
        </IonRow>
        <IonRow className="btn-class">
          <IonCol>
            <IonButton
              className="post-btn"
              onClick={handleAdd}
              color="smoke"
              type="submit"
            >
              Post
            </IonButton>
          </IonCol>
          <IonButton
            className="ion-text-capitalize"
            onClick={handleClick}
            fill="clear"
          >
            <IonIcon
              style={{ width: 25, height: 25, paddingRight: "7px" }}
              size="large"
              color="smoke"
              icon={cloudUpload}
            ></IonIcon>
            <IonLabel color="smoke">New Post</IonLabel>
          </IonButton>
        </IonRow>
        {file.name ? (
          <IonRow style={{ display: "flex", justifyContent: "center" }}>
            <IonLabel className="file-name">{file.name} </IonLabel>
          </IonRow>
        ) : (
          <></>
        )}
      </IonCard>
    </>
  );
};

export default NewPost;
