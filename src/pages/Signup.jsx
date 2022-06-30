import { IonButton, IonContent, IonHeader, IonImg, IonInput, IonLabel, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import './Login.css'
const Signup = () => {
  return (
    <IonPage>

      <IonContent fullscreen className="login-main-div">
        {/* <IonButton routerLink="/home">Login</IonButton>
        dont have account?  */}
        <IonImg color="new" className="rect4" src="assets/images/Rectangle 4.png"> </IonImg>
        <IonImg className="rect3" src="assets/images/Rectangle 5.png"> </IonImg>
        <IonImg className="rect5" src="assets/images/Rectangle 5.png"> </IonImg>
        <IonImg className="rect8" src="assets/images/Rectangle 5.png"> </IonImg>
        <IonImg  className="chatifylogo" src="assets/images/Group 22.png"> </IonImg>
        <IonLabel className="signuptext">Signup</IonLabel>
        <IonInput className="input1" placeholder="Username"></IonInput>
        <IonInput className="input2" placeholder="Password"></IonInput>
        <IonInput className="input3" placeholder="Password"></IonInput>
        <IonInput className="input4" placeholder="Password"></IonInput>
        <IonButton routerLink="/home" color="light" className="joinbutton ">Join</IonButton>
        <IonLabel className="forgottext1">Forgot Password</IonLabel>
        <IonLabel className="acctext">Already have an account?
        {/* <br /> */}
        <IonButton color="light" fill="clear" routerLink="/login">Login</IonButton></IonLabel>
        
      </IonContent>


   </IonPage>
  );
};

export default Signup;
