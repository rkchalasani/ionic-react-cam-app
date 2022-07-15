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
            <IonCol className="col4">
              <IonAvatar className="img-row">
                {/* <Propic /> */}

                <IonAvatar className="img-avatar">
                  {/* <Propic /> */}
                  <IonImg
                    onClick={openProfile}
                    // style={{ height: 23, width: 23 }}
                    className=""
                    src={auth.currentUser.photoURL}
                  ></IonImg>
                </IonAvatar>
              </IonAvatar>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>

      <IonContent className="feed-content" fullscreen>
        <IonRow className="btn-row">
          <IonButton
            onClick={openNew}
            color="darkgreen"
            className="button-new "
          >
            <IonIcon
              color="smoke"
              style={{ width: 30, height: 30 }}
              icon={duplicateOutline}
            ></IonIcon>
            <IonLabel color="smoke" className="new-post7">
              New Post
            </IonLabel>
            {/* </IonCol> */}
          </IonButton>
        </IonRow>

        <Posts />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
