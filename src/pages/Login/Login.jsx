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
  useIonLoading,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Login.css";
import { UserAuth } from "../../context/AuthContext";
import { useIonRouter } from "@ionic/react";
import { useEffect, useState } from "react";
import { alert } from "ionicons/icons";
const Login = () => {
  const { signIn, user } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [present] = useIonToast();
  const [presentAlert] = useIonAlert();
  const [show, dismiss] = useIonLoading();

  async function handleLoading(message) {
    show({
      message: message,
      duration: 1500,
      spinner: "lines-sharp",
      mode: "ios",
    });
  }
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

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);
  const handleClick = async (e) => {
    // handleLoading("Logging in..");
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
        setLoading(true);
        await signIn(email, password);
        handleLoading("Logging in..");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          router.push("/home");
          handleButtonClick("Login successful");
        }, 1510);
      } catch (e) {
        setError(e.message);
        handleAlert(e.message);
      }
    }
  };
  const hideTabs = () => {
    const tabsEl = document.querySelector("ion-tab-bar");

    if (tabsEl) {
      tabsEl.hidden = true;
    }
  };

  useIonViewWillEnter(() => hideTabs());

  // const  = () => setLoading(true);
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
          <IonRow className="loginbtn-row">
            <IonButton
              onClick={handleClick}
              color="smoke"
              className="loginbutton  "
              // disabled={isLoading}
              // onClick={!isLoading ? handleClick : null}
            >
              {/* {isLoading ? "Logging in.." : "Login"} */}Login
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
