import { IonButton, IonContent, IonHeader, IonImg, IonInput, IonLabel, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import './Login.css'
const Login = () => {
  return (
    <IonPage>
      {/* <IonHeader>
       <IonToolbar>
         <IonTitle>Login</IonTitle>
       </IonToolbar>
     </IonHeader> */}
      <IonContent fullscreen className="login-main-div">
        {/* <IonButton routerLink="/home">Login</IonButton>
        dont have account? <IonButton routerLink="/signup">Signup</IonButton> */}
        <IonImg color="new" className="rect4" src="assets/images/Rectangle 4.png"> </IonImg>
        <IonImg className="rect3" src="assets/images/Rectangle 5.png"> </IonImg>
        <IonImg className="rect5" src="assets/images/Rectangle 5.png"> </IonImg>
        <IonImg className="rect8" src="assets/images/Rectangle 5.png"> </IonImg>
        <IonImg  className="chatifylogo" src="assets/images/Group 22.png"> </IonImg>
        <IonLabel className="logintext">Welcome Back</IonLabel>
        <IonInput className="input11" placeholder="Username"></IonInput>
        <IonInput className="input22" placeholder="Password"></IonInput>
        <IonButton routerLink="/home" color="light" className="loginbutton ">Login</IonButton>
        <IonLabel className="forgottext">Forgot Password</IonLabel>
        {/* <IonButton routerLink="/signup">Signup</IonButton> */}
        <IonLabel className="acctext">create an account using
        {/* <br /> */}
        <IonButton color="light" fill="clear" routerLink="/signup">Signup</IonButton></IonLabel>
      </IonContent>


   </IonPage>
  );
};

export default Login;
