import {
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
// import { u } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
// import ExploreContainer from '../components/ExploreContainer';
import "./Tab1.css";

const Tab1 = () => {
  const { logout } = UserAuth();
  const router = useIonRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="tab1head-div">
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="tab1mainpage" fullscreen>
        <IonButton  onClick={handleLogout}>Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
