import {
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { useIonRouter } from "@ionic/react";
import { toastController } from "@ionic/core";
// import { FaGoogle, FaFacebook, FaApple, FaGithub } from "react-icons/fa";
import { useState } from "react";
const Login = () => {
  const { signIn, user } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleButtonClick(message) {
    const toast = await toastController.create({
      color: "light",
      duration: 2000,
      position: "top",
      message: message,
      showCloseButton: true,
    });

    await toast.present();
  }

  const router = useIonRouter();
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
      handleButtonClick("Please enter email address");
    } else {
      try {
        await signIn(email, password);
        router.push("/home");
      } catch (e) {
        setError(e.message);
        console.log(e.message);
      }
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="login-main-div">
        {/* <IonButton routerLink="/home">Login</IonButton>
        dont have account? <IonButton routerLink="/signup">Signup</IonButton> */}
        <IonImg
          color="new"
          className="rect4"
          src="assets/images/Rectangle 4.png"
        >
          {" "}
        </IonImg>
        <IonImg className="rect3" src="assets/images/Rectangle 5.png">
          {" "}
        </IonImg>
        <IonImg className="rect5" src="assets/images/Rectangle 5.png">
          {" "}
        </IonImg>
        <IonImg className="rect8" src="assets/images/Rectangle 5.png">
          {" "}
        </IonImg>
        <IonImg className="chatifylogo" src="assets/images/Group 22.png">
          {" "}
        </IonImg>
        <IonLabel className="logintext">Welcome</IonLabel>
        <IonInput
          id="input-email"
          onIonChange={(e) => setEmail(e.detail.value)}
          type="text"
          color="dark"
          className="login-input1"
          placeholder="Username"
        ></IonInput>
        <IonInput
          id="input-pass"
          onIonChange={(e) => setPassword(e.detail.value)}
          type="password"
          color="dark"
          className="login-input2"
          placeholder="Password"
        ></IonInput>
        <IonButton
          onClick={handleSubmit}
          color="darkgreen"
          className="loginbutton "
        >
          Login
        </IonButton>
        <IonLabel className="forgottext">Forgot Password</IonLabel>

        <IonLabel className="acctext">
          create an account using
          <br />
          <br />
          <IonButton
            color="darkgreen"
            className="signuptext-btn"
            routerLink="/signup"
          >
            Signup
          </IonButton>
        </IonLabel>
      </IonContent>
    </IonPage>
  );
};

export default Login;
