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
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { alert } from "ionicons/icons";
import { updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { addDoc, doc } from "firebase/firestore";
const Signup = () => {
  const [present] = useIonToast();
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { createUser } = UserAuth();
  const router = useIonRouter();
  async function handleAlert(message) {
    presentAlert({
      header: "Alert",
      message: message,
      buttons: ["OK"],
      mode: "md",
      cssClass: "signuppage-alert",
    });
  }
  const [show, dismiss] = useIonLoading();
  const resetInput = () => {
    setName("");
    setEmail("");
    setPassword("");
  };
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
        show({
          message: "Registering user..",
          // duration: 1500,
          spinner: "lines-sharp",
          mode: "ios",
        });
        await updateProfile(auth.currentUser, {
          displayName: name,
        }).catch((e) => {
          console.log(e.message);
        });
        await addData(auth, email, name);
        logout();
        resetInput();
        router.push("/login");
        dismiss();
        setTimeout(() => {
          handleButtonClick("User successfully registered");
        }, 1510);
      } catch (e) {
        console.log(e);
        handleAlert(e.message);
        resetInput();
      }
    }
  };
  const openLogin = () => {
    router.push("/login");
    resetInput();
  };
  return (
    <IonPage>
      <IonContent fullscreen className="signup-main-div">
        <IonGrid className="signup-grid">
          <IonRow>
            <IonImg className="chatifylogo" src="assets/images/snapshare.png">
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
              placeholder="Username"
              value={name}
              color="darkgreen"
            ></IonInput>
            <IonInput
              id="input-email"
              onIonChange={(e) => setEmail(e.detail.value)}
              type="text"
              value={email}
              color="darkgreen"
              className="signup-email-input"
              placeholder="Email-id"
            ></IonInput>
            <IonInput
              id="input-pass"
              onIonChange={(e) => setPassword(e.detail.value)}
              type="password"
              value={password}
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
            <IonLabel className="signuppage-text">
              Already have an account?
            </IonLabel>
            <IonButton
              color="smoke"
              className="signuppage-login-btn ion-text-capitalize"
              onClick={openLogin}
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
