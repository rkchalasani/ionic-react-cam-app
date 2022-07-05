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
import { call, home, settings, search } from "ionicons/icons";
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
        {/* <IonToolbar className="tab1head-div">
          <IonTitle>Home</IonTitle>
        </IonToolbar> */}
      </IonHeader>
      <IonContent className="tab1mainpage" fullscreen>

        <IonGrid>
          <IonRow className="search-row">
          <IonImg src="assets/images/Frame 18.png"></IonImg>
            <IonImg src="assets/images/Frame 17.png"></IonImg>

          </IonRow>
          <IonRow>
            <IonCard color="darkgreen">
           
             <IonImg src="assets/images/Frame 9.png"></IonImg>
             <IonImg src="assets/images/Frame 3.png"></IonImg>
             <IonImg src="assets/images/Frame 4.png"></IonImg>
             <IonImg src="assets/images/Frame 7.png"></IonImg>
             <IonImg src="assets/images/Frame 5.png"></IonImg>
             <IonImg src="assets/images/Frame 6.png"></IonImg>
             <IonImg src="assets/images/Frame 7.png"></IonImg>
             <IonImg src="assets/images/Frame 9.png"></IonImg>
             <IonImg src="assets/images/Frame 5.png"></IonImg>

            </IonCard>
          </IonRow>
          <IonRow className="logout">
          <IonButton color="darkgreen" onClick={handleLogout}>Logout</IonButton>
          </IonRow>

        </IonGrid>
        
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
