import { IonButton, IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1 = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* <div>
          <IonImg></IonImg>
        </div> */}
        <IonButton 
         routerLink="/login">
            Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
