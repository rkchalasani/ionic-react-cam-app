import {
  IonCol,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import {
  addCircleOutline,
  personOutline,
  search,
} from "ionicons/icons";
import "./Tab2.css";
import Posts from "./post/post";
import { UserAuth } from "../../../context/AuthContext";

const Tab2 = () => {
  const router = useIonRouter();
  const openNew = () => {
    router.push("/new");
  };
  const openProfile = () => {
    router.push("/profile");
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
