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
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { auth } from "../../firebase";
// import "../Login/Login.css";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser, currentUser } = UserAuth();
  const router = useIonRouter();
  const handleSubmit = async () => {
    // e.preventDefault();
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
      alert("Fill the required feilds");
    } else if (password.length < 6) {
      alert("Password must be of 6 characters");
    } else if (
      atposition < 1 ||
      dotposition < atposition + 2 ||
      dotposition + 2 >= email.length
    ) {
      alert("Please enter email address");
    } else {
      try {
        await createUser(email, password);
        // await emailVerification(auth);
        router.push("/login");
      } catch (e) {
        setError(e.message);
        console.log(e.message);
      }
    }
  };
  return (
    <IonPage>
      <IonContent fullscreen className="login-main-div">
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
        <IonLabel className="signuptext">Signup</IonLabel>
        <IonInput
          onIonChange={(e) => setName(e.detail.value)}
          className="input1"
          placeholder="Name"
        ></IonInput>
        <IonInput
          onIonChange={(e) => setUsername(e.detail.value)}
          className="input2"
          placeholder="Username"
        ></IonInput>
        <IonInput
          id="input-email"
          onIonChange={(e) => setEmail(e.detail.value)}
          type="text"
          className="input3"
          placeholder="Email-id"
        ></IonInput>
        <IonInput
          id="input-pass"
          onIonChange={(e) => setPassword(e.detail.value)}
          type="password"
          className="input4"
          placeholder="Password"
        ></IonInput>
        <IonButton
          onClick={handleSubmit}
          color="darkgreen"
          className="joinbutton "
        >
          Join
        </IonButton>
        <IonLabel className="forgottext1">Forgot Password</IonLabel>
        <IonLabel className="acctext">
          Already have an account?
          <br />
          <br />
          <IonButton
            color="darkgreen"
            className="signuptext-btn"
            routerLink="/login"
          >
            Login
          </IonButton>
        </IonLabel>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
