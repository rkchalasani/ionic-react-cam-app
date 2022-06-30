import {
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
// import ExploreContainer from '../components/ExploreContainer';
import "./Tab1.css";

const Tab1 = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="tab1head-div">
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="tab1mainpage" fullscreen>
        <IonButton routerLink="/login">Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
