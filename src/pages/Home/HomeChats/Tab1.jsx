import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { search, searchCircle } from "ionicons/icons";
import { UserAuth } from "../../../context/AuthContext";
import "./Tab1.css";
const Tab1 = () => {
  const router = useIonRouter();
  const openChat = () => {
    router.push("/chats");
  };

  return (
    <IonPage>
      <IonContent className="tab1mainpage" fullscreen>
        <IonRow className="search-row">
          <IonCol>
            {" "}
            <IonLabel color="smoke">Chats</IonLabel>
          </IonCol>
          <IonIcon icon={search}></IonIcon>
        </IonRow>
        <IonGrid className="tab1-grid">
          <IonRow onClick={openChat} className="danni-row">
            <IonImg className="danni-img" src="assets/images/pro7.jpg"></IonImg>
            <IonCol className="col1">
              <IonLabel color="smoke" className="danni-label">
                Danni Hopkins
              </IonLabel>
              <IonLabel color="smoke" className="danni-label">
                Hey how r u?
              </IonLabel>
            </IonCol>
            <IonLabel color="smoke" className="danni-label">
              08:45
            </IonLabel>
          </IonRow>
          <IonRow className="danni-row">
            <IonImg className="danni-img" src="assets/images/pro1.jpg"></IonImg>
            <IonCol className="col1">
              <IonLabel color="smoke" className="danni-label">
                Danni Hopkins
              </IonLabel>
              <IonLabel color="smoke" className="danni-label">
                Hey how r u?
              </IonLabel>
            </IonCol>
            <IonLabel  color="smoke" className="danni-label">
              08:45
            </IonLabel>
          </IonRow>
          <IonRow className="danni-row">
            <IonImg className="danni-img" src="assets/images/pro2.jpg"></IonImg>
            <IonCol className="col1">
              <IonLabel color="smoke" className="danni-label">
                Danni Hopkins
              </IonLabel>
              <IonLabel color="smoke" className="danni-label">
                Hey how r u?
              </IonLabel>
            </IonCol>
            <IonLabel color="smoke" className="danni-label">
              08:45
            </IonLabel>
          </IonRow>
          <IonRow className="danni-row">
            <IonImg className="danni-img" src="assets/images/pro2.jpg"></IonImg>
            <IonCol className="col1">
              <IonLabel color="smoke" className="danni-label">
                Danni Hopkins
              </IonLabel>
              <IonLabel color="smoke" className="danni-label">
                Hey how r u?
              </IonLabel>
            </IonCol>
            <IonLabel color="smoke" className="danni-label">
              08:45
            </IonLabel>
          </IonRow>
          <IonRow className="danni-row">
            <IonImg className="danni-img" src="assets/images/pro2.jpg"></IonImg>
            <IonCol className="col1">
              <IonLabel color="smoke" className="danni-label">
                Danni Hopkins
              </IonLabel>
              <IonLabel color="smoke" className="danni-label">
                Hey how r u?
              </IonLabel>
            </IonCol>
            <IonLabel color="smoke" className="danni-label">
              08:45
            </IonLabel>
          </IonRow>
          <IonRow className="danni-row">
            <IonImg className="danni-img" src="assets/images/pro2.jpg"></IonImg>
            <IonCol className="col1">
              <IonLabel color="smoke" className="danni-label">
                Danni Hopkins
              </IonLabel>
              <IonLabel color="smoke" className="danni-label">
                Hey how r u?
              </IonLabel>
            </IonCol>
            <IonLabel color="smoke" className="danni-label">
              08:45
            </IonLabel>
          </IonRow>
          <IonRow className="danni-row">
            <IonImg className="danni-img" src="assets/images/pro2.jpg"></IonImg>
            <IonCol className="col1">
              <IonLabel color="smoke" className="danni-label">
                Danni Hopkins
              </IonLabel>
              <IonLabel color="smoke" className="danni-label">
                Hey how r u?
              </IonLabel>
            </IonCol>
            <IonLabel color="smoke" className="danni-label">
              08:45
            </IonLabel>
          </IonRow>
          <IonRow className="danni-row">
            <IonImg className="danni-img" src="assets/images/pro2.jpg"></IonImg>
            <IonCol className="col1">
              <IonLabel color="smoke" className="danni-label">
                Danni Hopkins
              </IonLabel>
              <IonLabel color="smoke" className="danni-label">
                Hey how r u?
              </IonLabel>
            </IonCol>
            <IonLabel color="smoke" className="danni-label">
              08:45
            </IonLabel>
          </IonRow>
          <IonRow className="danni-row">
            <IonImg className="danni-img" src="assets/images/pro2.jpg"></IonImg>
            <IonCol className="col1">
              <IonLabel color="smoke" className="danni-label">
                Danni Hopkins
              </IonLabel>
              <IonLabel color="smoke" className="danni-label">
                Hey how r u?
              </IonLabel>
            </IonCol>
            <IonLabel color="smoke" className="danni-label">
              08:45
            </IonLabel>
          </IonRow>
          <IonRow className="danni-row">
            <IonImg className="danni-img" src="assets/images/pro2.jpg"></IonImg>
            <IonCol className="col1">
              <IonLabel color="smoke" className="danni-label">
                Danni Hopkins
              </IonLabel>
              <IonLabel color="smoke" className="danni-label">
                Hey how r u?
              </IonLabel>
            </IonCol>
            <IonLabel color="smoke" className="danni-label">
              08:45
            </IonLabel>
          </IonRow>
          <IonRow className="danni-row">
            <IonImg className="danni-img" src="assets/images/pro2.jpg"></IonImg>
            <IonCol className="col1">
              <IonLabel color="smoke" className="danni-label">
                Danni Hopkins
              </IonLabel>
              <IonLabel color="smoke" className="danni-label">
                Hey how r u?
              </IonLabel>
            </IonCol>
            <IonLabel color="smoke" className="danni-label">
              08:45
            </IonLabel>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
