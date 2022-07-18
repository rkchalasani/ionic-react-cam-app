import {
  IonActionSheet,
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  addCircleOutline,
  arrowBack,
  attach,
  attachOutline,
  caretForwardCircle,
  chevronForwardOutline,
  clipboard,
  clipboardOutline,
  closeCircle,
  duplicate,
  duplicateOutline,
  heart,
  personOutline,
  search,
  share,
  trash,
} from "ionicons/icons";
import Newuser from './new/Newuser'
import "./Feed.css";
// import Propic from "./propic/propic";
import Posts from "./post/post";
import { UserAuth } from "../../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db, storage } from "../../../firebase";
import Tweet from "./tweet/tweet";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Tab2 = () => {
  // const openNew = () => {
  //   // router.push("/new");
  //   // window.location.reload();
  // };
  const openProfile = () => {
    router.push("/profile");
    // window.location.reload();
  };
  const hideTabs = () => {
    const tabsEl = document.querySelector("ion-tab-bar");
    if (tabsEl) {
      tabsEl.hidden = false;
    }
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useIonViewWillEnter(() => hideTabs());
  const router = useIonRouter();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="darkgreen">
          <IonRow className="search-row1">
            <IonCol className="col2">
              <IonImg
                style={{ height: 53 }}
                src="assets/images/Group 22.png "
              ></IonImg>
            </IonCol>
            <IonCol className="feed-col1">
              {/* <IonIcon
                color="smoke"
                onClick={openNew}
                // onClick={() => setShowActionSheet(true)}
                expand="block"
                className="new-icon"
                icon={duplicateOutline}
              ></IonIcon> */}
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
        <Newuser/>
        {/* */}
        <Posts />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
