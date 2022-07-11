import {
  IonButton,
  IonCol,
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
  useIonToast,
} from "@ionic/react";
import "./Login.css";
import { UserAuth } from "../../context/AuthContext";
import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { alert } from "ionicons/icons";
const Login = () => {
  const { signIn, user } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [present, dismiss] = useIonToast();
  const [presentAlert] = useIonAlert();

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
  async function handleAlert(message) {
    presentAlert({
      header: "Alert",
      message: message,
      buttons: ["OK"],
      mode: "md",
      animated: true,
      cssClass: "loginpage-alert",
      color: "light",
    });
  }
  const router = useIonRouter();
  // const {dispatch} = useContext(AuthContext)
  const handleSubmit = async (e) => {
    var atposition = email.indexOf("@");
    var dotposition = email.lastIndexOf(".");
    if (email == null || email === "" || password == null || password === "") {
      handleButtonClick("Fill the required fields");
    } else if (password.length < 6) {
      handleButtonClick("Password must be of 6 characters");
    } else if (
      atposition < 1 ||
      dotposition < atposition + 2 ||
      dotposition + 2 >= email.length
    ) {
      handleButtonClick("Please enter correct email");
    } else {
      try {
        await signIn(email, password)
        // .then((userCredential) => {
        //   // Signed in
        //   const user = userCredential.user;
        //   dispatch({type:"LOGIN", payload:user})
        // })
        handleButtonClick("Login successful");
        setEmail("");
        setPassword("");
        router.push("/home");
      } catch (e) {
        setError(e.message);
        handleAlert(e.message);
      }
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="login-main-div">
        <IonGrid className="main-grid">
          <IonRow>
            <IonImg className="chatifylogo" src="assets/images/Group 22.png">
              {" "}
            </IonImg>
          </IonRow>
          <IonRow className="welcome-row">
            <IonLabel className="welcome-text">WELCOME</IonLabel>
          </IonRow>
          <IonRow className="login-input-row">
            <IonInput
              id="input-email"
              onIonChange={(e) => setEmail(e.detail.value)}
              type="text"
              color="darkgreen"
              className="login-input1"
              placeholder="Email"
            ></IonInput>
            <IonInput
              id="input-pass"
              onIonChange={(e) => setPassword(e.detail.value)}
              type="password"
              color="darkgreen"
              className="login-input2"
              placeholder="Password"
            ></IonInput>
            <IonLabel className="forgottext">Forgot Password</IonLabel>
          </IonRow>
          <IonRow>
            <IonButton
              onClick={handleSubmit}
              color="smoke"
              className="loginbutton"
            >
              Login
            </IonButton>
          </IonRow>
          <IonRow className="create-acc-row">
            <IonLabel className="loginpage-text">
              Create an account using{" "}
            </IonLabel>
            <IonButton
              color="smoke "
              className="loginpage-signup-btn ion-text-capitalize"
              routerLink="/signup"
            >
              Signup
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
