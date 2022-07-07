import {
  IonButton,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { alert } from "ionicons/icons";
const Signup = () => {
  const [present, dismiss] = useIonToast();
  async function handleButtonClick(message) {
    present({
      message: message,
      duration: 2000,
      position: "top",
      color: "smoke",
      mode: "ios",
      icon: alert,
    });
  }
  const [presentAlert] = useIonAlert();
  const { logout, addData } = UserAuth();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser, currentUser } = UserAuth();
  const router = useIonRouter();
  async function handleAlert(message) {
    presentAlert({
      header: "Alert",
      message: message,
      buttons: ["OK"],
      mode: "ios",
      // color: "darkgreen",
    });
  }
  const handleSubmit = async () => {
    var atposition = email.indexOf("@");
    var dotposition = email.lastIndexOf(".");
    if (
      name == null ||
      name === "" ||
      email == null ||
      email === "" ||
      password == null ||
      password === ""
    ) {
      handleButtonClick("Fill the required fields");
    } else if (password.length < 6) {
      handleButtonClick("Password must be of 6 characters");
    } else if (
      atposition < 1 ||
      dotposition < atposition + 2 ||
      dotposition + 2 >= email.length
    ) {
      handleButtonClick("Please enter proper email address");
    } else {
      try {
        await createUser(email, password);
        handleButtonClick("User successfully registered");
        logout();
        setName("");
        setEmail("");
        setPassword("");
        router.push("/login");
      } catch (e) {
        setError(e.message);
        handleAlert(e.message);
      }
    }
  };
  return (
    <IonPage>
      <IonContent fullscreen className="signup-main-div">
        <IonGrid className="signup-grid">
          <IonRow>
            <IonImg className="chatifylogo" src="assets/images/Group 22.png">
              {" "}
            </IonImg>
          </IonRow>
          <IonRow className="signup-row">
            <IonLabel className="signuptext">SIGNUP</IonLabel>
          </IonRow>
          <IonRow className="signup-input-row">
            <IonInput
              onIonChange={(e) => setName(e.detail.value)}
              className="signup-name-input"
              placeholder="Name"
              color="darkgreen"
            ></IonInput>
            <IonInput
              id="input-email"
              onIonChange={(e) => setEmail(e.detail.value)}
              type="text"
              color="darkgreen"
              className="signup-email-input"
              placeholder="Email-id"
            ></IonInput>
            <IonInput
              id="input-pass"
              onIonChange={(e) => setPassword(e.detail.value)}
              type="password"
              color="darkgreen"
              className="signup-password-input"
              placeholder="Password"
            ></IonInput>
            <IonButton
              onClick={handleSubmit}
              color="smoke"
              className="signuppage-joinbutton"
            >
              Join
            </IonButton>
          </IonRow>
          <IonRow className="signuppage-login-btn-row">
            <IonLabel className="signuppage-text">Already have an account?</IonLabel>
          {/* </IonRow>
          <IonRow className="signuppage-login-btn-row"> */}
            <IonButton
              color="smoke"
              className="signuppage-login-btn ion-text-capitalize"
              routerLink="/login"
            >
              Login
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
