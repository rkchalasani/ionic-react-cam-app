import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  useIonLoading,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { colorFill, help, notifications, person, search } from "ionicons/icons";
import { UserAuth } from "../../../context/AuthContext";
import { auth } from "../../../firebase";
import "./settings.css";

const Settings = () => {
  const { logout } = UserAuth();
  const router = useIonRouter();
  const [present] = useIonToast();
  const [show] = useIonLoading();
  async function handleLoading(message) {
    show({
      message: message,
      duration: 1500,
      spinner: "circular",
      mode: "ios",
    });
  }
  async function handleButtonClick(m) {
    present({
      message: m,
      duration: 2000,
      position: "top",
      color: "smoke",
      mode: "ios",
      icon: alert,
    });
  }
  const handleLogout = () => {
    try {
      handleLoading("Logging Out..");
      logout();
      setTimeout(() => {
        handleButtonClick("Logout Successfull");
      }, 2000);
      router.push("/login");
      window.location.reload();
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <IonPage>
      <IonContent className="settings-content" fullscreen>
        <IonRow className="setting-header-row">
          <IonCol>
            {" "}
            <IonLabel color="smoke">Settings</IonLabel>
          </IonCol>
          <IonIcon
            color="smoke"
            style={{ paddingRight: "10px", width: 25, height: 25 }}
            icon={search}
          ></IonIcon>
        </IonRow>
        <IonGrid className="settings-grid">
          <IonRow>
            <IonAvatar className="settings-profilepic">
              <IonImg src={auth.currentUser.photoURL}></IonImg>
            </IonAvatar>
            <IonCol className="settings-profile-details">
              <IonLabel
                color="smoke"
                style={{ fontSize: "25px", paddingBottom: "2px" }}
              >
                {auth.currentUser.displayName}
              </IonLabel>
              <IonLabel color="smoke" style={{ fontSize: "13px" }}>
                online
              </IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow className="settings-account">
            <IonLabel style={{ fontSize: "13px" }} color="gold">
              Account
            </IonLabel>
          </IonRow>
          <IonRow className="settings-row">
            <IonLabel style={{fontSize:"16px"}}color="smoke">4782145145</IonLabel>
            <IonLabel style={{ fontSize: "13px", paddingTop:"4px" }} color="darksmoke">
              Phone number
            </IonLabel>
          </IonRow>
          <IonRow className="settings-row">
            <IonLabel style={{fontSize:"16px"}} color="smoke">{auth.currentUser.email}</IonLabel>
            <IonLabel style={{ fontSize: "13px",paddingTop:"4px" }} color="darksmoke">
              email
            </IonLabel>
          </IonRow>
          <IonRow className="settings-row">
            <IonLabel style={{fontSize:"15px"}} color="smoke">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Aspernatur accusantium numquam dignissimos at architecto,
            </IonLabel>
            <IonLabel style={{ fontSize: "13px",paddingTop:"4px" }} color="darksmoke">
              Bio
            </IonLabel>
          </IonRow>
        </IonGrid>
        <IonButton fill="clear" className="logout-btn" color="gold" onClick={handleLogout}>
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
