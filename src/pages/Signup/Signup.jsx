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
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { auth } from "../../firebase";
import { toastController } from "@ionic/core";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { resultingClientExists } from "workbox-core/_private";
// import "../Login/Login.css";
// import { getAuth, sendEmailVerification } from "firebase/auth";

const Signup = () => {
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
  const {  logout, addData } = UserAuth();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser, currentUser } = UserAuth();
  const router = useIonRouter();

  const handleSubmit = async () => {
    // e.preventDefault();

    // const auth = getAuth();
    // sendEmailVerification(auth, email).then(() => {
    // const emailVerification = (auth)=>{
    //   sendEmailVerification(auth.currentUser);
    // }
    // });
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
        // await updateProfile(auth.currentUser, {
        //   displayName: name
        // }).then(()=>{
        //   console.log(auth.currentUser.displayName)
        // }).catch((error)=>{
        //   // handleAlert(error.message);
        //   handleButtonClick(error.messaqge)
        // });
        // await addData(auth, name, email);
        // sendEmailVerification(auth.currentUser).then(()=>{
        //   const msg = "A verification link has been sent to your email, please complete the verification and login."
        //   // handleAlert(msg);
        //   handleButtonClick(msg)
        // });
        logout();
        setName("")
        setEmail("")
        setPassword("")

        router.push("/login");
      } catch (e) {
        setError(e.message);
        console.log(e.message);
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
            <IonLabel className="signuptext">Signup</IonLabel>
          </IonRow>
          <IonRow className="input-row">
            <IonInput
              onIonChange={(e) => setName(e.detail.value)}
              className="input1"
              placeholder="Name"
              color="darkgreen"
            ></IonInput>
          {/* </IonRow>
          <IonRow> */}
            {/* <IonInput
              onIonChange={(e) => setUsername(e.detail.value)}
              className="input2"
              placeholder="Username"
            ></IonInput> */}
          {/* </IonRow>


          <IonRow> */}
            <IonInput
              id="input-email"
              onIonChange={(e) => setEmail(e.detail.value)}
              type="text"
              color="darkgreen"
              className="input3"
              placeholder="Email-id"
            ></IonInput>
          {/* </IonRow>

          <IonRow> */}
            <IonInput
              id="input-pass"
              onIonChange={(e) => setPassword(e.detail.value)}
              type="password"
              color="darkgreen"
              className="input4"
              placeholder="Password"
            ></IonInput>
          {/* </IonRow>
          <IonRow> */}
            <IonButton
              onClick={handleSubmit}
              color="darkgreen"
              className="joinbutton "
            >
              Join
            </IonButton>
          </IonRow>
          {/* <IonRow>
            <IonLabel className="forgottext1">Forgot Password</IonLabel>
          </IonRow> */}
          <IonRow className="login-sp-row">
            <IonLabel className="acctext">Already have an account?</IonLabel>
          </IonRow>
          <IonRow className="login-sp-row">
            <IonButton
              color="darkgreen"
              className="signuptext-btn ion-text-capitalize"
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
