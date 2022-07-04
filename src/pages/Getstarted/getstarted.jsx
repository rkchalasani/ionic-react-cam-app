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
        <IonGrid className="getstarted-grid">
          <IonRow className="chat">
            <IonImg className="chatifylogo" src="assets/images/Group 22.png">
              {" "}
            </IonImg>
            {/* <IonImg class="rectangle1" src="assets/images/Rectangle 5.png"></IonImg> */}
          </IonRow>
          <IonRow className="para">
            <IonImg class="rectangle1" src="assets/images/Rectangle 5.png"></IonImg>
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
          {/* </IonRow>
          <IonRow> */}
            <IonButton
              color="light"
              className="getstarted-div"
              routerLink="/login"
            >
              Get Started
            </IonButton>
          </IonRow>
        </IonGrid>

        {/* 

        <IonImg className="rect31" src="assets/images/Rectangle 5.png"></IonImg>
        <IonImg className="recta" src="assets/images/Rectangle 5.png"></IonImg>
        <IonImg className="rectb" src="assets/images/circle 3.png"></IonImg> */}
      </IonContent>
    </IonPage>
  );
};

export default GetStarted;
