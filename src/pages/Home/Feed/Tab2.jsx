import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonModal,
  IonPage,
  IonPopover,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonPopover,
  useIonRouter,
} from "@ionic/react";
import {
  add,
  addCircleOutline,
  addCircleSharp,
  addOutline,
  bookmark,
  chatbubble,
  checkmarkCircleOutline,
  closeCircleOutline,
  ellipsisVertical,
  heart,
  menu,
  personAddOutline,
  personOutline,
  search,
} from "ionicons/icons";
// import { userColumns, userRows } from "../../../datatablesource";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./Tab2.css";
import { storage, db, auth } from "../../../firebase";
// import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import {
  doc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import Posts from "./post/post";
import { UserAuth } from "../../../context/AuthContext";
import { updateProfile } from "firebase/auth";

const Tab2 = () => {
  const { user, userlist, setUserlist } = UserAuth();
  const router = useIonRouter();
  const openNew = () => {
    router.push("/new");
    window.location.reload();
  };
  const openProfile = () => {
    router.push("/profile");
  };
  const deleteUser = async (id) => {
    const userDoc = doc(db, "user" );
    await deleteDoc(userDoc);
    console.log("clicked");
  };
  const Popover = () => (
    <IonRow className="edit-delete">
      <IonItem color="smoke" onClick={() => {}}>
        Edit
      </IonItem>
      <IonButton
        color="smoke"
        onClick={() => {
          deleteUser(user.id);
        }}
      >
        Delete
      </IonButton>
    </IonRow>
  );

  const [present, dismiss] = useIonPopover(Popover, {
    onDismiss: (data, role) => dismiss(data, role),
  });
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
            <IonIcon
              className="icon"
              style={{ height: 27, width: 27 }}
              onClick={openNew}
              icon={addCircleOutline}
            ></IonIcon>
            <IonIcon
              className="icon"
              onClick={openProfile}
              style={{ height: 23, width: 23 }}
              icon={personOutline}
            ></IonIcon>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <Posts />
    </IonPage>
  );
};

export default Tab2;
