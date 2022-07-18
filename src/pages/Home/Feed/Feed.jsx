import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonToolbar,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  addCircleOutline,
  attach,
  chevronForwardOutline,
  duplicate,
  duplicateOutline,
  personOutline,
  search,
} from "ionicons/icons";
import "./Feed.css";
import Propic from "./propic/propic";
import Posts from "./post/post";
import { UserAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import Tweet from "./tweet/tweet";

const Tab2 = () => {
  const router = useIonRouter();
  const openNew = () => {
    router.push("/new");
    window.location.reload();
  };
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
              {/* <IonRow className="btn-row"> */}
                {/* <IonButton
                  
                  color="darkgreen"
                  // className="button-new "
                > */}
                <IonIcon
                  color="smoke"
                  onClick={openNew}
                  className="new-icon"
                  // routerLink="/new"
                  icon={duplicateOutline}
                ></IonIcon>
                {/* </IonCol> */}
                {/* </IonButton> */}
                {/* <IonAvatar className="img-row"> */}
                <IonAvatar className="img-avatar">
                  <IonImg
                    style={{ width: 40, height: 40 }}
                    // className=""
                    onClick={openProfile}
                    src={
                      auth.currentUser.photoURL
                        ? auth.currentUser.photoURL
                        : "https://newhorizonindia.edu/nhengineering/mba/wp-content/uploads/2020/01/default_image_01.png"
                    }
                    // src={auth.currentUser.photoURL}
                  ></IonImg>
                </IonAvatar>
                {/* </IonAvatar> */}
              {/* </IonRow> */}
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>

      <IonContent className="feed-content" fullscreen>
        <Posts />
        <Tweet/>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
