import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonRow,
  IonToolbar,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import Newpost from "./NewPost/newpost";
import "./Feed.css";
import Posts from "./post/post";
import { db } from "../../../firebase";
import { useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { UserAuth } from "../../../context/AuthContext";

const Feed = () => {
  const router = useIonRouter();
  const openProfile = () => {
    router.push("/home/profile");
  };
  const hideTabs = () => {
    const tabsEl = document.querySelector("ion-tab-bar");
    if (tabsEl) {
      tabsEl.hidden = false;
    }
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useIonViewWillEnter(() => hideTabs());
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
  const { setMyPost } = UserAuth();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { setUserPosts } = UserAuth();

  useEffect(() => {
    const getUsers = async () => {
      const postCollection = collection(db, "users");
      const q = query(postCollection, orderBy("createdAt", "asc"));
      onSnapshot(q, (querySnapshot) => {
        let posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        setUserPosts(posts);
      });
    };
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { user } = UserAuth();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="black">
          <IonRow className="search-row1">
            <IonCol className="logo">
              <IonImg
                style={{ height: 30, paddingLeft: "10px" }}
                src="assets/images/snapshare.png "
              ></IonImg>
            </IonCol>
            <IonCol className="feed-col1">
              <IonAvatar
                style={{ width: 55, height: 55 }}
                className="feed-avatar"
              >
                <IonImg
                  onClick={openProfile}
                  src={
                    user.photoURL
                      ? user.photoURL
                      : "https://newhorizonindia.edu/nhengineering/mba/wp-content/uploads/2020/01/default_image_01.png"
                  }
                ></IonImg>
              </IonAvatar>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent className="feed-content" fullscreen>
        <Newpost />

        {posts.map((currentUser) => {
          return (
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
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default Feed;
