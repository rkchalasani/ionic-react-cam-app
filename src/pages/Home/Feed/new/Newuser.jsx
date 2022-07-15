import "./new.css";
import { useEffect, useState } from "react";
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
  IonBackButton,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import { MDBInput } from "mdbreact";
import { arrowBack, arrowBackCircle, backspace } from "ionicons/icons";
// import { timeStamp } from "console";
// import MDBFileupload from 'mdb-react-fileupload';

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
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };
  const backTo = () => {
    router.push("/home/tab1");
  };
  return (
    <IonPage>
      <IonContent className="new-content">
        <IonGrid className="new-grid1">
          <IonRow className="newpost-row">
            <IonCol className="newpost-row">
              <IonIcon
                className="back-icon"
                color="smoke"
                // size="small"
                // routerLink="/home/tab1"
                onClick={backTo}
                icon={arrowBack}
              ></IonIcon>
            </IonCol>

            <IonButton
              className="post-btn"
              onClick={handleAdd}
              color="smoke"
              type="submit"
            >
              Post
            </IonButton>
          </IonRow>

          <IonRow className="top">
            <IonCol>
              <IonLabel className="title" color="smoke">
                New post
              </IonLabel>
            </IonCol>
          </IonRow>
          <IonRow className="left">
            <IonImg
              className="img"
              // height="400px"
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://newhorizonindia.edu/nhengineering/mba/wp-content/uploads/2020/01/default_image_01.png"
              }
              alt=""
            />
          </IonRow>
          <IonRow className="formInput">
            <input
              type="file"
              id="file"
              className="form-control"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </IonRow>
          <IonRow className="formInput dynamic">
            <input
              id="caption"
              type="type"
              placeholder="Add a Caption"
              onChange={handleInput}
              className="form-control caption-input"
            />
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default New;
