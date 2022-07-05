import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { addCircleSharp, colorFill, help, notifications, person, thermometer } from 'ionicons/icons';
import { UserAuth } from '../../../context/AuthContext';
// import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3 = () => {
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
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent className='settings-content' fullscreen>
      <IonRow className="search-row">
          <IonCol> <IonLabel >Settings</IonLabel></IonCol>
          {/* <IonIcon icon={addCircleSharp}></IonIcon> */}
        </IonRow>
        <IonGrid className='settings-grid'>
          <IonRow className='settings-row1'>
            <IonIcon color='light' icon={person}></IonIcon>
            <IonLabel color='light'>Account</IonLabel>
          </IonRow>
          <IonRow className='settings-row1'>
            <IonIcon color='light' icon={notifications}></IonIcon>
            <IonLabel color='light'>Notification</IonLabel>
          </IonRow>
          <IonRow className='settings-row1'>
            <IonIcon color='light' icon={colorFill}></IonIcon>
            <IonLabel color='light'>Theme</IonLabel>
          </IonRow>
          <IonRow className='settings-row1'>
            <IonIcon color='light' icon={help}></IonIcon>
            <IonLabel color='light'>Help</IonLabel>
          </IonRow>
          <IonRow className='settings-row1'>
            <IonIcon color='light' icon={person}></IonIcon>
            <IonLabel color='light'>Account</IonLabel>
          </IonRow>
          <IonRow className='settings-row1'>
            <IonIcon color='light' icon={person}></IonIcon>
            <IonLabel color='light'>Account</IonLabel>
          </IonRow>
          <IonRow className='settings-row1'>
            <IonIcon color='light' icon={person}></IonIcon>
            <IonLabel color='light'>Account</IonLabel>
          </IonRow>
          <IonRow className='settings-row1'>
            <IonIcon color='light' icon={person}></IonIcon>
            <IonLabel color='light'>Account</IonLabel>
          </IonRow>
          <IonRow className='settings-row1'>
            <IonButton className='logout-btn' color="light" onClick={handleLogout}>Logout</IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
