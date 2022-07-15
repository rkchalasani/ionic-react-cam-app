import "./profile.css";
import { useEffect, useState } from "react";
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
  // const handleInput = (e) => {
  //   const id = e.target.id;
  //   const value = e.target.value;

  //   setData({ ...data, [id]: value });
  // };
  // const updatePropic = async()=>{
  //   await updateProfile(db, "user", {
  //     ...data,

  //   }).catch((e) => {
  //     // handleAlert(e.message);
  //   });
  // }

  const handleAdd = async (e, id) => {
    e.preventDefault();
    try {
      await updateDoc(
        doc(
          db,
          "users",
          auth.currentUser.uid
          //  "posts"
        ),
        {
          photoURL: data.img,
          // createdAt: new Date(),
          // name: auth.currentUser.displayName,
          // email: auth.currentUser.email,
          // photoURL: file,
        }
      );
      await updateProfile(auth.currentUser, {
        photoURL: data.img,
      }).catch((e) => {
        console.log(e.message);
      });
      router.push("/home/tab1");
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
  return (
    <IonPage>
      <IonContent className="profile-content">
        {/* <IonGrid color="darkgreen" className="new-grid"> */}
        <IonRow className="backbtn">
          <IonIcon
            className="back-icon"
            color="smoke"
            onClick={pushHome}
            icon={arrowBackCircleOutline}
          ></IonIcon>
        </IonRow>
        {/* <Propic /> */}
        {/* {users.map((currentUser) => {
            return <IonImg className="post" src={currentUser.img}></IonImg>;
          })} */}
        <IonRow className="pro-row">
          <IonAvatar className="avatar1">
            <IonImg src={auth.currentUser.photoURL}></IonImg>
          </IonAvatar>
        </IonRow>
        <IonRow className="icon-row">
          <IonIcon className="icon" size="large" color="smoke" icon={createOutline}></IonIcon>
          <IonIcon size="large"  className="icon"color="smoke" icon={trashOutline}></IonIcon>
        </IonRow>

        {/* <IonGrid> */}

        {/* </IonGrid> */}
        {/* <IonRow className="left">
            <IonAvatar className="avatar1">
              <IonImg
                // className="img"
                // height="400px"
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://newhorizonindia.edu/nhengineering/mba/wp-content/uploads/2020/01/default_image_01.png"
                }
                alt=""
              />
            </IonAvatar>
          </IonRow> */}

        {/* </IonGrid> */}
        <IonGrid className="grid">
          <IonRow className="name-row">
            <IonLabel color="smoke">{auth.currentUser.displayName}</IonLabel>
            <IonLabel color="smoke">{auth.currentUser.email}</IonLabel>
          </IonRow>
          <IonRow>Bio:</IonRow>
          <IonRow>Bio:</IonRow>
          <form className="form" onSubmit={handleAdd}>
            <IonRow className="formInput">
              <input
                className="form-control"
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </IonRow>
            {/* <MDBBtn color="danger">Danger</MDBBtn> */}
            <IonButton className="" color="smoke" type="submit">
              Post
            </IonButton>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default New;
