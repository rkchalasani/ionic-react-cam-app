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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
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
import { arrowBackCircle, backspace } from "ionicons/icons";

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
      await addDoc(collection(db, "feed"), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      router.push("/home/tab1");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <IonPage>
      <IonContent className="new-content">
        <IonGrid className="new-grid1">
          <IonRow className="top">
            <IonCol>
              <IonLabel className="title" color="smoke">
                {title}
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

            {inputs.map((input) => (
              <IonRow className="formInput dynamic" key={input.id}>
                <IonLabel color="smoke">{input.label}</IonLabel>
                <input
                  id={input.id}
                  type={input.type}
                  placeholder={input.placeholder}
                  onChange={handleInput}
                  className="form-control"
                />
              </IonRow>
            ))}
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
