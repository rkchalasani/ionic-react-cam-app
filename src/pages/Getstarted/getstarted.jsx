import {
  IonButton,
  IonContent,
  IonGrid,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
} from "@ionic/react";
import "./getstarted.css";

const GetStarted = () => {
  return (
    <IonPage>
      <IonContent className="getstarted-maindiv">
        {/* <IonGrid className="out-grid">
        <IonRow className="out1-row">
          <IonImg
            class="out1 bounce-1"
            src="assets/images/out1.png"
          ></IonImg>
        </IonRow>
        <IonRow className="out2-row">
          <IonImg
            class="out2 bounce-1"
            src="assets/images/out2.png"
          ></IonImg>
        </IonRow>
        <IonRow className="out3-row">
          <IonImg
            class="out2 bounce-1"
            src="assets/images/out3.png"
          ></IonImg>
        </IonRow>
        </IonGrid> */}
       
        <IonGrid className="getstarted-grid">
          <IonRow className="chat">
            <IonImg
              className="chatifylogo"
              src="assets/images/Group 22.png"
            ></IonImg>
          </IonRow>
          <IonRow className="para1">
            <IonLabel className="logintextb">
              Easy, reliable and fast way to interact with your friends
            </IonLabel>
          </IonRow>
          <IonRow className="btn">
            <IonLabel className="logintext1">
              Connect With Your Friends
            </IonLabel>
            <IonButton
              color="smoke ion-text-capitalize"
              className="getstarted-btn"
              routerLink="/login"
            >
              Get Started
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default GetStarted;
