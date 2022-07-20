import {
  IonButton,
  IonContent,
  IonGrid,
  IonImg,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  useIonAlert,
  useIonLoading,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Login.css";
import { UserAuth } from "../../context/AuthContext";
import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { alert } from "ionicons/icons";

const Login = () => {
  const { signIn } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [present] = useIonToast();
  const [presentAlert] = useIonAlert();
  const [show] = useIonLoading();
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
  const resetInput = () => {
    setEmail("");
    setPassword("");
  };
  const router = useIonRouter();
  const handleClick = async (e) => {
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
        await signIn(email, password);
        show({
          message: "Logging in..",
          duration: 1500,
          spinner: "lines-sharp",
          mode: "ios",
        });
        resetInput();
        router.push("/home");
        setTimeout(() => {
          handleButtonClick("Login successful");
        }, 1510);
      } catch (e) {
        handleAlert(e.message);
        resetInput();
      }
    }
  };
  const openSignup = () => {
    router.push("/signup");
    resetInput();
  };
  const hideTabs = () => {
    const tabsEl = document.querySelector("ion-tab-bar");
    if (tabsEl) {
      tabsEl.hidden = true;
    }
  };
  useIonViewWillEnter(() => hideTabs());
  return (
    <IonPage>
      <IonContent fullscreen className="login-main-div">
        <IonGrid className="main-grid">
          <IonRow>
            <IonImg
              className="chatifylogo"
              src="assets/images/Chatify-logo.png"
            >
              {" "}
            </IonImg>
          </IonRow>
          <IonRow className="welcome-row">
            <IonLabel className="welcome-text">WELCOME</IonLabel>
          </IonRow>
          <IonRow className="login-input-row">
            <IonInput
              id="input-email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value)}
              type="text"
              color="darkgreen"
              className="login-input1"
              placeholder="Email"
            ></IonInput>
            <IonInput
              id="input-pass"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value)}
              type="password"
              color="darkgreen"
              className="login-input2"
              placeholder="Password"
            ></IonInput>
            <IonLabel className="forgottext">Forgot Password</IonLabel>
          </IonRow>
          <IonRow className="loginbtn-row">
            <IonButton
              onClick={handleClick}
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
              // routerLink="/signup"
              onClick={openSignup}
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
