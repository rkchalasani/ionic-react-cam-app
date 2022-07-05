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
      handleButtonClick("Please enter correct email");
    } else {
      try {
        await signIn(email, password);
        handleButtonClick("Login successful");
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
        <IonGrid className="main-grid">
          <IonRow>
            <IonImg className="chatifylogo" src="assets/images/Group 22.png">
              {" "}
            </IonImg>
          </IonRow>
{/* 
          <IonRow>
            <IonImg className="rect3" src="assets/images/Rectangle 5.png">
              {" "}
            </IonImg>
          </IonRow> */}

          {/* <IonGrid className="rect3-grid"> */}

          {/* </IonGrid> */}
          {/* <IonGrid className="welcome-grid"> */}
          <IonRow className="welcome-row">
            <IonLabel className="welcome-text">Welcome</IonLabel>
          </IonRow>
          {/* </IonGrid> */}

          {/* <IonGrid className="login-input-grid"> */}
          {/* <IonCol> */}
          <IonRow className="input-row1">
            <IonInput
              id="input-email"
              onIonChange={(e) => setEmail(e.detail.value)}
              type="text"
              color="darkgreen"
              className="login-input1"
              placeholder="Username"
            ></IonInput>
          {/* </IonRow>

          <IonRow> */}
            <IonInput
              id="input-pass"
              onIonChange={(e) => setPassword(e.detail.value)}
              type="password"
              color="darkgreen"
              className="login-input2"
              placeholder="Password"
            ></IonInput>
          {/* </IonRow>

          <IonRow> */}
            <IonLabel className="forgottext">Forgot Password</IonLabel>
          </IonRow>

          <IonRow>
            <IonButton
              onClick={handleSubmit}
              color="darkgreen"
              className="loginbutton "
            >
              Login
            </IonButton>
          </IonRow>

          <IonRow className="create-acc-row">
            <IonLabel className="acctext">Create an account using</IonLabel>
          {/* </IonRow>

          <IonRow className="signup-btn-row"> */}
          {/* <br /> */}
            <IonButton
              color="darkgreen "
              className="signuptext-btn ion-text-capitalize"
              routerLink="/signup"
            >
              Signup
            </IonButton>
          </IonRow>
          {/* <IonRow>
          <IonImg className="rect5" src="assets/images/Rectangle 5.png">
          {" "}
        </IonImg>
          </IonRow>
          <IonRow>
          <IonImg className="rect8" src="assets/images/Rectangle 5.png">
          {" "}
        </IonImg> 
          </IonRow> */}

          {/* </IonGrid> */}

          {/* </IonRow> */}
        </IonGrid>
        {/* <IonButton routerLink="/home">Login</IonButton>
        dont have account? <IonButton routerLink="/signup">Signup</IonButton> */}
        {/* <IonImg
          color="new"
          className="rect4"
          src="assets/images/Rectangle 4.png"
        >
          {" "}
        </IonImg> */}

        {/* 
       */}
       {/* <IonImg
          color="new"
          className="getstarted"
          src="assets/images/Get-Started.png"
        >
          {" "}
        </IonImg> */}
      </IonContent>
    </IonPage>
  );
};

export default Login;
