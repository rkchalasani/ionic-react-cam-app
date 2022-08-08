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
  IonSegment,
  IonSegmentButton,
  IonToolbar,
  useIonLoading,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  checkmarkCircleOutline,
  cloudUpload,
  gridOutline,
  imageOutline,
} from "ionicons/icons";
import { UserAuth } from "../../../context/AuthContext";
import Posts from "../Feed/post/post";

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
  }, [setMyPost]);
  const { posts, setPosts } = UserAuth();
  useEffect(() => {
    const getUsers = async () => {
      const postCollection = collection(db, "posts");
      const q = query(postCollection, orderBy("createdAt", "desc"));
      onSnapshot(q, (querySnapshot) => {
        let posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        setPosts(posts);
      });
    };
    getUsers();
  }, [setPosts]);
  const [isPost, setIsPost] = useState(true);
  const postsGrid = () => {
    setIsPost(true);
  };
  const allPosts = () => {
    setIsPost(false);
  };
  const [setUsername] = useState();
  const [setPhoneNum] = useState();
  const [setBio] = useState();
  const [profile, setProfile] = useState();
  useEffect(() => {
    const getUsers = async () => {
      const docRef = doc(db, "users", auth.currentUser.uid);
      onSnapshot(docRef, (docSnap) => {
        setUsername(docSnap.data().name);
        setPhoneNum(docSnap.data().phone);
        setBio(docSnap.data().bio);
        setProfile(docSnap.data());
      });
    };
    getUsers();
  }, [setBio, setPhoneNum, setUsername]);
  const hideTabs = () => {
    const tabsEl = document.querySelector("ion-tab-bar");
    if (tabsEl) {
      tabsEl.hidden = false;
    }
  };
  useIonViewWillEnter(() => hideTabs());
  const { user } = UserAuth();

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
        <IonGrid>
          <IonRow
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IonAvatar className="profile-profilepic shadow-drop-2-center">
              <IonImg
                src={
                  user.photoURL
                    ? user.photoURL
                    : "https://newhorizonindia.edu/nhengineering/mba/wp-content/uploads/2020/01/default_image_01.png"
                }
              ></IonImg>
            </IonAvatar>
          </IonRow>
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
                  new profile picture
                </IonLabel>
              </IonButton>
            )}
          </IonRow>

          {/* {profile && (
            <IonRow style={{ padding: "4% 0% 0 4%", fontSize: "15px" }}>
              <IonLabel color="smoke">
                {profile.follow?.length} Followers
              </IonLabel>
            </IonRow>
          )} */}
          <IonRow
            style={{ marginTop: "2%", background: "#191917", padding: " 2%" }}
          >
            <IonRow
              style={{
                alignItems: "center",
                width: "100%",
                paddingBottom: "20px",
                paddingTop: "5px",
              }}
              className="settings-profile-details"
            >
              <IonLabel
                color="smoke"
                style={{ fontSize: "20px", paddingBottom: "4px" }}
              >
                {user.displayName}
                {/* {profile.name} */}
              </IonLabel>
              <IonLabel color="smoke" style={{ fontSize: "20px" }}>
                {user.email}
              </IonLabel>
            </IonRow>
            <IonCol className="profile-col">
              <IonRow>
                <IonLabel color="smoke">{posts?.length}</IonLabel>
              </IonRow>
              <IonRow>
                <IonLabel color="smoke">Posts</IonLabel>
              </IonRow>
            </IonCol>
            <IonCol className="profile-col">
              {" "}
              {profile && (
                <IonRow>
                  <IonLabel color="smoke">{profile.follow?.length}</IonLabel>
                </IonRow>
              )}
              <IonRow>
                <IonLabel color="smoke">Followers</IonLabel>
              </IonRow>
            </IonCol>

            <IonCol className="profile-col">
              {" "}
              <IonRow>
                <IonLabel color="smoke">0</IonLabel>
              </IonRow>
              <IonRow>
                <IonLabel color="smoke">Following</IonLabel>
              </IonRow>
            </IonCol>
            {profile && (
              <IonRow style={{ padding: "4% 4%", fontSize: "15px" }}>
                <IonLabel color="smoke">{profile.bio}</IonLabel>
              </IonRow>
            )}
          </IonRow>
        </IonGrid>
        <IonCard style={{ margin: "0px" }} color="black">
          <IonRow>
            <IonSegment>
              <IonSegmentButton onClick={postsGrid} value="friends">
                <IonIcon color="smoke" icon={gridOutline}></IonIcon>
              </IonSegmentButton>
              <IonSegmentButton
                color="smoke"
                onClick={allPosts}
                value="enemies"
              >
                <IonIcon color="smoke" icon={imageOutline}></IonIcon>
              </IonSegmentButton>
            </IonSegment>
          </IonRow>
          {isPost ? (
            <IonRow className="email-row1">
              {mypost.map((currentUser) => {
                return (
                  <>
                    {user.email === currentUser.email ? (
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
          ) : (
            <IonRow>
              {posts.map((currentUser) => {
                return (
                  <>
                    {auth.currentUser.email === currentUser.email ? (
                      <Posts
                        key={currentUser.id}
                        uid={currentUser.uid}
                        id={currentUser.id}
                        avatar={currentUser.avatar}
                        name={currentUser.name}
                        email={currentUser.email}
                        img={currentUser.img}
                        caption={currentUser.caption}
                        createdAt={currentUser.createdAt}
                        likes={currentUser.likes}
                      />
                    ) : (
                      <></>
                    )}
                  </>
                );
              })}
            </IonRow>
          )}
        </IonCard>
        {/* <IonGrid className="grid"> */}
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
        {/* </IonGrid> */}
      </IonContent>
    </IonPage>
  );
};

export default Profilepage;
