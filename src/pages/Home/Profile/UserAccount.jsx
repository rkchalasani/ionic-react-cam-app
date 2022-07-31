import "./UserAccount.css";
import { useEffect, useRef, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import { auth, db, storage } from "../../../firebase";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  IonAvatar,
  IonButton,
  IonCard,
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
} from "@ionic/react";
import {
  bookmarksOutline,
  checkmarkCircleOutline,
  cloudUpload,
  heartOutline,
} from "ionicons/icons";
import { UserAuth } from "../../../context/AuthContext";

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
  const handleAdd = async (e, id, email) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        photoURL: data.img,
      });
      // if (auth.currentUser.email === email) {
      //   await updateDoc(collection(db, "posts"), {
      //     avatar: data.img,
      //   });
      // }

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
  const openLiked = () => {
    console.log("liked posts");
  };
  const openSaved = () => {
    console.log("saved posts");
  };
  const { mypost, setMyPost } = UserAuth([]);
  useEffect(() => {
    const getUsers = async () => {
      const postCollection = collection(db, "posts");
      const q = query(postCollection, orderBy("createdAt", "desc"));
      onSnapshot(q, (querySnapshot) => {
        let posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        setMyPost(posts);
      });
    };
    getUsers();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="black">
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
          <IonAvatar className="avatar-img shadow-drop-2-center">
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
          </IonRow>
        </IonRow>

        <IonRow className="name-col">
          <IonLabel color="smoke">{auth.currentUser.email}</IonLabel>
          <IonLabel color="smoke">
            {/* {usersData.follow?.length} Followers */}
          </IonLabel>
        </IonRow>
        <IonCard color="black">
          <IonRow style={{ padding: "4%", fontSize: "20px" }}>
            <IonLabel color="smoke">My Posts</IonLabel>
          </IonRow>

          <IonRow className="email-row1">
            {mypost.map((currentUser) => {
              return (
                <>
                  {auth.currentUser.email === currentUser.email ? (
                    <>
                      {currentUser.img ? (
                        <IonAvatar
                          style={{ width: "29vw", height: "15vh" }}
                          className="my-posts-avatar"
                        >
                          <IonImg src={currentUser.img}></IonImg>
                        </IonAvatar>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              );
            })}
          </IonRow>
        </IonCard>
        <IonGrid className="grid">
          <IonRow onClick={openLiked} className="likedposts-row">
            <IonIcon color="light" icon={heartOutline}></IonIcon>
            <IonLabel color="smoke">Liked Posts</IonLabel>
          </IonRow>
          <IonRow onClick={openSaved} className="savedposts-row">
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
