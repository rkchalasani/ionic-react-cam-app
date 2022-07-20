import {
  IonAvatar,
  IonCol,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonRow,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import Newpost from "./NewPost/newpost";
import "./Feed.css";
import Posts from "./post/post";
import { useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "../../../firebase";

const Feed = () => {
  const openProfile = () => {
    // router.push("/profile");
    console.log("wait");
  };
  const hideTabs = () => {
    const tabsEl = document.querySelector("ion-tab-bar");
    if (tabsEl) {
      tabsEl.hidden = false;
    }
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useIonViewWillEnter(() => hideTabs());
  useEffect(() => {
    const getUsers = async () => {
      const postCollection = collection(db, "user");
      const q = query(postCollection, orderBy("createdAt", "desc"));
      onSnapshot(q, (querySnapshot) => {
        let posts = [];
        querySnapshot.forEach((doc) => {
          posts.push(doc.data());
        });
      });
    };
    getUsers();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="darkgreen">
          <IonRow className="search-row1">
            <IonCol className="col2">
              <IonImg
                style={{ height: 53 }}
                src="assets/images/Chatify-logo.png "
              ></IonImg>
            </IonCol>
            <IonCol className="feed-col1">
              <IonAvatar className="img-avatar">
                <IonImg
                  style={{ width: 40, height: 40 }}
                  onClick={openProfile}
                  src={
                    auth.currentUser.photoURL
                      ? auth.currentUser.photoURL
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
        <Posts />
      </IonContent>
    </IonPage>
  );
};

export default Feed;
