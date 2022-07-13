import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import {
  addCircleSharp,
  colorFill,
  help,
  notifications,
  person,
  thermometer,
} from "ionicons/icons";
import { UserAuth } from "../../../context/AuthContext";
import "./Tab3.css";

const Tab3 = () => {
  const { logout } = UserAuth();
  const router = useIonRouter();
  const [present] = useIonToast();
  async function handleButtonClick(m) {
    present({
      message: m,
      duration: 2000,
      position: "top",
      color: "darkgreen",
      mode: "ios",
      icon: alert,
    });
  }
  const [show, dismiss] = useIonLoading();
  async function handleLoading(message) {}
  const handleLogout = () => {
    try {
      show({
        message: "logging out..",
        duration: 1000,
        spinner: "circular",
        mode: "ios",
      });
      logout();
      setTimeout(() => {
        handleButtonClick("Logout Successfull");
      }, 1200);
      router.push("/login");
      // window.location.reload();
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <IonPage>
      <IonContent className="settings-content" fullscreen>
        <IonRow className="search-row">
          <IonCol>
            {" "}
            <IonLabel color="smoke">Settings</IonLabel>
          </IonCol>
        </IonRow>
        <IonGrid className="settings-grid">
          <IonRow className="settings-row1">
            <IonIcon color="light" icon={person}></IonIcon>
            <IonLabel color="smoke">Account</IonLabel>
          </IonRow>
          <IonRow className="settings-row1">
            <IonIcon color="light" icon={notifications}></IonIcon>
            <IonLabel color="smoke">Notification</IonLabel>
          </IonRow>
          <IonRow className="settings-row1">
            <IonIcon color="light" icon={colorFill}></IonIcon>
            <IonLabel color="smoke">Theme</IonLabel>
          </IonRow>
          <IonRow className="settings-row1">
            <IonIcon color="light" icon={help}></IonIcon>
            <IonLabel color="smoke">Help</IonLabel>
          </IonRow>
          <IonRow className="settings-row1">
            <IonIcon color="light" icon={person}></IonIcon>
            <IonLabel color="smoke">Account</IonLabel>
          </IonRow>
          <IonRow className="settings-row1">
            <IonIcon color="light" icon={person}></IonIcon>
            <IonLabel color="smoke">Account</IonLabel>
          </IonRow>
          <IonRow className="settings-row1">
            <IonIcon color="light" icon={person}></IonIcon>
            <IonLabel color="smoke">Account</IonLabel>
          </IonRow>
          <IonRow className="settings-row1">
            <IonIcon color="light" icon={person}></IonIcon>
            <IonLabel color="smoke">Account</IonLabel>
          </IonRow>
          <IonRow className="settings-row1">
            <IonButton
              className="logout-btn"
              color="smoke"
              onClick={handleLogout}
            >
              Logout
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
