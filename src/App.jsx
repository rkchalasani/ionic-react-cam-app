import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  isPlatform,
  setupIonicReact,
  useIonAlert,
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
// import Tab1 from './pages/Home/Hometab/Tab1';
// import Tab2 from './pages/Tab2';
// import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import Getstarted from "./pages/Getstarted/getstarted";
import "./theme/variables.css";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { AuthContextProvider } from "./context/AuthContext";
import Tab1 from "./pages/Home/HomeChats/Tab1";
import Tab2 from "./pages/Home/Feed/Tab2";
import Tab3 from "./pages/Home/Settings/Tab3";
import Newuser from "./pages/Home/Feed/new/Newuser";
import { userInputs } from "./formSource";
import Profile from "./pages/Home/Feed/profile/profile";
import { doc, getDoc } from "firebase/firestore";
import { App as app } from "@capacitor/app";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { Browser } from '@capacitor/browser';
setupIonicReact();


const App = () =>  {
  const [updateDetails, setUpdateDetails] = useState({});
  const [appVersion, setAppVersion] = useState("");
  // const [showLoading, setShowLoading] = useState(false);

  const [show, dismiss] = useIonLoading();

  const updateRef = doc(db, "chatify_by_ptg", "UCOOaZPG4YhpdL3HjEzA");

  const [presentAlert] = useIonAlert();
  const [present] = useIonToast();

  const handleToast = (msg) => {
    present({
      message: msg,
      position: "top",
      animated: true,
      duration: 2000,
      color: "smoke",
      mode: "ios",
    });
  };

  const handleAlert = (message, title, button, appVersion) => {
    presentAlert({
      header: title,
      subHeader: `Version: ${appVersion}`,
      message: message,
      buttons: [
        {
          text: button,
          role: "Download",
          handler: async () => {
            show({
              message: "Please wait...",
              duration: 2000,
              spinner: "circular",
              cssClass: "lp-sp-spinner",
              animated: true,
              keyboardClose: true,
              mode: "ios",
            });
            await Browser.open({
              url: "https://play.google.com/store/apps/details?id=com.chatify.app",
            });
            dismiss();
          },
        },
      ],
      backdropDismiss: true,
      translucent: true,
      animated: true,
      // cssClass: "lp-sp-alert",
    });
  };

  const getAppInfo = async () => {
    let info = await app.getInfo();
    return info;
  };

  const getConfigData = async () => {
    const docSnap = await getDoc(updateRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("Document data:", docSnap.data());
      setUpdateDetails(data.updatemsg);
      setAppVersion(data.current);
    } else {
      console.log("No such document!");
    }
  };

  const checkUpdate = async () => {
    try {
      if (isPlatform("android")) {
        const currentAppInfo = getAppInfo();
        if (appVersion > (await currentAppInfo).version) {
          const message = updateDetails.message;
          const title = updateDetails.title;
          const button = updateDetails.button;
          handleAlert(message, title, button, appVersion);
        }
      } else {
        // const msg = "App is not running on android platform";
        // handleToast(msg);
      }
    } catch (error) {
      handleAlert(error.message);
    }
  };

  useEffect(() => {
    getConfigData();
    if (isPlatform("android")) {
      getAppInfo();
    }
  }, []);

  checkUpdate();
  return (
  <AuthContextProvider>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/home/tab1">
            <Tab2 />
          </Route>
          <Route path="/home/tab2">
            <Tab1 />
          </Route>
          <Route path="/home/tab3">
            <Tab3 />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/getstarted">
            <Getstarted />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/new">
            <Newuser inputs={userInputs} title="New post" />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route exact path="/">
            <Redirect to="/getstarted" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </AuthContextProvider>
)
  };

export default App;
