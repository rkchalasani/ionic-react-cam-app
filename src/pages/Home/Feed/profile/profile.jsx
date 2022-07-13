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
} from "@ionic/react";
import Propic from "../propic/propic";
import { arrowBackCircle, backspace, ellipsisVertical } from "ionicons/icons";
import { UserAuth } from "../../../../context/AuthContext";

const New = ({ inputs, email, title }) => {
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
      await addDoc(collection(db, "profile", auth.currentUser.uid, "posts"), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      router.push("/home/tab1");
    } catch (err) {
      console.log(err);
    }
  };
  const { user } = UserAuth();

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(
    db,
    "profile",
    auth.currentUser.uid,
    "posts"
  );
  // const deleteUser = async (id) => {
  //   const userDoc = doc(db, "myuser",auth.currentUser.uid);
  //   await deleteDoc(userDoc);
  //   console.log("clicked");
  // };

  // const [data, setData] = useState([]);
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

  const [ dismiss] = useIonPopover(Popover, {
    onDismiss: (data, role) => dismiss(data, role),
  });
  const [roleMsg, setRoleMsg] = useState("");
  return (
    <IonPage>
      <IonContent className="new-content">
        <IonGrid className="new-grid">
          <IonRow className="top">
            <IonCol>
              <IonLabel className="title" color="smoke">
                {user.displayName}
              </IonLabel>

            </IonCol>
            <IonButton
              color="transparent"
              className="back-btn"
              routerLink="/home/tab1"
            >
              <IonIcon
                className="back-icon"
                color="smoke"
                icon={arrowBackCircle}
              ></IonIcon>
            </IonButton>
          </IonRow>
          <Propic/>
         
          <IonRow className="left">
            <IonImg
              className="img"
              height="400px"
              src={
                file
                ? URL.createObjectURL(file)
                : "https://newhorizonindia.edu/nhengineering/mba/wp-content/uploads/2020/01/default_image_01.png"
              }
              alt=""
            />
          </IonRow>
          <form className="form" onSubmit={handleAdd}>
            <IonRow className="formInput">
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </IonRow>
            <IonButton color="smoke" type="submit">
              Post
            </IonButton>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default New;